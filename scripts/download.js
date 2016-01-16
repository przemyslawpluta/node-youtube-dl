var fs    = require('fs');
var path  = require('path');
var http  = require('http');
var https = require('https');

var dir = path.join(__dirname, '..', 'bin');
var filepath = path.join(dir, 'youtube-dl');
var verpath  = path.join(dir, 'version');

if (process.platform === 'win32') { filepath += '.exe'; }

// Make bin dir if it doesn't exists.
if (!fs.existsSync(dir)) { fs.mkdirSync(dir, 484); }

var success = false;
function onerr(err) {
  'use strict';
  if (success) { return; }
  throw err;
}

// Download youtube-dl.
function download(link, callback) {
  'use strict';
  https.get(link, function get(res) {

    if (res.statusCode !== 200) {
      callback(new Error('Response Error: ' + res.statusCode));
    }

    fs.chmodSync(dir, 457);
    res.pipe(fs.createWriteStream(filepath, { mode: 457 }));
    res.on('end', callback);
    res.on('error', onerr);

  }).on('error', onerr);
}

// First, look for the download link.
/*jshint maxlen:false */
var regexp = /https:\/\/yt-dl\.org\/downloads\/(\d{4}\.\d\d\.\d\d(\.\d)?)\/youtube-dl/;
function getDownloadLink() {
  'use strict';

  var url = 'https://rg3.github.io/youtube-dl/download.html';

  https.get(url, function get(res) {
    var body = '';
    res.setEncoding('utf8');

    res.on('data', function data(chunk) { body += chunk; });

    res.on('end', function end() {
      var m = regexp.exec(body);
      if (m) {
        // Check if there is a new version available.
        var newVersion = m[1];
        var oldVersion = fs.existsSync(verpath) &&
          fs.readFileSync(verpath, 'utf8');
        if (newVersion === oldVersion) {
          console.log('Already up to date', newVersion);
        } else {
          var link = m[0];

          if (process.platform === 'win32') { link += '.exe'; }

          console.log('Downloading "' + link + '"...');

          download(link, function downloadIt(err) {
            if (err) { return onerr(err); }
            fs.writeFileSync(verpath, newVersion);
            success = true;
            console.log('Downloaded youtube-dl', newVersion);
          });
        }
      } else {
        console.error('Could not find download link in ' + url);
      }
    });

    res.on('error', onerr);

  }).on('error', onerr);
}

console.log('Downloading latest youtube-dl');
getDownloadLink();
