var ytdl = require('..');

var playlist = [
    'http://www.youtube.com/watch?v=SvPZo52X5vo',
    'http://www.youtube.com/watch?v=2xJWQPdG7jE'
];

ytdl.getInfo(playlist, function info(err, info) {

    'use strict';
    if (err) { throw err; }

    console.dir(info);

});