var fs    = require('fs')
  , path  = require('path')
  , https = require('https')
  , exec  = require('child_process').exec


var folder = path.normalize(__dirname + '/../bin')
  , filename = '/youtube-dl'
  , filepath = folder + filename


// download latst version of youtube-dl
https.get({
    host: 'raw.github.com'
  , path: '/rg3/youtube-dl/master/youtube-dl'
}, function(res) {
  if (res.statusCode !== 200) {
    throw Error('Response Error: ' + res.statusCode);
  }

  var content = '';
  res.on('data', function(data) {
    return content += data;
  });

  res.on('end', function() {
    // make bin folder if it doesn't exists
    if (!path.existsSync(folder)) {
      fs.mkdirSync(folder, 0744);
    }

    // write file when finished
    fs.writeFileSync(filepath, content);

    // make it executable
    fs.chmodSync(filepath, 0711);

    console.log('Finished!');
  });

}).on('error', function(err) {
  throw err;
});

console.log('Downloading latest youtube-dl');
