'use strict'

const request = require('request')
const mkdirp = require('mkdirp')
const path = require('path')
const util = require('util')
const fs = require('fs')

const DIRECT_BINARY_DOWNLOAD_URL =
  process.env.YOUTUBE_DL_DIRECT_BINARY_DOWNLOAD_URL

const ENDPOINT =
  process.env.YOUTUBE_DL_DOWNLOAD_HOST ||
  'https://youtube-dl-binary.vercel.app/'

const [, , ...flags] = process.argv

const isWin = flags.includes('--platform=windows') || require('./util').isWin
const isOverwrite = flags.includes('--overwrite')

// First, look for the download link.
let dir, filePath
const defaultBin = path.join(__dirname, '..', 'bin')
const defaultPath = path.join(defaultBin, 'details')

function download (url, callback) {
  let status

  request.get(url, function (err, res) {
    if (err) return callback(err)

    const binaryUrl = res.body
    const downloadFile = request.get(binaryUrl)
    const version = /releases\/download\/(\d{4}\.\d\d\.\d\d(\.\d)?)\/youtube-dl/.exec(
      binaryUrl
    )[1]

    downloadFile.on('response', function response (res) {
      if (res.statusCode !== 200) {
        status = new Error('Response Error: ' + res.statusCode)
        return
      }

      const outputStream = fs.createWriteStream(filePath, { mode: 493 })
      outputStream.on('close', function end () {
        callback(status, version)
      })
      downloadFile.pipe(outputStream)
    })

    downloadFile.on('error', function error (err) {
      callback(err)
    })
  })
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
      return callback('File exists')
    } else {
      try {
        fs.unlinkSync(filePath)
      } catch (e) {
        callback(e)
      }
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
      fs.writeFileSync(
        defaultPath,
        JSON.stringify({
          version: newVersion,
          path: binDir ? filePath : binDir,
          exec: exec('youtube-dl')
        }),
        'utf8'
      )
      return callback(null, 'Downloaded youtube-dl ' + newVersion)
    }
  )
}

module.exports = downloader
