(function() {
  var badArgs, cmd, file, fs, hasArg, parseOpts, path, spawn;
  spawn = require('child_process').spawn;
  fs = require('fs');
  path = require('path');
  badArgs = ['-h', '--help', '-v', '--version', '-U', '--update', '-q', '--quiet', '-s', '--simulate', '-g', '--get-url', '-e', '--get-title', '--get-thumbnail', '--get-description', '--get-filename', '--no-progress', '--console-title'];
  parseOpts = function(args) {
    var arg, pos, _i, _len;
    if (args == null) {
      args = [];
    }
    for (_i = 0, _len = badArgs.length; _i < _len; _i++) {
      arg = badArgs[_i];
      if ((pos = hasArg(args, arg)) !== -1) {
        args.splice(pos, 1);
      }
    }
    return args;
  };
  hasArg = function(arr, arg) {
    var a, i, _len;
    for (i = 0, _len = arr.length; i < _len; i++) {
      a = arr[i];
      if ((a.indexOf(arg)) === 0) {
        return i;
      }
    }
    return -1;
  };
  file = path.normalize(__dirname + '/../bin/youtube-dl');
  fs.stat(file, function(err, stats) {
    if (err) {
      require(__dirname + '/../scripts/download');
      return fs.stat(file, function(err, stat) {
        if (err) {
          throw new Error('youtube-dl file does not exist. tried to download it but failed.');
        }
      });
    }
  });
  cmd = file;
  module.exports.download = function(url, dest, stateChange, download, callback, args) {
    var err, regex, size, state, video, youtubedl;
    args = parseOpts(args);
    args.push(url);
    youtubedl = spawn(cmd, args, {
      cwd: dest
    });
    err = video = size = state = false;
    regex = /(\d+\.\d)% of (\d+\.\d+\w) at\s+([^\s]+) ETA ((\d|-)+:(\d|-)+)/;
    youtubedl.stdout.on('data', function(data) {
      var pos, result;
      data = data.toString();
      if (state === 'Downloading video') {
        if (result = regex.exec(data)) {
          if (size === false) {
            stateChange(state, {
              video: video,
              size: size = result[2]
            });
          }
          return download({
            percent: result[1],
            speed: result[3],
            eta: result[4]
          });
        }
      } else if ((pos = data.indexOf('[download] ')) === 0) {
        return state = 'Downloading video';
      } else if ((pos = data.indexOf(']')) !== -1) {
        state = data.substring(pos + 2, data.length - 1);
        if ((pos = state.indexOf(':')) !== -1) {
          video = state.substring(0, pos);
          state = state.substring(pos + 2);
        }
        return stateChange(state, video);
      }
    });
    youtubedl.stderr.on('data', function(data) {
      data = data.toString();
      return err = data.substring(7, data.length - 1);
    });
    return youtubedl.on('exit', function(code) {
      return callback(err);
    });
  };
  module.exports.info = function(url, callback, args) {
    var err, info, youtubedl;
    args = parseOpts(args);
    args = ['--get-url', '--get-title', '--get-thumbnail', '--get-description'].concat(args);
    args.push(url);
    youtubedl = spawn(cmd, args);
    err = info = false;
    youtubedl.stdout.on('data', function(data) {
      data = data.toString().split("\n");
      return info = {
        title: data[0],
        url: data[1],
        thumbnail: data[2],
        description: data[3]
      };
    });
    youtubedl.stderr.on('data', function(data) {
      data = data.toString();
      return err = data.substring(7, data.length - 1);
    });
    return youtubedl.on('exit', function(code) {
      return callback(err, info);
    });
  };
}).call(this);
