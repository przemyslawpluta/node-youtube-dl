var ytdl = require('..');


var url = 'https://www.youtube.com/watch?v=H7HmzwI67ec';
ytdl.exec(url, ['-x', '--audio-format', 'mp3'], {}, function(err, output) {
  if (err) throw err;
  console.log(output.join('\n'));
});
