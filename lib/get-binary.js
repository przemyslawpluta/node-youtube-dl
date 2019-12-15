'use strict'

const debug = require('debug')('youtube-dl')
const { readFileSync, existsSync } = require('fs')
const path = require('path')

const binPath = path.join(__dirname, '..', 'bin')
const detailsPath = path.join(binPath, 'details')

module.exports = () => {
  if (!existsSync(detailsPath)) {
    debug('unable to locate `youtube-dl` at ' + binPath)
  }

  const details = JSON.parse(readFileSync(detailsPath))

  return details.path
    ? details.path
    : path.resolve(__dirname, '..', 'bin', details.exec)
}
