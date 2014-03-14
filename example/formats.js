var ytdl = require('..');
var url = 'http://www.youtube.com/watch?v=c3wKWMp0NwY';

ytdl.getFormats(url, function(err, formats) {
  if (err) throw err;

  formats.forEach(function(format) {
    console.log(format);
  });
}
);
