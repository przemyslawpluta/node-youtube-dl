(function() {
  var badArgs, file, fs, getHumanSize, getHumanTime, hasArg, parseOpts, path, regex, round, spawn, toBytes, units;
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
  round = function(num, n) {
    var dec;
    dec = Math.pow(10, n);
    return Math.round(num * dec + 0.1) / dec;
  };
  toBytes = function(s) {
    var speed;
    speed = parseFloat(s.substring(0, s.length - 3));
    switch (s.substr(-3, 1).toLowerCase()) {
      case 'b':
        return speed;
      case 'k':
        return speed * 1024;
      case 'm':
        return speed * 1024 * 1024;
      case 'g':
        return speed * 1024 * 1024 * 1024;
    }
  };
  units = ' KMGTPEZYXWVU';
  getHumanSize = function(bytes) {
    var t2;
    if (bytes <= 0) {
      return 0;
    }
    t2 = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), 12);
    return (Math.round(bytes * 100 / Math.pow(1024, t2)) / 100) + units.charAt(t2).replace(' ', '') + 'B';
  };
  getHumanTime = function(ms) {
    var d, h, m, s, set, str, x;
    x = ms / 1000;
    ms %= 1000;
    s = Math.round(x % 60);
    x /= 60;
    m = Math.round(x % 60);
    x /= 60;
    h = Math.round(x % 24);
    d = Math.round(x / 24);
    str = '';
    if (d > 0) {
      str += "" + d + " day" + (d > 1 ? 's' : void 0) + ", ";
      set = true;
    }
    if (set || h > 0) {
      str += "" + h + " hour" + (h > 1 ? 's' : void 0) + ", ";
      set = true;
    }
    if (set || m > 0) {
      str += "" + m + " minute" + (m > 1 ? 's' : void 0) + ", ";
      set = true;
    }
    if (set || s > 0) {
      str += "" + s + " second" + (s > 1 ? 's' : void 0) + ", ";
    }
    return "" + str + ms + " ms";
  };
  regex = /(\d+\.\d)% of (\d+\.\d+\w) at\s+([^\s]+) ETA ((\d|-)+:(\d|-)+)/;
  module.exports.download = function(url, dest, stateChange, download, callback, args) {
    var err, size, speed, start, state, video, youtubedl;
    args = parseOpts(args);
    args.push(url);
    youtubedl = spawn(file, args, {
      cwd: dest
    });
    speed = [];
    start = new Date().getTime();
    err = video = size = state = false;
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
          speed.push(toBytes(result[3]));
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
      var averageSpeed, i, timeTaken, _i, _len;
      averageSpeed = 0;
      for (_i = 0, _len = speed.length; _i < _len; _i++) {
        i = speed[_i];
        averageSpeed += i;
      }
      averageSpeed /= speed.length;
      timeTaken = new Date().getTime() - start;
      return callback(err, {
        timeTakenms: timeTaken,
        timeTaken: getHumanTime(timeTaken),
        averageSpeedBytes: round(averageSpeed, 2),
        averageSpeed: getHumanSize(averageSpeed) + '/s'
      });
    });
  };
  module.exports.info = function(url, callback, args) {
    var err, info, youtubedl;
    args = parseOpts(args);
    args = ['--get-url', '--get-title', '--get-thumbnail', '--get-description'].concat(args);
    args.push(url);
    youtubedl = spawn(file, args);
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
