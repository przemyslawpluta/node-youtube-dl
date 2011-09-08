(function() {
  var exec, filename, filepath, folder, fs, https, path, removeLink, symlink;
  fs = require('fs');
  path = require('path');
  https = require('https');
  exec = require('child_process').exec;
  folder = path.normalize(__dirname + '/../bin');
  filename = '/youtube-dl';
  filepath = folder + filename;
  symlink = path.dirname(process.env._) + filename;
  removeLink = function() {
    var linkExists;
    linkExists = ((function() {
      try {
        fs.readlinkSync(symlink);
        return true;
      } catch (err) {
        return false;
      }
    })());
    if (linkExists) {
      return fs.unlinkSync(symlink);
    }
  };
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
          if (!path.existsSync(folder)) {
            fs.mkdirSync(folder, 0744);
          }
          removeLink();
          fs.writeFileSync(filepath, content);
          fs.chmodSync(filepath, 0711);
          return fs.symlinkSync(filepath, symlink);
        });
      }).on('error', function(err) {
        throw err;
      });
      break;
    case 'preuninstall':
      removeLink();
  }
}).call(this);
