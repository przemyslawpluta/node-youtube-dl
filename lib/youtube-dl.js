'use strict'

const universalify = require('universalify')
const streamify = require('streamify')
const request = require('request')
const hms = require('hh-mm-ss')
const http = require('http')
const url = require('url')

const {
  isYouTubeRegex,
  isWin,
  formatDuration,
  has,
  isString
} = require('./util')

let ytdlBinary = require('./get-binary')()

const execa = universalify.fromPromise(require('execa'))

function youtubeDl (args, options, cb) {
  return execa(ytdlBinary, args, options, function done (err, output) {
    if (err) return cb(err)
    return cb(null, output.stdout.trim().split(/\r?\n/))
  })
}

/**
 * Processes data
 *
 * @param {Object} data
 * @param {Object} options
 * @param {Object} stream
 */

function processData (data, args, options, stream) {
  const item = !data.length ? data : data.shift()

  // fix for pause/resume downloads
  const headers = Object.assign(
    { Host: url.parse(item.url).hostname },
    data.http_headers
  )

  if (options && options.start > 0 && options.end > 0) {
    headers.Range = 'bytes=' + options.start + '-' + options.end
  } else if (typeof item.filesize === 'number') {
    headers.Range = 'bytes=0-' + item.filesize
  }

  const proxyArgIndex = (args && args.indexOf('--proxy')) || -1
  const req = request({
    url: item.url,
    headers: headers,
    ecdhCurve: 'auto',
    timeout: 30000,
    ...(proxyArgIndex > -1 && { proxy: args[proxyArgIndex + 1] })
  })

  req.on('response', function response (res) {
    const size = parseInt(res.headers['content-length'], 10)
    if (size) item.size = size

    if (options && options.start > 0 && res.statusCode === 416) {
      // the file that is being resumed is complete.
      return stream.emit('complete', item)
    }

    if (res.statusCode !== 200 && res.statusCode !== 206) {
      return stream.emit('error', new Error('status code ' + res.statusCode))
    }

    stream.emit('info', item)

    stream.on('end', function end () {
      if (data.length) stream.emit('next', data)
    })
  })

  return stream.resolve(req)
}

/**
 * Downloads a video.
 *
 * @param {String} videoUrl
 * @param {!Array.<String>} args
 * @param {!Object} options
 */
const ytdl = (module.exports = function (videoUrl, args, options) {
  const stream = streamify({
    superCtor: http.ClientResponse,
    readable: true,
    writable: false
  })

  if (!isString(videoUrl)) {
    processData(videoUrl, args, options, stream)
    return stream
  }

  ytdl.getInfo(videoUrl, args, options, function getInfo (err, data) {
    return err
      ? stream.emit('error', err)
      : processData(data, args, options, stream)
  })

  return stream
})

/**
 * Calls youtube-dl with some arguments and the `cb`
 * gets called with the output.
 *
 * @param {String|Array.<String>}
 * @param {Array.<String>} args
 * @param {Array.<String>} args2
 * @param {Object} options
 * @param {Function(!Error, String)} cb
 */
function call (urls, args1, args2, options = {}, cb) {
  let args = args1
  if (args2) args = args.concat(args2)

  // check if encoding is already set
  if (isWin && !args.includes('--encoding')) {
    args.push('--encoding')
    args.push('utf8')
  }

  if (urls !== null) {
    if (isString(urls)) urls = [urls]

    for (let i = 0; i < urls.length; i++) {
      const video = urls[i]
      if (isYouTubeRegex.test(video)) {
        // Get possible IDs.
        const details = url.parse(video, true)
        let id = details.query.v || ''
        if (id) {
          args.push('http://www.youtube.com/watch?v=' + id)
        } else {
          // Get possible IDs for youtu.be from urladdr.
          id = details.pathname.slice(1).replace(/^v\//, '')
          if (id) {
            args.push(video)
            args.unshift('-i')
          }
        }
      } else {
        if (i === 0) args.push('--')
        args.push(video)
      }
    }
  }

  return youtubeDl(args, options, cb)
}

/**
 * Calls youtube-dl with some arguments and the `cb`
 * gets called with the output.
 *
 * @param {String} url
 * @param {Array.<String>} args
 * @param {Object} options
 * @param {Function(!Error, String)} cb
 */
ytdl.exec = function exec (url, args, options, cb) {
  return call(url, [], args, options, cb)
}

/**
 * @param {Object} data
 * @returns {Object}
 */
function parseInfo (data) {
  // youtube-dl might return just an url as a string when using the "-g" or "--get-url" flag
  if (isString(data) && data.startsWith('http')) {
    data = JSON.stringify({ url: data })
  }

  const info = JSON.parse(data)

  info._duration_raw = info.duration
  info._duration_hms = info.duration
    ? hms.fromS(info.duration, 'hh:mm:ss')
    : info.duration
  info.duration = info.duration ? formatDuration(info.duration) : info.duration

  return info
}

/**
 * Set path from youtube-dl.
 *
 * @param {String} path
 */
ytdl.setYtdlBinary = function setYtdlBinary (path) {
  ytdlBinary = path
}

/**
 * Get path from youtube-dl.
 *
 * @param {String} path
 */
ytdl.getYtdlBinary = function getYtdlBinary () {
  return ytdlBinary
}

/**
 * Gets info from a video.
 *
 * @param {String} url
 * @param {Array.<String>} args
 * @param {Object} options
 * @param {Function(!Error, Object)} cb
 */
ytdl.getInfo = function getInfo (url, args, options, cb) {
  if (typeof options === 'function') {
    cb = options
    options = {}
  } else if (typeof args === 'function') {
    cb = args
    options = {}
    args = []
  }
  const defaultArgs = ['--dump-json']
  if (
    !args ||
    (!has(args, '-f') &&
      !has(args, '--format') &&
      args.every(function (a) {
        return a.indexOf('--format=') !== 0
      }))
  ) {
    defaultArgs.push('-f')
    defaultArgs.push('best')
  }

  call(url, defaultArgs, args, options, function done (err, data) {
    if (err) return cb(err)
    let info

    // If using the "-g" or "--get-url" flag youtube-dl will return just a string (the URL to the video) which messes up the parsing
    // This fixes this behaviour
    if (has(args, '-g') || has(args, '--get-url')) {
      if (Array.isArray(data) && data.length >= 2) data.splice(0, 1)
    }

    try {
      info = data.map(parseInfo)
    } catch (err) {
      return cb(err)
    }

    return cb(null, info.length === 1 ? info[0] : info)
  })
}

/**
 * @param {String} url
 * @param {Object} options
 *   {Boolean} auto
 *   {Boolean} all
 *   {String} lang
 *   {String} format
 *   {String} cwd
 * @param {Function(!Error, Object)} cb
 */
ytdl.getSubs = function getSubs (url, options, cb) {
  if (typeof options === 'function') {
    cb = options
    options = {}
  }

  const args = ['--skip-download']
  args.push('--write' + (options.auto ? '-auto' : '') + '-sub')
  if (options.all) args.push('--all-subs')
  if (options.lang) args.push('--sub-lang=' + options.lang)
  if (options.format) args.push('--sub-format=' + options.format)
  if (!options.warrning) args.push('--no-warnings')

  call(url, args, [], { cwd: options.cwd }, function (err, data) {
    if (err) return cb(err)

    const files = []

    for (let i = 0, len = data.length; i < len; i++) {
      const line = data[i]
      if (line.indexOf('[info] Writing video subtitles to: ') === 0) {
        files.push(line.slice(35))
      }
    }

    return cb(null, files)
  })
}

/**
 * @param {String} url
 * @param {Object} options
 *   {Boolean} all
 *   {String} cwd
 * @param {Function(!Error, Object)} cb
 */
ytdl.getThumbs = function getThumbs (url, options, cb) {
  if (typeof options === 'function') {
    cb = options
    options = {}
  }

  const args = ['--skip-download']

  if (options.all) args.push('--write-all-thumbnails')
  else args.push('--write-thumbnail')

  if (!options.warrning) args.push('--no-warnings')

  call(url, args, [], { cwd: options.cwd }, function (err, data) {
    if (err) return cb(err)

    const files = []

    for (let i = 0, len = data.length; i < len; i++) {
      const line = data[i]
      const info = 'Writing thumbnail to: '
      if (has(line, info)) {
        files.push(line.slice(line.indexOf(info) + info.length))
      }
    }

    return cb(null, files)
  })
}

/**
 * @param {!Boolean} descriptions
 * @param {!Object} options
 * @param {Function(!Error, Object)} cb
 */
ytdl.getExtractors = function getExtractors (descriptions, options, cb) {
  if (typeof options === 'function') {
    cb = options
    options = {}
  } else if (typeof descriptions === 'function') {
    cb = descriptions
    options = {}
    descriptions = false
  }

  const args = descriptions
    ? ['--extractor-descriptions']
    : ['--list-extractors']

  return call(null, args, null, options, cb)
}
