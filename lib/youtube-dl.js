var execFile  = require('child_process').execFile;
var fs        = require('fs');
var path      = require('path');
var url       = require('url');
var http      = require('http');
var streamify = require('streamify');
var request   = require('request');
var util      = require('./util');


// Check that youtube-dl file exists.
var file = path.join(__dirname, '..', 'bin', 'youtube-dl');
fs.exists(file, function(exists) {
  if (!exists) {
    throw new Error('youtube-dl file does not exist.');
  }
});

var isDebug = /[debug]/;
var isYouTubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//;
var isNoSubsRegex =
  /WARNING: video doesn't have subtitles|no closed captions found/;
var subsRegex = /--write-sub|--write-srt|--srt-lang|--all-subs/;

// Check if win.
var isWin = /^win/.test(process.platform);

/**
 * Downloads a video.
 *
 * @param {String} url
 * @param {!Array.<String>} args
 * @param {!Object} options
 */
var ytdl = module.exports = function(url, args, options) {
  var stream = streamify({
    superCtor: http.ClientResponse,
    readable: true,
    writable: false
  });

  ytdl.getInfo(url, args, options, function(err, data) {
    if (err) {
      stream.emit('error', err);
      return;
    }

    var item = (!data.length) ? data : data.shift();

    var req = request(item.url);
    req.on('response', function(res) {
      if (res.statusCode !== 200) {
        stream.emit('error', new Error('status code ' + res.statusCode));
        return;
      }

      var size = parseInt(res.headers['content-length'], 10);
      if (size) {
        item.size = size;
      }
      stream.emit('info', item);
    });
    stream.resolve(req);
  });

  return stream;
};


/**
 * Calls youtube-dl with some arguments and the `callback`
 * gets called with the output.
 *
 * @param {String} url
 * @param {Array.<String>} args
 * @param {Object} options
 * @param {Function(!Error, String)} callback
 */
ytdl.exec = function (url, args, options, callback) {
  return call(url, [], args, options, callback);
};


/**
 * Calls youtube-dl with some arguments and the `callback`
 * gets called with the output.
 *
 * @param {String} url
 * @param {Array.<String>} args
 * @param {Array.<String>} args2
 * @param {Object} options
 * @param {Function(!Error, String)} callback
 */
function call(video, args1, args2, options, callback) {
  var args = args1.concat(util.parseOpts(args2));
  options = options || {};

  if (isYouTubeRegex.test(video)) {
    // Get possible IDs.
    var details = url.parse(video, true);
    var id = details.query.v || '';
    if (id) {
      args.push('http://www.youtube.com/watch?v=' + id);
    } else {
      // Get possible IDs for youtu.be from urladdr.
      id = details.pathname.slice(1).replace(/^v\//, '');
      if (id || id === 'playlist') {
        args.push(video);
      }
    }
  } else {
    args.push(video);
  }

  var opt = [file, args];

  if (isWin) { opt = [process.env.PYTHON || 'python', [file].concat(args)]; }

  // Call youtube-dl.
  execFile(opt[0], opt[1], options, function(err, stdout, stderr) {

    if (err) return callback(err);

    if (stderr) {

      // Try once to download video if no subtitles available
      if (!options.nosubs && isNoSubsRegex.test(stderr)) {

        var i;
        var cleanupOpt = args2;

        for (i = cleanupOpt.length - 1; i >= 0; i--) {
          if (subsRegex.test(cleanupOpt[i])) { cleanupOpt.splice(i, 1); }
        }

        options.nosubs = true;

        return call(video, args1, cleanupOpt, options, callback);

      }

      if (isDebug.test(stderr) && opt[1].indexOf('--verbose') > -1) {
        console.log('\n' + stderr);
      } else {
        return callback(new Error(stderr.slice(7)));
      }

    }

    var data = stdout.trim().split(/\r?\n/);
    callback(null, data);
  });

}


/**
 * Filters youtube info data and returns reformated object.
 *
 * @param {Array.<String>} data
 */
function filterData(data) {
  var format = data[data.length - 1].split(' - ');

  return {
    title       : data[0],
    id          : data[1],
    url         : data[2],
    thumbnail   : data[3],
    description : data.slice(4, data.length - 2).join('\n'),
    filename    : data[data.length - 2],
    itag        : parseInt(format[0], 10),
    resolution  : format[1],
  };

}


var resolutionRegex = /( - ([0-9]+x[0-9]+|\d+p|\?x[0-9]+|audio only|unknown))/;

/**
 * Gets info from a video.
 *
 * @param {String} url
 * @param {Array.<String>} args
 * @param {Function(!Error, Object)} callback
 */
ytdl.getInfo = function(url, args, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  } else if (typeof args === 'function') {
    callback = args;
    options = {};
    args = [];
  }
  var defaultArgs = [
    '--get-id',
    '--get-url',
    '--get-title',
    '--get-thumbnail',
    '--get-filename',
    '--get-format',
    '--get-description'
  ];

  call(url, defaultArgs, args, options, function(err, data) {
    if (err) return callback(err);

    var playlist = [];
    var track = [];

    data.forEach(function(row) {
      track.push(row);

      if (resolutionRegex.test(row)) {
        playlist.push(filterData(track));
        track = [];
      }
    });

    if (playlist.length === 1) {
      return callback(null, playlist[0]);
    } else {
      return callback(null, playlist);
    }
  });
};


var formatsRegex =
  /^(\d+)\s+([a-z0-9]+)\s+(\d+x\d+|\d+p|audio only|\?x\d+|unknown)/;

/**
 * @param {String} url
 * @param {!Array.<String>} args
 * @param {Function(!Error, Object)} callback
 */
ytdl.getFormats = function(url, args, callback) {
  if (typeof args === 'function') {
    callback = args;
    args = [];
  }
  call(url, ['--list-formats'], args, null, function(err, data) {
    if (err) return callback(err);

    var formats = [];
    var status = '';

    data.map(function(line) {
      var result = formatsRegex.exec(line);
      if (/\[info\]/.test(line)) { status = line.split(' ')[4].slice(0, -1); }
      if (result) {
        formats.push({
          id         : status,
          itag       : parseInt(result[1], 10),
          filetype   : result[2],
          resolution : result[3],
        });
      }
    });

    callback(null, formats);
  });
};

/**
 * @param {String} url
 * @param {Object} options
 *   {Boolean} auto
 *   {Boolean} all
 *   {String} lang
 *   {String} cwd
 * @param {Function(!Error, Object)} callback
 */
ytdl.getSubs = function(url, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  var args = [];
  args.push('--write' + (options.auto ? '-auto' : '') + '-sub');
  if (options.all) {
    args.push('--all-subs');
  }
  if (options.lang) {
    args.push('--sub-lang=' + options.lang);
  }
  call(url, args, [], { cwd: options.cwd }, function(err, data) {
    if (err) return callback(err);

    var files = [];
    for (var i = 0, len = data.length; i < len; i++) {
      var line = data[i];
      if (line.indexOf('[info] Writing video subtitles to: ') === 0) {
        files.push(line.slice(35));
      }
    }
    callback(null, files);
  });
};
