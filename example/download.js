var path = require('path');
var fs   = require('fs');
var ytdl = require('..');

var video = ytdl('https://www.youtube.com/watch?v=AW8OOp2undg',
  // Optional arguments passed to youtube-dl.
  ['-f', '18']);

var size = 0;
video.on('info', function(info) {
  'use strict';
  size = info.size;

  console.log('Got video info');
  var file = path.join(__dirname, info._filename);
  video.pipe(fs.createWriteStream(file));

});

var pos = 0;
video.on('data', function data(chunk) {
  'use strict';
  pos += chunk.length;

  // `size` should not be 0 here.
  if (size) {
    var percent = (pos / size * 100).toFixed(2);
    process.stdout.cursorTo(0);
    process.stdout.clearLine(1);
    process.stdout.write(percent + '%');
  }
});

video.on('end', function end() {
  'use strict';
  console.log('\nDone');
});
