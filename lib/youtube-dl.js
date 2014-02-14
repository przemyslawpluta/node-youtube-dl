var spawn        = require('child_process').spawn;
var execFile     = require('child_process').execFile;
var EventEmitter = require('events').EventEmitter;
var fs           = require('fs');
var path         = require('path');
var url          = require('url');
var split        = require('event-stream').split;
var util         = require('./util');


// Check that youtube-dl file exists.
var file = path.join(__dirname, '..', 'bin', 'youtube-dl');
fs.exists(file, function(exists) {
  if (exists) return;

  require(__dirname + '/../scripts/download');
  fs.exists(file, function(exists) {
    if (!exists) {
      throw new Error('youtube-dl file does not exist. tried to download it but failed.');
    }
  });
});

var progressRegex = /(\d+(?:\.\d)?)% of (\d+\.\d+\w+) at\s+([^\s]+) ETA ((\d|-)+:(\d|-)+)/;

var isYouTubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//;

// check if win
var isWin = /^win/.test(process.platform);

/**
 * Downloads a video.
 *
 * @param {String} urladdr
 * @param {String} dest The directory where the video will be saved.
 * @param {Array.<String>} args
 */
exports.download = function(urladdr, dest, args) {
  // Setup settings.
  dest = dest || process.cwd();
  if (args == null) {
    args = [];
  } else {
    args = util.parseOpts(args);
  }
  args.push(urladdr);

   // Parse url.
  var details = url.parse(urladdr, true);
  var query = details.query;

  // Get possible IDs.
  var id = query.v || '';

  // Check for long and short youtube video url.
  if (!id && isYouTubeRegex.test(urladdr)) {
    // Get possible IDs for youtu.be from urladdr.
    id = details.pathname.slice(1);
  }
  
  var speed = [];
  var start = Date.now();

  var filename, size, state, youtubedl;
  var emitter = new EventEmitter();
  var line = new split(/\r?\n|\r/);

  // Call youtube-dl.
  if (!isWin) {
    youtubedl = spawn(file, args, { cwd: dest });
  } else {
    youtubedl = spawn('python', [file].concat(args), { cwd: dest });
  }

  youtubedl.stdout.setEncoding('utf8');
  youtubedl.stdout.pipe(line);
  line.on('data', function(data) {
    var pos;

    // Check if video is uploading so script can start
    // calling the download progress function.
    if (state === 'download') {
      var result;
      if (result = progressRegex.exec(data)) {
        // If this is the first progress display, grab file size.
        if (!size) {
          emitter.emit(state, {
              filename : filename
            , size     : size = result[2]
          });
        }

        if (result[3] !== '---b/s') {
          speed.push(util.toBytes(result[3].substring(0, result[3].length - 2)));
        }
        emitter.emit('progress', {
            percent : result[1]
          , speed   : result[3]
          , eta     : result[4]
        });
      }

    // About to start downloading video.
    } else if ((pos = data.indexOf('[download] ')) === 0) {
      state = 'download';
      filename = data.slice(24);

    // Check if this is any other state.
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
    if (speed.length) {
      for (var i = 0, len = speed.length; i < len; i++) {
        averageSpeed += speed[i];
      }
      averageSpeed /= len;
    }

    var timeTaken = Date.now() - start;
    emitter.emit('end', {
        id                : id
      , filename          : filename
      , size              : size
      , timeTakenms       : timeTaken
      , timeTaken         : util.getHumanTime(timeTaken)
      , averageSpeedBytes : util.round(averageSpeed, 2)
      , averageSpeed      : util.getHumanSize(averageSpeed) + '/s'
    });
  });

  return emitter;
};


/**
 * Calls youtube-dl with some arguments and the `callback`
 * gets called with the output.
 *
 * @param {String} url
 * @param {Array.<String>} args
 * @param {Array.<String>} options
 * @param {Function(!Error, String)} callback
 */
function call(url, args, options, callback) {
  args = args.concat(util.parseOpts(options));
  args.push(url);

  var opt = [file, args, ''];

  if (isWin) { opt = ['python', [file].concat(args), '\r']; }

  // Call youtube-dl.
  execFile(opt[0], opt[1], function(err, stdout, stderr) {
    if (err) return callback(err);
    if (stderr) return callback(new Error(stderr.slice(7)));

    var data = stdout.trim().split(opt[2] + '\n');
    callback(null, data);
  });
  
}


/**
 * Gets info from a video.
 *
 * @param {String} url
 * @param {Array.<String>} options
 * @param {Function(!Error, Object)} callback
 */
exports.getInfo = function(url, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = [];
  }
  var args = [
      '--get-id'
    , '--get-url'
    , '--get-title'
    , '--get-thumbnail'
    , '--get-filename'
    , '--get-format'
    , '--get-description'
  ];

  call(url, args, options, function(err, data) {
    if (err) return callback(err);

    var format = data[data.length - 1].split(' - ');
    var info = {
        title       : data[0]
      , id          : data[1]
      , url         : data[2]
      , thumbnail   : data[3]
      , description : data.slice(4, data.length - 2).join('\n')
      , filename    : data[data.length - 2]
      , itag        : parseInt(format[0], 10)
      , resolution  : format[1]
    };

    callback(null, info);
  });
};


var formatsRegex = /^(\d+)\s+([a-z0-9]+)\s+(\d+x\d+|d+p|audio only)/;

/**
 * @param {String} url
 * @param {Array.<String>} options
 * @param {Function(!Error, Object)} callback
 */
exports.getFormats = function(url, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = [];
  }
  call(url, ['--list-formats'], options, function(err, data) {
    if (err) return callback(err);

    var formats = [];
    data.map(function(line) {
      var result = formatsRegex.exec(line);
      if (result) {
        formats.push({
          itag       : parseInt(result[1], 10),
          filetype   : result[2],
          resolution : result[3],
        });
      }
    });

    callback(null, formats);
  });
};
