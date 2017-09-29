var ytdl = require('..');
var url = 'https://www.youtube.com/watch?v=fmIGnd98DX4';

ytdl.exec(url, ['-f', 'bestvideo[ext=mp4]+bestaudio[ext=m4a]'], {}, function exec(err, output) {
    'use strict';
    if (err) { throw err; }
    console.log(output.join('\n'));
});