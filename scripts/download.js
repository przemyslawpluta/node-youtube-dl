var fs   = require('fs');
var path = require('path');
var http = require('http');

var dir = path.join(__dirname, '..', 'bin');
var filename = 'youtube-dl';
var filepath = path.join(dir, filename);


// Make bin dir if it doesn't exists.
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, 484);
}

// Download youtube-dl.
var url = 'http://youtube-dl.org/downloads/2013.07.12/youtube-dl';
http.get(url, function(res) {
  if (res.statusCode !== 200) {
    throw Error('Response Error: ' + res.statusCode);
  }

  res.pipe(fs.createWriteStream(filepath));
  res.on('end', function() {
    // Make file executable.
    fs.chmodSync(filepath, 457);
    console.log('Finished!');
  });

}).on('error', function(err) {
  throw err;
});

console.log('Downloading latest youtube-dl');
