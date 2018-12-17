var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var request = require('request');

// First, look for the download link.
/*jshint maxlen:false */
var dir, filePath;
var isWin = (process.platform === 'win32' || process.env.NODE_PLATFORM === 'windows') ? true : false;
var defaultBin = path.join(__dirname, '..', 'bin');
var defaultPath = path.join(defaultBin, 'details');
var url = 'https://yt-dl.org/downloads/latest/youtube-dl';

function download(url, callback) {
  'use strict';

  var status = null;

  // download the correct version of the binary based on the platform
  url = exec(url);

  request.get(url, { followRedirect: false }, function (err, res) {
    if (res.statusCode !== 302) {
      return callback(new Error('Did not get redirect for the latest version link. Status: ' + res.statusCode));
    }

    var url = res.headers.location;
    var downloadFile = request.get(url);
    var newVersion = /yt-dl\.org\/downloads\/(\d{4}\.\d\d\.\d\d(\.\d)?)\/youtube-dl/.exec(url)[1];

    downloadFile.on('response', function response(res) {
      if (res.statusCode !== 200) {
        status = new Error('Response Error: ' + res.statusCode);
        return;
      }
      downloadFile.pipe(fs.createWriteStream(filePath, { mode: 493 }));
    });

    downloadFile.on('error', function error(err) { callback(err); });

    downloadFile.on('end', function end() { callback(status, newVersion); });

  });
}

function exec(path) {
  'use strict';
  return (isWin) ? path + '.exe' : path;
}

function createBase(binDir) {
  'use strict';
  dir = (binDir) ? binDir : defaultBin;
  mkdirp.sync(dir);
  if (binDir) { mkdirp.sync(defaultBin); }
  filePath = path.join(dir, exec('youtube-dl'));
}

function downloader(binDir, callback) {

  'use strict';
  if (typeof binDir === 'function') {
    callback = binDir;
    binDir = null;
  }

  createBase(binDir);

  download(url, function error(err, newVersion) {
    if (err) { return callback(err); }
    fs.writeFileSync(defaultPath, JSON.stringify({ version: newVersion, path: ((binDir) ? filePath : binDir), exec: exec('youtube-dl') }), 'utf8');
    callback(null, 'Downloaded youtube-dl ' + newVersion);
  });
}

module.exports = downloader;
