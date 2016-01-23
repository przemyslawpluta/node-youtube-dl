var downloader = require('../lib/downloader');

downloader(function error(err) {
  'use strict';
  if (err) { return console.log(err); }
});