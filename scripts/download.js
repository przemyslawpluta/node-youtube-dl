var fs         = require('fs')
  , path       = require('path')
  , existsSync = fs.existsSync || path.existsSync
  , https      = require('https')
  ;


var dir = path.join(__dirname, '..', 'bin')
  , filename = 'youtube-dl'
  , filepath = path.join(dir, filename)
  ;


// make bin dir if it doesn't exists
if (!existsSync(dir)) {
  fs.mkdirSync(dir, 484);
}

// download latst version of youtube-dl
https.get({
    host: 'raw.github.com'
  , path: '/rg3/youtube-dl/master/youtube-dl'
}, function(res) {
  if (res.statusCode !== 200) {
    throw Error('Response Error: ' + res.statusCode);
  }

  res.pipe(fs.createWriteStream(filepath));
  res.on('end', function() {
    // make file executable
    fs.chmodSync(filepath, 457);
    console.log('Finished!');
  });

}).on('error', function(err) {
  throw err;
});

console.log('Downloading latest youtube-dl');
