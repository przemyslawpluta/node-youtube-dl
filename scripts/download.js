(function() {
  var exec, filename, filepath, folder, fs, https, path;
  fs = require('fs');
  path = require('path');
  https = require('https');
  exec = require('child_process').exec;
  folder = path.normalize(__dirname + '/../bin');
  filename = '/youtube-dl';
  filepath = folder + filename;
  https.get({
    host: 'raw.github.com',
    path: '/rg3/youtube-dl/master/youtube-dl'
  }, function(res) {
    var content;
    content = '';
    res.on('data', function(data) {
      return content += data;
    });
    return res.on('end', function() {
      if (!path.existsSync(folder)) {
        fs.mkdirSync(folder, 0744);
      }
      fs.writeFileSync(filepath, content);
      return fs.chmodSync(filepath, 0711);
    });
  }).on('error', function(err) {
    throw err;
  });
}).call(this);
