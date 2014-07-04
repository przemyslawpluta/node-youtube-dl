
// Arguments we dont want users to use with youtube-dl
// because they will break the module.
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
  , '--get-duration'
  , '--get-filename'
  , '--no-progress'
  , '--console-title'
  , '--print-traffic'
];

/**
 * Helps parse options used in youtube-dl command.
 *
 * @param {Array.<String>}
 * @return {Array.<String>}
 */
exports.parseOpts = function(args) {
  var pos;
  for (var i = 0, len = badArgs.length; i < len; i++) {
    if ((pos = args.indexOf(badArgs[i])) !== -1) {
      args.splice(pos, 1);
    }
  }
  return args;
};


/**
 * Rounds a number to n decimal places.
 *
 * @param {Number} num
 * @param {Number} n
 * @return {Number}
 */
exports.round = function(num, n) {
  var dec = Math.pow(10, n);
  return Math.round(num * dec + 0.1) / dec;
};


/**
 * Converts from bytes kb, mb, and gb to bytes.
 *
 * @param {String} s
 * @return {Number}
 */
exports.toBytes = function(s) {
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


/**
 * Converst bytes to human readable unit.
 * Thank you Amir from StackOverflow.
 *
 * @param {Number} bytes
 * @return {String}
 */
var units = ' KMGTPEZYXWVU';
exports.getHumanSize = function(bytes) {
  if (bytes <= 0) { return 0; }
  var t2 = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), 12);
  return (Math.round(bytes * 100 / Math.pow(1024, t2)) / 100) +
          units.charAt(t2).replace(' ', '') + 'B';
};


/**
 * Converts ms to human readable time.
 *
 * @param {Number} ms
 * @return {String}
 */
exports.getHumanTime = function(ms) {
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
