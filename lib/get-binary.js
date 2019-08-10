'use strict'

const { readFileSync, existsSync } = require('fs')
const path = require('path')

const binPath = path.join(__dirname, '..', 'bin')
const detailsPath = path.join(binPath, 'details')

module.exports = () => {
  if (!existsSync(detailsPath)) {
    throw new Error('ERROR: unable to locate `youtube-dl` at ' + binPath)
  }

  const details = JSON.parse(readFileSync(detailsPath))

  return details.path
    ? details.path
    : path.resolve(__dirname, '..', 'bin', details.exec)
}
