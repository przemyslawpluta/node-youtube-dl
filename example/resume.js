var ytdl = require('..');
var fs = require('fs');
var output = 'myvideo.mp4';

var downloaded = 0;
if (fs.existsSync(output)) { downloaded = fs.statSync(output).size; }

var video = ytdl('https://www.youtube.com/watch?v=179MiZSibco',

  // Optional arguments passed to youtube-dl.
  ['--format=18'],

  // start will be sent as a range header
  {start: downloaded, cwd: __dirname});

// Will be called when the download starts.
video.on('info', function(info) {

  'use strict';
  console.log('Download started');
  console.log('filename: ' + info._filename);

  // info.size will be the amount to download, add
  var total = info.size + downloaded;
  console.log('size: ' + total);

  if (downloaded > 0) {
    // size will be the amount already downloaded
    console.log('resuming from: ' + downloaded);

    // display the remaining bytes to download
    console.log('remaining bytes: ' + info.size);
  }
});

video.pipe(fs.createWriteStream('myvideo.mp4', {flags: 'a'}));

// Will be called if download was already completed and there is nothing more to download.
video.on('complete', function complete(info) {
  'use strict';
  console.log('filename: ' + info._filename + ' already downloaded.');
});

video.on('end', function end() {
  'use strict';
  console.log('finished downloading!');
});
