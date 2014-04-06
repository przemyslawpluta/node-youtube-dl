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

var isYouTubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//;

// Check if win.
var isWin = /^win/.test(process.platform);

/**
 * Downloads a video.
 *
 * @param {String} url
 * @param {Array.<String>} args
 */
var ytdl = module.exports = function(url, args) {
  // Setup settings.
  if (args == null) {
    args = [];
  } else {
    args = util.parseOpts(args);
  }

  var stream = streamify({
    superCtor: http.ClientResponse,
    readable: true,
    writable: false
  });

  ytdl.getInfo(url, args, function(err, data) {
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

      item.size = parseInt(res.headers['content-length'], 10);
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
 * @param {Array.<String>} options
 * @param {Function(!Error, String)} callback
 */
function call(video, args, options, callback) {
  args = args.concat(util.parseOpts(options));

  // Parse url.
  var details = url.parse(video, true);
  var query = details.query;

  // Get possible IDs.
  var id = query.v || '';

  // Check for long and short youtube video url.
  if (!id && isYouTubeRegex.test(video)) {
    // Get possible IDs for youtu.be from urladdr.
    id = details.pathname.slice(1);
  }
  
  if (id === 'playlist') {
    args.push(video);
  } else {
    args.push('http://www.youtube.com/watch?v=' + id);
  }

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
ytdl.getInfo = function(url, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = [];
  }
  var args = [
    '--get-id',
    '--get-url',
    '--get-title',
    '--get-thumbnail',
    '--get-filename',
    '--get-format',
    '--get-description'
  ];

  call(url, args, options, function(err, data) {
    if (err) return callback(err);

    var playlist = [];

    var filterData = function filterData(data) {

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

    };

    var divideData = function divideData(data) {

      var arr = [];

      for (var i = 0; i < args.length; i++) {
        arr.push(data.shift());
      }

      playlist.push(filterData(arr));

      if (data.length) { divideData(data); }

    };

    if (data.length === args.length) { return callback(null, filterData(data)); }

    divideData(data);

    return callback(null, playlist);
    
  });
};


var formatsRegex = /^(\d+)\s+([a-z0-9]+)\s+(\d+x\d+|d+p|audio only)/;

/**
 * @param {String} url
 * @param {Array.<String>} options
 * @param {Function(!Error, Object)} callback
 */
ytdl.getFormats = function(url, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = [];
  }
  call(url, ['--list-formats'], options, function(err, data) {
    if (err) return callback(err);

    var formats = [], status = '';
    
    data.map(function(line) {
      var result = formatsRegex.exec(line);
      if (line.match(/\[info\]/)) { status = line.split(' ')[4].slice(0, -1); }
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
