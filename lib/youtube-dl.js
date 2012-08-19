var spawn        = require('child_process').spawn
  , execFile     = require('child_process').execFile
  , EventEmitter = require('events').EventEmitter
  , fs           = require('fs')
  , path         = require('path')
  , exists       = fs.exists || path.exists
  , split        = require('event-stream').split
  ;


// arguments we dont want users to use with youtube-dl
// because they will break the module
var badArgs = [
    '-h', '--help'
  , '-v', '--version'
  , '-U', '--update'
  , '-q', '--quiet'
  , '-s', '--simulate'
  , '-g', '--get-url'
  , '-e', '--get-title'
  , '--get-thumbnail'
  , '--get-description'
  , '--get-filename'
  , '--no-progress'
  , '--console-title'
];

// helps parse options used in youtube-dl command
var parseOpts = function(args) {
  var pos;
  for (var i = 0, len = badArgs.length; i < len; i++) {
    if ((pos = args.indexOf(badArgs[i])) !== -1) {
      args.splice(pos, 1);
    }
  }
  return args;
};

// check that youtube-dl file exists
var file = path.join(__dirname, '..', 'bin', 'youtube-dl');
exists(file, function(exists) {
  if (exists) return;

  require(__dirname + '/../scripts/download');
  exists(file, function(exists) {
    if (!exists) {
      throw new Error('youtube-dl file does not exist. tried to download it but failed.');
    }
  });
});


// rounds a number to n decimal places
var round = function(num, n) {
  var dec = Math.pow(10, n);
  return Math.round(num * dec + 0.1) / dec;
};


// converst from bytes kb, mb, and gb to bytes
var toBytes = function(s) {
  var speed = parseFloat(s.substring(0, s.length - 1));
  switch (s.substr(-1, 1).toLowerCase()) {
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


// converst bytes to human readable unit
// thank you Amir from StackOverflow
var units = ' KMGTPEZYXWVU';
var getHumanSize = function(bytes) {
  if (bytes <= 0) { return 0; }
  var t2 = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), 12);
  return (Math.round(bytes * 100 / Math.pow(1024, t2)) / 100) +
          units.charAt(t2).replace(' ', '') + 'B';
};


// converts ms to human readable time
var getHumanTime = function(ms) {
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
    str += d + ' day' + (d > 1 ? 's' : '') + ', ';
    set = true;
  }
  if (set || h > 0) {
    str += h + ' hour' + (h > 1 ? 's' : '') + ', ';
    set = true;
  }
  if (set || m > 0) {
    str += m + ' minute' + (m > 1 ? 's' : '') + ', ';
    set = true;
  }
  if (set || s > 0) {
    str += s + ' second' + (s > 1 ? 's' : '') + ', ';
  }

  return str + ms + ' ms';
};


var regex = /(\d+\.\d)% of (\d+\.\d+\w) at\s+([^\s]+) ETA ((\d|-)+:(\d|-)+)/;

// main download function
exports.download = function(url, dest, args) {
  // setup settings
  dest = dest || process.cwd();
  if (args == null) {
    args = [];
  } else {
    args = parseOpts(args);
  }
  args.push(url);

  // call youtube-dl
  var youtubedl = spawn(file, args, { cwd: dest });
  var speed = [];
  var start = Date.now();

  var filename, size, state;
  var emitter = new EventEmitter();
  var line = new split();

  youtubedl.stdout.setEncoding('utf8');
  youtubedl.stdout.pipe(line);
  line.on('data', function(data) {
    var pos, result;

    // check if video is uploading so script can start
    // calling the download progress function
    if (state === 'download' && (result = regex.exec(data))) {

      // if this is the first progress display, grab file size
      if (!size) {
        emitter.emit(state, {
            filename : filename
          , size     : size = result[2]
        });
      }

      if (result[3] !== '---b/s') {
        speed.push(toBytes(result[3].substring(0, result[3].length - 2)));
      }
      emitter.emit('progress', {
          percent : result[1]
        , speed   : result[3]
        , eta     : result[4]
      });

    // about to start downloading video
    } else if ((pos = data.indexOf('[download] ')) === 0) {
      state = 'download';
      filename = data.slice(24);

    // check if this is any other state
    } else if ((pos = data.indexOf(']')) !== -1) {
      state = data.slice(pos + 2);
      emitter.emit(state);
    }
  });

  youtubedl.stderr.on('data', function(data) {
    data = data.toString().trim();
    var err = new Error(data.substring(7, data.length - 1));
    emitter.emit('error', err);
  });

  youtubedl.on('exit', function() {
    var averageSpeed = 0;
    for (var i = 0, len = speed.length; i < len; i++) {
      averageSpeed += speed[i];
    }
    averageSpeed /= speed.length;

    var timeTaken = Date.now() - start;
    emitter.emit('end', {
        filename          : filename
      , size              : size
      , timeTakenms       : timeTaken
      , timeTaken         : getHumanTime(timeTaken)
      , averageSpeedBytes : round(averageSpeed, 2)
      , averageSpeed      : getHumanSize(averageSpeed) + '/s'
    });
  });

  return emitter;
};


// gets info from a video
exports.info = function(url, callback, args) {
  // setup settings
  if (args == null) {
    args = [];
  } else {
    args = parseOpts(args);
  }
  args = [
      '--get-url'
    , '--get-title'
    , '--get-thumbnail'
    , '--get-description'
    , '--get-filename'
  ].concat(args);
  args.push(url);

  // call youtube-dl
  execFile(file, args, function(err, stdout, stderr) {
    if (err) return callback(err);
    if (stderr) return callback(new Error(stderr.slice(7)));

    var data = stdout.split('\n');
    var info = {
        title       : data[0]
      , url         : data[1]
      , thumbnail   : data[2]
      , description : data[3]
      , filename    : data[4]
    };

    callback(null, info);
  });
};
