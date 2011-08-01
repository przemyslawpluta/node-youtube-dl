(function() {
  var exec, filename, filepath, folder, fs, https, path, symlink;
  fs = require('fs');
  path = require('path');
  https = require('https');
  exec = require('child_process').exec;
  folder = path.normalize(__dirname + '/../bin');
  filename = '/youtube-dl';
  filepath = folder + filename;
  symlink = path.dirname(process.env._) + filename;
  switch (process.env.npm_lifecycle_event) {
    case 'preinstall':
    case 'update':
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
          var linkExists;
          if (!path.existsSync(folder)) {
            fs.mkdirSync(folder, 0744);
          }
          linkExists = ((function() {
            try {
              fs.readlinkSync(symlink);
              return true;
            } catch (err) {
              return false;
            }
          })());
          if (linkExists) {
            fs.unlinkSync(symlink);
          }
          fs.writeFileSync(filepath, content);
          fs.chmodSync(filepath, 0711);
          return fs.symlinkSync(filepath, symlink);
        });
      }).on('error', function(err) {
        throw err;
      });
      break;
    case 'preuninstall':
      fs.unlinkSync(symlink);
  }
}).call(this);
