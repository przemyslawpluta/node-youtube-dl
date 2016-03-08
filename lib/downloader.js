var fs    = require('fs');
var path  = require('path');
var mkdirp = require('mkdirp');
var request = require('request');
var pkg = require('../package');
var pathEx = require('path-extra');

// First, look for the download link.
/*jshint maxlen:false */
var dir, filePath, isWin;
var dataPath = pathEx.datadir(pkg.name);
var regexp = /https:\/\/yt-dl\.org\/downloads\/(\d{4}\.\d\d\.\d\d(\.\d)?)\/youtube-dl/;
var url = 'https://rg3.github.io/youtube-dl/download.html';

function download(link, callback) {

  'use strict';
  var downloadFile = request.get(link);
  var status = null;

  downloadFile.on('response', function response(res) {
    if (res.statusCode !== 200) {
      status = new Error('Response Error: ' + res.statusCode);
      return;
    }
    downloadFile.pipe(fs.createWriteStream(filePath, {mode: 457}));
  });

  downloadFile.on('error', function error(err) { callback(err); });

  downloadFile.on('end', function end() { callback(status); });

}

function createBase(binDir) {
  'use strict';
  isWin = (process.platform === 'win32' || process.env.NODE_PLATFORM === 'windows') ? true : false;
  dir = (binDir) ? binDir : path.join(__dirname, '..', 'bin');
  mkdirp.sync(dir, {mode: 484});
  mkdirp.sync(dataPath, {mode: 484});
  filePath = path.join(dir, 'youtube-dl' + ((isWin) ? '.exe' : ''));
}

function savePath() {
  'use strict';
  fs.writeFileSync(path.join(dataPath, 'bin'), filePath, 'utf8');
}

function downloader(binDir, callback) {

  'use strict';
  if (typeof binDir === 'function') {
    callback = binDir;
    binDir = null;
  }

  createBase(binDir);

  var ytdlBinary = fs.readFileSync(dataPath + '/bin').toString();

  var exists = fs.existsSync(ytdlBinary);

  request.get(url, function get(err, res, body) {

    if (err || res.statusCode !== 200) { return callback(err || new Error('Response Error: ' + res.statusCode)); }

    var m = regexp.exec(body);

    if (!m) { return callback(new Error('Could not find download link in ' + url)); }

    // Check if there is a new version available.
    var newVersion = m[1];
    var verpath  = path.join(dir, 'version');
    var oldVersion = fs.existsSync(verpath) && fs.readFileSync(verpath, 'utf8');

    if (newVersion === oldVersion && exists) { return callback(null, 'Already up to date ' + newVersion); }

    var link = m[0];
    if (isWin) { link += '.exe'; }

    download(link, function error(err) {
      if (err) { return callback(err); }
      fs.writeFileSync(verpath, newVersion);
      savePath();
      callback(null, 'Downloaded youtube-dl ' + newVersion);
    });

  });

}

module.exports = downloader;
