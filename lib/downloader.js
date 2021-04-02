'use strict'

const { promisify } = require('util')
const stream = require('stream')
const mkdirp = require('mkdirp')
const path = require('path')
const util = require('util')
const got = require('got')
const fs = require('fs')

const DIRECT_BINARY_DOWNLOAD_URL =
  process.env.YOUTUBE_DL_DIRECT_BINARY_DOWNLOAD_URL

const ENDPOINT =
  process.env.YOUTUBE_DL_DOWNLOAD_HOST ||
  'https://youtube-dl-binary.vercel.app/'

const pipeline = promisify(stream.pipeline)

const [, , ...flags] = process.argv

const isWin = flags.includes('--platform=windows') || require('./util').isWin
const isOverwrite = flags.includes('--overwrite')

const getVersion = str =>
  /releases\/download\/(\d{4}\.\d\d\.\d\d(\.\d)?)\/youtube-dl/.exec(str)[1]

// First, look for the download link.
let dir
let filePath
const defaultBin = path.join(__dirname, '..', 'bin')

function download (url, callback) {
  got
    .get(url)
    .then(async res => {
      const binaryUrl = res.body

      await pipeline(
        got.stream(binaryUrl),
        fs.createWriteStream(filePath, { mode: 493 })
      )

      return binaryUrl
    })
    .then(binaryUrl => callback(null, getVersion(binaryUrl)))
    .catch(callback)
}

const exec = path => (isWin ? path + '.exe' : path)

function createBase (binDir) {
  dir = binDir || defaultBin
  if (!fs.existsSync(dir)) {
    mkdirp.sync(dir)
    if (binDir) mkdirp.sync(defaultBin)
  }
  filePath = path.join(dir, exec('youtube-dl'))
}

function downloader (binDir, callback) {
  if (typeof binDir === 'function') {
    callback = binDir
    binDir = null
  } else if (!callback) {
    return util.promisify(downloader)(binDir)
  }

  createBase(binDir)

  // handle overwriting
  if (fs.existsSync(filePath)) {
    if (!isOverwrite) {
      return callback(new Error('File exists'))
    }

    try {
      fs.unlinkSync(filePath)
    } catch (e) {
      callback(e)
    }
  }

  if (DIRECT_BINARY_DOWNLOAD_URL !== undefined) {
    const binaryUrl = DIRECT_BINARY_DOWNLOAD_URL + isWin ? '.exe' : ''

    const downloadFile = request.get(binaryUrl)
    const outputStream = fs.createWriteStream(filePath, { mode: 493 })
    outputStream.on('close', function end () {
      callback(null, 'Downloaded youtube-dl from custom mirror.')
      fs.writeFileSync(
        defaultPath,
        JSON.stringify({
          version: 'custom-mirror-version',
          path: binDir ? filePath : binDir,
          exec: exec('youtube-dl')
        }),
        'utf8'
      )
    })
    downloadFile.pipe(outputStream)
    downloadFile.on('error', function error (err) {
      callback(err)
    })
    return
  }

  download(
    `${ENDPOINT}?platform=${isWin ? 'windows' : 'linux'}`,
    function error (err, newVersion) {
      if (err) return callback(err)
      return callback(null, 'Downloaded youtube-dl ' + newVersion)
    }
  )
}

module.exports = downloader
