'use strict'

const util = require('util')
const downloader = require('./downloader')

const downloaderPromise = util.promisify(downloader)

module.exports = downloaderPromise
