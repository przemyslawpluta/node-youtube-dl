(function() {
  var youtube;
  youtube = require('../lib/youtube-dl');
  youtube.info(process.argv[2], function(err, info) {
    if (err) {
      throw err;
    }
    console.log('title: ' + info.title);
    console.log('url: ' + info.url);
    console.log('thumbnail: ' + info.thumbnail);
    return console.log('description: ' + info.description);
  });
}).call(this);
