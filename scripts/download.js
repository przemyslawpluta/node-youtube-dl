var fs         = require('fs')
  , path       = require('path')
  , existsSync = fs.existsSync || path.existsSync
  , http      = require('http')
  ;


var dir = path.join(__dirname, '..', 'bin')
  , filename = 'youtube-dl'
  , filepath = path.join(dir, filename)
  ;


// Make bin dir if it doesn't exists.
if (!existsSync(dir)) {
  fs.mkdirSync(dir, 484);
}

// Download youtube-dl.
http.get({
    host: 'youtube-dl.org'
  , path: '/downloads/2013.05.14/youtube-dl'
}, function(res) {
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
