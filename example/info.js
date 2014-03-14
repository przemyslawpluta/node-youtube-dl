var ytdl = require('..');
var url = 'http://www.youtube.com/watch?v=0RUvealeXZ0';

ytdl.getInfo(url, function(err, info) {
  if (err) throw err;

  console.log('id:', info.id);
  console.log('title:', info.title);
  console.log('url:', info.url);
  console.log('thumbnail:', info.thumbnail);
  console.log('description:', info.description);
  console.log('filename:', info.filename);
  console.log('itag:', info.itag);
  console.log('resolution:', info.resolution);
}
);
