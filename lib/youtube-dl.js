var execFile  = require('child_process').execFile;
var fs        = require('fs');
var path      = require('path');
var url       = require('url');
var http      = require('http');
var streamify = require('streamify');
var request   = require('request');
var util      = require('./util');

var detailsPath = path.join(__dirname, '..', 'bin/details'), ytdlBinary;

if (fs.existsSync(detailsPath)) {
  var details = JSON.parse(fs.readFileSync(detailsPath));
  ytdlBinary = (details.path) ? details.path : path.resolve(__dirname, '..', 'bin', details.exec);
}

// Check that youtube-dl file exists.
if (!fs.existsSync(ytdlBinary)) {
  console.log('ERROR: unable to locate youtube-dl details in ' + path.dirname(ytdlBinary));
  process.exit(1);
}

var isDebug = /^\[debug\] /;
var isWarning = /^WARNING: /;
var isYouTubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//;
var isNoSubsRegex = /WARNING: video doesn't have subtitles|no closed captions found/;
var videoNotAvailable = /This video is not available/;
var subsRegex = /--write-sub|--write-srt|--srt-lang|--all-subs/;

/**
 * Processes data
 *
 * @param {Object} data
 * @param {Object} options
 * @param {Object} stream
 */

function processData(data, options, stream) {

  'use strict';
  var item = (!data.length) ? data : data.shift();

  // fix for pause/resume downloads
  var headers = {
    'Host': url.parse(item.url).hostname
  };

  if (options && options.start > 0) {
    headers.Range = 'bytes=' + options.start + '-';
  }

  var req = request({
    url: item.url,
    headers: headers
  });

  req.on('response', function response(res) {

    var size = parseInt(res.headers['content-length'], 10);
    if (size) {
      item.size = size;
    }

    if (options && options.start > 0 && res.statusCode === 416) {
      // the file that is being resumed is complete.
      return stream.emit('complete', item);
    }

    if (res.statusCode !== 200 && res.statusCode !== 206) {
      return stream.emit('error', new Error('status code ' + res.statusCode));
    }

    stream.emit('info', item);

    stream.on('end', function end() {
      if (data.length) { stream.emit('next', data); }
    });

  });

  stream.resolve(req);
}

/**
 * Downloads a video.
 *
 * @param {String} videoUrl
 * @param {!Array.<String>} args
 * @param {!Object} options
 */
var ytdl = module.exports = function(videoUrl, args, options) {

  'use strict';
  var stream = streamify({
    superCtor: http.ClientResponse,
    readable: true,
    writable: false
  });

  if (typeof videoUrl !== 'string') {
    processData(videoUrl, options, stream);
    return stream;
  }

  ytdl.getInfo(videoUrl, args, options, function getInfo(err, data) {
    if (err) { return stream.emit('error', err); }
    processData(data, options, stream);
  });

  return stream;
};

/**
 * Calls youtube-dl with some arguments and the `callback`
 * gets called with the output.
 *
 * @param {String|Array.<String>}
 * @param {Array.<String>} args
 * @param {Array.<String>} args2
 * @param {Object} options
 * @param {Function(!Error, String)} callback
 */
function call(urls, args1, args2, options, callback) {
  'use strict';
  var args = args1;
  var passOver = false;
  if (args2) {
    args = args.concat(util.parseOpts(args2));
  }
  options = options || {};

  if (urls !== null) {
    if (typeof urls === 'string') {
      urls = [urls];
    }

    for (var i = 0; i < urls.length; i++) {
      var video = urls[i];
      if (isYouTubeRegex.test(video)) {
        // Get possible IDs.
        var details = url.parse(video, true);
        var id = details.query.v || '';
        if (id) {
          args.push('http://www.youtube.com/watch?v=' + id);
        } else {
          // Get possible IDs for youtu.be from urladdr.
          id = details.pathname.slice(1).replace(/^v\//, '');
          if (id) {
            if ((id === 'playlist') && !options.maxBuffer) { options.maxBuffer = 7000 * 1024; }
            args.push(video);
            args.unshift('-i');
          }
        }
      } else {
        args.push(video);
      }
    }
  }

  // Call youtube-dl.
  execFile(ytdlBinary, args, options, function done(err, stdout, stderr) {
    if (err) {
      if (videoNotAvailable.test(err.message)) { passOver = true; }
      if (!passOver) { return callback(err); }
    }

    if (stderr && !passOver) {
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

      if (isDebug.test(stderr) && args.indexOf('--verbose') > -1) {
        console.log('\n' + stderr);
      } else if (isWarning.test(stderr)) {
        console.warn(stderr);
      } else {
        return callback(new Error(stderr.slice(7)));
      }

    }

    var data = stdout.trim().split(/\r?\n/);

    callback(null, data);
  });

}

/**
 * Calls youtube-dl with some arguments and the `callback`
 * gets called with the output.
 *
 * @param {String} url
 * @param {Array.<String>} args
 * @param {Object} options
 * @param {Function(!Error, String)} callback
 */
ytdl.exec = function exec(url, args, options, callback) {
  'use strict';
  return call(url, [], args, options, callback);
};


/**
 * @param {Object} data
 * @returns {Object}
 */
function parseInfo(data) {
  'use strict';
  var info = JSON.parse(data);

  // Add and process some entries to keep backwards compatibility
  Object.defineProperty(info, 'filename', {
    get: function get() {
      console.warn('`info.filename` is deprecated, use `info._filename`');
      return info._filename;
    }
  });
  Object.defineProperty(info, 'itag', {
    get: function get() {
      console.warn('`info.itag` is deprecated, use `info.format_id`');
      return info.format_id;
    }
  });
  Object.defineProperty(info, 'resolution', {
    get: function get() {
      console.warn('`info.resolution` is deprecated, use `info.format`');
      return info.format.split(' - ')[1];
    }
  });
  info.duration = util.formatDuration(info.duration);
  return info;
}


/**
 * Gets info from a video.
 *
 * @param {String} url
 * @param {Array.<String>} args
 * @param {Object} options
 * @param {Function(!Error, Object)} callback
 */
ytdl.getInfo = function getInfo(url, args, options, callback) {
  'use strict';
  if (typeof options === 'function') {
    callback = options;
    options = {};
  } else if (typeof args === 'function') {
    callback = args;
    options = {};
    args = [];
  }
  var defaultArgs = ['--dump-json'];
  if (!args || args.indexOf('-f') < 0 && args.indexOf('--format') < 0 &&
      args.every(function(a) {
        return a.indexOf('--format=') !== 0;
      })) {
    defaultArgs.push('-f');
    defaultArgs.push('best');
  }

  call(url, defaultArgs, args, options, function done(err, data) {
    if (err) { return callback(err); }
    var info;
    try {
      info = data.map(parseInfo);
    } catch (err) {
      return callback(err);
    }

    callback(null, info.length === 1 ? info[0] : info);
  });
};


/**
 * @param {String} url
 * @param {!Array.<String>} args
 * @param {Function(!Error, Object)} callback
 */
ytdl.getFormats = function getFormats(url, args, callback) {
  'use strict';
  console.warn('`getFormats()` is deprecated. Please use `getInfo()`');

  if (typeof args === 'function') {
    callback = args;
    args = [];
  }

  ytdl.getInfo(url, args, {}, function done(err, video_info) {
    if (err) { return callback(err); }

    var formats_info = video_info.formats || [video_info];
    var formats = formats_info.map(function mapIt(format) {
        return {
          id: video_info.id,
          itag: format.format_id,
          filetype: format.ext,
          resolution: format.format.split(' - ')[1].split(' (')[0],
        };
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
ytdl.getSubs = function getSubs(url, options, callback) {
  'use strict';
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  var args = ['--skip-download'];
  args.push('--write' + (options.auto ? '-auto' : '') + '-sub');
  if (options.all) {
    args.push('--all-subs');
  }
  if (options.lang) {
    args.push('--sub-lang=' + options.lang);
  }
  if (!options.warrning) {
    args.push('--no-warnings');
  }

  call(url, args, [], { cwd: options.cwd }, function(err, data) {
    if (err) { return callback(err); }

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

/**
 * @param {!Boolean} descriptions
 * @param {!Object} options
 * @param {Function(!Error, Object)} callback
 */
ytdl.getExtractors = function getExtractors(descriptions, options, callback) {
  'use strict';
  if (typeof options === 'function') {
    callback = options;
    options = {};
  } else if (typeof descriptions === 'function') {
    callback = descriptions;
    options = {};
    descriptions = false;
  }

  var args = descriptions ?
    ['--extractor-descriptions'] : ['--list-extractors'];
  call(null, args, null, options, callback);
};
