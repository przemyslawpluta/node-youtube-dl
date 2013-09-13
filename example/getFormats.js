var ytdl = require('..');
var url = 'http://www.youtube.com/watch?v=WKsjaOqDXgg';

ytdl.getFormats(url, function(err, formats) {
  if (err) throw err;

  formats.forEach(function(format) {
    console.log(format);
  });
}
);
