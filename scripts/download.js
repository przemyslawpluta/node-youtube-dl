var fs    = require('fs');
var path  = require('path');
var http  = require('http');
var https = require('https');

var dir = path.join(__dirname, '..', 'bin');
var filepath = path.join(dir, 'youtube-dl');
var verpath  = path.join(dir, 'version');


// Make bin dir if it doesn't exists.
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, 484);
}

var success = false;
function onerr(err) {
  if (success) { return; }
  throw err;
}

// First, look for the download link.
/*jshint maxlen:false */
var regexp = /https:\/\/yt-dl\.org\/downloads\/(\d{4}\.\d\d\.\d\d(\.\d)?)\/youtube-dl/;
function getDownloadLink() {
  var url = 'http://rg3.github.io/youtube-dl/download.html';
  http.get(url, function(res) {
    var body = '';
    res.setEncoding('utf8');

    res.on('data', function(data) {
      body += data;
    });

    res.on('end', function() {
      var m = regexp.exec(body);
      if (m) {
        // Check if there is a new version available.
        var newVersion = m[1];
        var oldVersion = fs.existsSync(verpath) &&
          fs.readFileSync(verpath, 'utf8');
        if (newVersion === oldVersion) {
          console.log('Already up to date', newVersion);
        } else {
          download(m[0], function(err) {
            if (err) return onerr(err);
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

// Download youtube-dl.
function download(link, callback) {
  https.get(link, function(res) {
    if (res.statusCode !== 200) {
      callback(new Error('Response Error: ' + res.statusCode));
    }

    fs.chmodSync(dir, 457);
    res.pipe(fs.createWriteStream(filepath, { mode: 457 }));
    res.on('end', callback);
    res.on('error', onerr);
  }).on('error', onerr);
}

console.log('Downloading latest youtube-dl');
getDownloadLink();
