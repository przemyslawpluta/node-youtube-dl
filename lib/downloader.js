'use strict'

const { promisify } = require('util')
const stream = require('stream')
const mkdirp = require('mkdirp')
const path = require('path')
const util = require('util')
const got = require('got')
const fs = require('fs')

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

  // handle overwritin
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

  download(
    `${ENDPOINT}?platform=${isWin ? 'windows' : 'linux'}`,
    function error (err, newVersion) {
      if (err) return callback(err)
      return callback(null, 'Downloaded youtube-dl ' + newVersion)
    }
  )
}

module.exports = downloader
