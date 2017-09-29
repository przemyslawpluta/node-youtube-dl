var ytdl = require('..');
var url = 'https://www.youtube.com/watch?v=yy7EUIR0fic';

ytdl.getThumbs(url, { cwd: __dirname }, function thumbs(err, files) {
    'use strict';
    if (err) { throw err; }
    console.dir(files);
});