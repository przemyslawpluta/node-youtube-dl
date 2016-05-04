var fs    = require('fs');
var path  = require('path');
var mkdirp = require('mkdirp');
var request = require('request');

// First, look for the download link.
/*jshint maxlen:false */
var binPath;
var filePath;
var detailsPath;

var isWin = (process.platform === 'win32' || process.env.NODE_PLATFORM === 'windows') ? true : false;
var defaultBinPath = path.join(__dirname, '..', 'bin');
var defaultDetailsPath = path.join(defaultBinPath, 'details');
var regexp = /https:\/\/yt-dl\.org\/downloads\/(\d{4}\.\d\d\.\d\d(\.\d)?)\/youtube-dl/;
var url = 'https://rg3.github.io/youtube-dl/download.html';

function download(link, to, callback) {
  'use strict';

  var downloadFile = request.get(link);
  var status = null;

  downloadFile.on('response', function response(res) {
    if (res.statusCode !== 200) {
      status = new Error('Response Error: ' + res.statusCode);
      return;
    }
    downloadFile.pipe(fs.createWriteStream(to, {
      mode: 493
    }));
  });

  downloadFile.on('error', function error(err) {
    callback(err);
  });

  downloadFile.on('end', function end() {
    callback(status);
  });
}

function exec(path) {
  'use strict';
  return (isWin) ? path + '.exe' : path;
}

function downloader(userBinPath, callback) {
  'use strict';

  if (typeof userBinPath === 'function') {
    callback = userBinPath;
    userBinPath = null;
  }

  // prepare needed paths
  binPath = (userBinPath) ? userBinPath : defaultBinPath;
  filePath = path.join(binPath, exec('youtube-dl'));
  detailsPath = path.join(binPath, 'details');

  // prepare needed folder
  mkdirp.sync(binPath);

  request.get(url, function get(err, res, body) {

    if (err || res.statusCode !== 200) {
      return callback(err || new Error('Response Error: ' + res.statusCode));
    }

    var m = regexp.exec(body);

    if (!m) {
      return callback(new Error('Could not find download link in ' + url));
    }

    // Check if there is a new version available.
    var newVersion = m[1];
    var details =
      fs.existsSync(detailsPath) && fs.readFileSync(detailsPath, 'utf8');

    if (details) {
      details = JSON.parse(details);
    }

    if (newVersion === details.version) {
      return callback(null, 'Already up to date ' + newVersion);
    }

    var link = exec(m[0]);

    download(link, filePath, function error(err) {
      if (err) {
        return callback(err);
      }
      fs.writeFileSync(detailsPath, JSON.stringify({
        version: newVersion,
        exec: exec('youtube-dl')
      }), 'utf8');
      callback(null, 'Downloaded youtube-dl ' + newVersion);
    });
  });
}

module.exports = downloader;
