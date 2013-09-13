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
  console.log('ID:', data.id);
  console.log('Filename:', data.filename);
  console.log('Size:', data.size);
  console.log('Time Taken:', data.timeTaken);
  console.log('Time Taken in ms:', + data.timeTakenms);
  console.log('Average Speed:', data.averageSpeed);
  console.log('Average Speed in Bytes:', data.averageSpeedBytes);
});
```


This example can be found in the *example* folder, and will produce an output that looks like the following when ran.

    Download started
    filename: lol-90AiXO1pAiA.mp4
    size: 918.57KiB

    00:00 100.0% at 2.00MiB/s

    Download finished!
    ID: 90AiXO1pAiA
    Filename: lol-90AiXO1pAiA.mp4
    Size: 918.57KiB
    Time Taken: 2 seconds, 178 ms
    Time Taken in ms: 2178
    Average Speed: 211.24B/s
    Average Speed in Bytes: 211.24

## Getting video information

```javascript
var youtubedl = require('youtube-dl');
var url = 'http://www.youtube.com/watch?v=WKsjaOqDXgg';
// optional arguments passed to youtube-dl
var options = ['--username=user', '--password=hunter2'];
youtubedl.getInfo(url, options, function(err, info) {
  if (err) throw err;

  console.log('id:', info.id);
  console.log('title:', info.title);
  console.log('url:', info.url);
  console.log('thumbnail:', info.thumbnail);
  console.log('description:', info.description);
  console.log('filename:', info.filename);
  console.log('itag:', info.itag);
  console.log('resolution:', info.resolution);
});
```

Running that will produce something like

    id: WKsjaOqDXgg
    title: Ace Rimmer to the Rescue
    url: http://r5---sn-p5qlsn7e.c.youtube.com/videoplayback?ms=au&ip=160.79.125.18&cp=U0hWTFVQVl9FTENONl9NSlpDOjgtU1VsODlkVmRH&id=58ab2368ea835e08&source=youtube&expire=1377558202&factor=1.25&key=yt1&ipbits=8&mt=1377534150&itag=34&sver=3&upn=-rGWz2vYpN4&fexp=912306%2C927900%2C919395%2C926518%2C936203%2C913819%2C929117%2C929121%2C929906%2C929907%2C929922%2C929127%2C929129%2C929131%2C929930%2C925726%2C925720%2C925722%2C925718%2C929917%2C906945%2C929919%2C929933%2C912521%2C932306%2C913428%2C904830%2C919373%2C930803%2C908536%2C904122%2C938701%2C936308%2C909549%2C900816%2C912711%2C904494%2C904497%2C900375%2C906001&sparams=algorithm%2Cburst%2Ccp%2Cfactor%2Cid%2Cip%2Cipbits%2Citag%2Csource%2Cupn%2Cexpire&mv=m&burst=40&algorithm=throttle-factor&signature=ABD3A847684AD9B39331E567568D3FA0DCFA4776.7895521E130A042FB3625A17242CE3C02A4460B7&ratebypass=yes
    thumbnail: https://i1.ytimg.com/vi/WKsjaOqDXgg/hqdefault.jpg
    description: An old Red Dwarf eposide where Ace Rimmer saves the Princess Bonjella.
    filename: Ace Rimmer to the Rescue-WKsjaOqDXgg.flv
    itag: 34
    resolution: 360x640

## Getting available formats

```js
var youtubedl = require('youtube-dl');
var url = 'http://www.youtube.com/watch?v=WKsjaOqDXgg';
youtubedl.getFormats(url, function(err, formats) {
  if (err) throw er;

  formats.forEach(function(format) {
    console.log(format);
  });
});
```

Will print something like

    { itag: 34, filetype: 'flv', resolution: '360x640' }
    { itag: 18, filetype: 'mp4', resolution: '360x640' }
    { itag: 43, filetype: 'webm', resolution: '360x640' }
    { itag: 5, filetype: 'flv', resolution: '240x400' }
    { itag: 17, filetype: 'mp4', resolution: '144x176' }

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
