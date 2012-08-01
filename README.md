# youtube-dl [![Build Status](https://secure.travis-ci.org/fent/node-youtube-dl.png)](http://travis-ci.org/fent/node-youtube-dl)

Download videos from youtube in node.js using [youtube-dl](http://rg3.github.com/youtube-dl/).

I also made a [pure Javascript youtube downloading module](https://github.com/fent/node-ytdl). The reason I'm maintaining this one is because it supports a lot more video sites besides youtube. But if you're only interested in downloading from youtube, you should consider using the better module. It's better in that it doesn't have to spawn a child process, so it uses less memory and it's faster. And you get direct access to the download stream, meaning you can pipe it or pause it or whatever with it.

# Usage

## Downloading videos

```javascript
var youtubedl = require('youtube-dl');
var dl = youtubedl.download('http://www.youtube.com/watch?v=90AiXO1pAiA',
  './videos',
  // optional arguments passed to youtube-dl
  ['--max-quality=18']);

// will be called when the download starts
dl.on('download', function(data) {
  console.log('Download started');
  console.log('filename: ' + data.filename);
  console.log('size: ' + data.size);
});

// will be called during download progress of a video
dl.on('progress', function(data) {
  process.stdout.write(data.eta + ' ' + data.percent + '% at ' + data.speed + '\r');
});

// catches any errors
dl.on('error', function(err) {
  throw err;
});

// called when youtube-dl finishes
dl.on('end', function(data) {
  console.log('\nDownload finished!');
  console.log('Filename: ' + data.filename);
  console.log('Size: ' + data.size);
  console.log('Time Taken: ' + data.timeTaken);
  console.log('Time Taken in ms: ' + data.timeTakenms);
  console.log('Average Speed: ' + data.averageSpeed);
  console.log('Average Speed in Bytes: ' + data.averageSpeedBytes);
});
```


This example can be found in the *example* folder, and will produce an output that looks like the following when ran.

    Download started
    Video size: 918.31k
    00:00 100.0% at 206.12k/s
    Download finished!
    Filename: 90AiXO1pAiA.mp4
    Size: 918.31k
    Time Taken: 7 seconds, 27 ms
    Time Taken in ms: 7027
    Average Speed: 333.74KB/s
    Average Speed in Bytes: 341750.78


## Getting video information

```javascript
var youtubedl = require('youtube-dl');
youtubedl.info('http://www.youtube.com/watch?v=WKsjaOqDXgg',
  
  // called when video page is downloaded and info extracted
  function(err, info) {
    if (err)
      throw err;
    console.log('title: ' + info.title);
    console.log('url: ' + info.url);
    console.log('thumbnail: ' + info.thumbnail);
    console.log('description: ' + info.description);
    console.log('filename: ' + info.filename);
  }
  
  // optional arguments passed to youtube-dl
  // ['--username=user', '--password=hunter2']
  );
```

Running that will produce something like

    title: Ace Rimmer to the Rescue
    url: http://v2.lscache2.c.youtube.com/videoplayback?sparams=id%2Cexpire%2Cip%2Cipbits%2Citag%2Calgorithm%2Cburst%2Cfactor%2Coc%3AU0hPSFFQVF9FSkNOOV9JSlhJ&fexp=904410%2C907048%2C910100&algorithm=throttle-factor&itag=34&ipbits=0&burst=40&sver=3&signature=4093330AC1A5B0CAF8709A0416A4B593A75BB892.21F2F12C418003492D9877E1570DC7AEE6DBEEBA&expire=1303156800&key=yt1&ip=0.0.0.0&factor=1.25&id=58ab2368ea835e08
    thumbnail: http://i4.ytimg.com/vi/WKsjaOqDXgg/default.jpg
    description: An old Red Dwarf eposide where Ace Rimmer saves the Princess Bonjella.
    filename: WKsjaOqDXgg.webm


For more usage info on youtube-dl and the arguments you can pass to it, do `youtube-dl -h` or go to the [youtube-dl documentation][].


# Install

    npm install youtube-dl

Use the -g option if you want npm to add a symlink to [youtube-dl][] so it can be used in command line.


# Tests

Tests are written with [vows](http://vowsjs.org/)

```bash
npm test
```


# Issues and the Future

I haven't tested this with playlists yet because I haven't needed to use them. But my guess is they probably work with the download function but not the info function.


[youtube-dl]: http://rg3.github.com/youtube-dl/
[youtube-dl documentation]: http://rg3.github.com/youtube-dl/documentation.html


# License

MIT
