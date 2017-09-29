var ytdl = require('..');
var url = 'http://www.youtube.com/watch?v=0RUvealeXZ0';

ytdl.getInfo(url, function(err, info) {

    'use strict';
    if (err) { throw err; }

    console.log('id:', info.id);
    console.log('title:', info.title);
    console.log('url:', info.url);
    console.log('thumbnail:', info.thumbnail);
    console.log('description:', info.description);
    console.log('filename:', info._filename);
    console.log('duration:', info.duration);
    console.log('raw duration:', info._duration_raw);
    console.log('duration hms:', info._duration_hms);
    console.log('format_id:', info.format_id);
});