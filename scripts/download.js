var downloader = require('../lib/downloader');

downloader(function error(err, done) {
  'use strict';
  if (err) { return console.log(err.stack); }
  console.log(done);
});
