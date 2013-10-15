var fs    = require('fs');
var path  = require('path');
var http  = require('http');
var https = require('https');

var dir = path.join(__dirname, '..', 'bin');
var filename = 'youtube-dl';
var filepath = path.join(dir, filename);


// Make bin dir if it doesn't exists.
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, 484);
}

// First, look for the download link.
var regexp = /https:\/\/yt-dl\.org\/downloads\/\d{4}\.\d\d\.\d\d\/youtube-dl/;
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
        download(m[0]);
      } else {
        console.error('Could not find download link in ' + url);
      }
    });

    res.on('error', function(err) {
      throw err;
    });
  }).on('error', function(err) {
    throw err;
  });
}

// Download youtube-dl.
function download(link) {
  https.get(link, function(res) {
    if (res.statusCode !== 200) {
      throw Error('Response Error: ' + res.statusCode);
    }

    res.pipe(fs.createWriteStream(filepath));
    res.on('end', function() {
      // Make file executable.
      fs.chmodSync(filepath, 457);
      console.log('Finished!');
    });

    res.on('error', function(err) {
      throw err;
    });

  }).on('error', function(err) {
    throw err;
  });
}

console.log('Downloading latest youtube-dl');
getDownloadLink();
