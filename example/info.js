youtube = require('youtube-dl');

youtube.info('http://www.youtube.com/watch?v=WKsjaOqDXgg',
  
  // called when video page is downloaded and info extracted
  function(err, info) {
    if (err)
      throw err;
    console.log('title: ' + info.title);
    console.log('url: ' + info.url);
    console.log('thumbnail: ' + info.thumbnail);
    console.log('description: ' + info.description);
  }
  
  // optional arguments passed to youtube-dl
  // ['--username=user', '--password=hunter2']
  );
