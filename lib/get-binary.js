'use strict'

const path = require('path')
const fs = require('fs')

const binPath = path.join(__dirname, '..', 'bin')
const detailsPath = path.join(binPath, 'details')

module.exports = () => {
  if (!fs.existsSync(detailsPath)) {
    throw new Error('ERROR: unable to locate `youtube-dl` at ' + binPath)
  }

  const details = JSON.parse(fs.readFileSync(detailsPath))

  return details.path
    ? details.path
    : path.resolve(__dirname, '..', 'bin', details.exec)
}
