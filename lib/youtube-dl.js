'use strict';

const execFile = require('child_process').execFile;
const streamify = require('streamify');
const request = require('request');
const hms = require('hh-mm-ss');
const path = require('path');
const http = require('http');
const url = require('url');
const fs = require('fs');

const util = require('./util');

const TEN_MEGABYTES = 1000 * 1000 * 10;

const execFileOpts = { maxBuffer: TEN_MEGABYTES }

const detailsPath = path.join(__dirname, '..', 'bin/details')

const ytdlBinary = (() => {
  if (fs.existsSync(detailsPath)) {
    const details = JSON.parse(fs.readFileSync(detailsPath));
    return details.path ? details.path : path.resolve(__dirname, '..', 'bin', details.exec);
  }

  if (!fs.existsSync(ytdlBinary)) {
    console.error('ERROR: unable to locate youtube-dl details in ' + path.dirname(ytdlBinary));
    process.exit(1);
  }
})()

const isWin = (process.platform === 'win32' || process.env.NODE_PLATFORM === 'windows') ? true : false;

const isDebug = /^\[debug\] /;
const isWarning = /^WARNING: /;
const isYouTubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//;
const isNoSubsRegex = /WARNING: video doesn't have subtitles|no closed captions found/;
const videoNotAvailable = new RegExp(
  'This video is not available|' +
  'This video has been removed by the user|' +
  'Please sign in to view this video|' +
  'This video is no longer available|' +
  'The uploader has not made this video available|' +
  'This video contains content from'
);

const subsRegex = /--write-sub|--write-srt|--srt-lang|--all-subs/;

function youtubeDl(args, options, callback) {
  let passOver = false;

  execFile(ytdlBinary, args, { ...execFileOpts, ...options }, function done(err, stdout, stderr) {
    if (err) {
      if (videoNotAvailable.test(err.message)) passOver = true;
      if (!passOver) return callback(err);
    }

    if (stderr && !passOver) {
      // Try once to download video if no subtitles available
      if (!options.nosubs && isNoSubsRegex.test(stderr)) {
        let i;
        let cleanupOpt = args2;

        for (i = cleanupOpt.length - 1; i >= 0; i--) {
          if (subsRegex.test(cleanupOpt[i])) { cleanupOpt.splice(i, 1); }
        }

        options.nosubs = true;

        return call(video, args1, cleanupOpt, options, callback);
      }

      if (isDebug.test(stderr) && args.indexOf('--verbose') > -1) {
        console.log('\n' + stderr);
      } else if (isWarning.test(stderr)) {
        console.warn(stderr);
      } else {
        return callback(new Error(stderr.slice(7)));
      }
    }

    if (passOver && stdout === '' && urls.length > 1) {
      urls.shift();
      return call(urls, args1, args2, options, callback);
    }

    return callback(null, stdout.trim().split(/\r?\n/));
  })
}


/**
 * Processes data
 *
 * @param {Object} data
 * @param {Object} options
 * @param {Object} stream
 */

function processData(data, options, stream) {
  const item = !data.length ? data : data.shift();

  // fix for pause/resume downloads
  const headers = { 'Host': url.parse(item.url).hostname };

  if (options && options.start > 0) headers.Range = 'bytes=' + options.start + '-';

  const req = request({ url: item.url, headers: headers });

  req.on('response', function response(res) {

    const size = parseInt(res.headers['content-length'], 10);
    if (size) item.size = size;

    if (options && options.start > 0 && res.statusCode === 416) {
      // the file that is being resumed is complete.
      return stream.emit('complete', item);
    }

    if (res.statusCode !== 200 && res.statusCode !== 206) {
      return stream.emit('error', new Error('status code ' + res.statusCode));
    }

    stream.emit('info', item);

    stream.on('end', function end() {
      if (data.length) stream.emit('next', data);
    });

  });

  return stream.resolve(req);
}

/**
 * Downloads a video.
 *
 * @param {String} videoUrl
 * @param {!Array.<String>} args
 * @param {!Object} options
 */
const ytdl = module.exports = function (videoUrl, args, options) {
  const stream = streamify({ superCtor: http.ClientResponse, readable: true, writable: false });

  if (typeof videoUrl !== 'string') {
    processData(videoUrl, options, stream);
    return stream;
  }

  ytdl.getInfo(videoUrl, args, options, function getInfo(err, data) {
    return err ? stream.emit('error', err) : processData(data, options, stream);
  });

  return stream;
};

/**
 * Calls youtube-dl with some arguments and the `callback`
 * gets called with the output.
 *
 * @param {String|Array.<String>}
 * @param {Array.<String>} args
 * @param {Array.<String>} args2
 * @param {Object} options
 * @param {Function(!Error, String)} callback
 */
function call(urls, args1, args2, options = {}, callback) {
  let args = args1;
  if (args2) args = args.concat(args2);

  // set encoding on windows to support unicode titles
  if (isWin) {
    // check if encoding is already set
    let hasEncoding = false;
    for (let i = 0; i < args.length; i++) {
      if (args[i] === '--encoding') {
        hasEncoding = true;
        break;
      }
    }
    if (!hasEncoding) {
      args.push('--encoding');
      args.push('utf8');
    }
  }


  if (urls !== null) {
    if (typeof urls === 'string') {
      urls = [urls];
    }

    for (let i = 0; i < urls.length; i++) {
      const video = urls[i];
      if (isYouTubeRegex.test(video)) {
        // Get possible IDs.
        const details = url.parse(video, true);
        let id = details.query.v || '';
        if (id) {
          args.push('http://www.youtube.com/watch?v=' + id);
        } else {
          // Get possible IDs for youtu.be from urladdr.
          id = details.pathname.slice(1).replace(/^v\//, '');
          if (id) {
            args.push(video);
            args.unshift('-i');
          }
        }
      } else {
        if (i === 0)
          args.push('--');
        args.push(video);
      }
    }
  }

  return youtubeDl(args, options, callback)
}

/**
 * Calls youtube-dl with some arguments and the `callback`
 * gets called with the output.
 *
 * @param {String} url
 * @param {Array.<String>} args
 * @param {Object} options
 * @param {Function(!Error, String)} callback
 */
ytdl.exec = function exec(url, args, options, callback) {
  return call(url, [], args, options, callback);
};


/**
 * @param {Object} data
 * @returns {Object}
 */
function parseInfo(data) {
  const info = JSON.parse(data);

  // Add and process some entries to keep backwards compatibility
  Object.defineProperty(info, 'filename', {
    get: function get() {
      console.warn('`info.filename` is deprecated, use `info._filename`');
      return info._filename;
    }
  });
  Object.defineProperty(info, 'itag', {
    get: function get() {
      console.warn('`info.itag` is deprecated, use `info.format_id`');
      return info.format_id;
    }
  });
  Object.defineProperty(info, 'resolution', {
    get: function get() {
      console.warn('`info.resolution` is deprecated, use `info.format`');
      return info.format.split(' - ')[1];
    }
  });

  info._duration_raw = info.duration;
  info._duration_hms = (info.duration) ? hms.fromS(info.duration, 'hh:mm:ss') : info.duration;
  info.duration = (info.duration) ? util.formatDuration(info.duration) : info.duration;

  return info;
}

/**
 * Set path from youtube-dl.
 *
 * @param {String} path
 */
ytdl.setYtdlBinary = function setYtdlBinary(path) {
  ytdlBinary = path;
};

/**
 * Get path from youtube-dl.
 *
 * @param {String} path
 */
ytdl.getYtdlBinary = function getYtdlBinary() {
  return ytdlBinary;
};


/**
 * Gets info from a video.
 *
 * @param {String} url
 * @param {Array.<String>} args
 * @param {Object} options
 * @param {Function(!Error, Object)} callback
 */
ytdl.getInfo = function getInfo(url, args, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  } else if (typeof args === 'function') {
    callback = args;
    options = {};
    args = [];
  }
  const defaultArgs = ['--dump-json'];
  if (!args || args.indexOf('-f') < 0 && args.indexOf('--format') < 0 &&
    args.every(function (a) {
      return a.indexOf('--format=') !== 0;
    })) {
    defaultArgs.push('-f');
    defaultArgs.push('best');
  }

  call(url, defaultArgs, args, options, function done(err, data) {
    if (err) return callback(err);
    let info;

    try {
      info = data.map(parseInfo);
    } catch (err) {
      return callback(err);
    }

    return callback(null, info.length === 1 ? info[0] : info);
  });
};

/**
 * @param {String} url
 * @param {Object} options
 *   {Boolean} auto
 *   {Boolean} all
 *   {String} lang
 *   {String} cwd
 * @param {Function(!Error, Object)} callback
 */
ytdl.getSubs = function getSubs(url, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  const args = ['--skip-download'];
  args.push('--write' + (options.auto ? '-auto' : '') + '-sub');
  if (options.all) {
    args.push('--all-subs');
  }
  if (options.lang) {
    args.push('--sub-lang=' + options.lang);
  }
  if (!options.warrning) {
    args.push('--no-warnings');
  }

  call(url, args, [], { cwd: options.cwd }, function (err, data) {
    if (err) return callback(err);

    const files = [];
    for (let i = 0, len = data.length; i < len; i++) {
      const line = data[i];
      if (line.indexOf('[info] Writing video subtitles to: ') === 0) {
        files.push(line.slice(35));
      }
    }

    return callback(null, files);
  });
};

/**
 * @param {String} url
 * @param {Object} options
 *   {Boolean} all
 *   {String} cwd
 * @param {Function(!Error, Object)} callback
 */
ytdl.getThumbs = function getThumbs(url, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  const args = ['--skip-download'];

  if (options.all) {
    args.push('--write-all-thumbnails');
  } else {
    args.push('--write-thumbnail');
  }

  if (!options.warrning) {
    args.push('--no-warnings');
  }

  call(url, args, [], { cwd: options.cwd }, function (err, data) {
    if (err) return callback(err);

    const files = [];
    for (let i = 0, len = data.length; i < len; i++) {
      const line = data[i];
      const info = 'Writing thumbnail to: ';
      if (line.indexOf(info) !== -1) {
        files.push(line.slice(line.indexOf(info) + info.length));
      }
    }
    return callback(null, files);
  });
};

/**
 * @param {!Boolean} descriptions
 * @param {!Object} options
 * @param {Function(!Error, Object)} callback
 */
ytdl.getExtractors = function getExtractors(descriptions, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  } else if (typeof descriptions === 'function') {
    callback = descriptions;
    options = {};
    descriptions = false;
  }

  const args = descriptions ? ['--extractor-descriptions'] : ['--list-extractors'];
  return call(null, args, null, options, callback);
};
