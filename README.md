# youtube-dl [![Build Status](https://secure.travis-ci.org/fent/node-youtube-dl.png)](http://travis-ci.org/fent/node-youtube-dl)

Download videos from youtube in node.js using [youtube-dl](http://rg3.github.com/youtube-dl/).

I also made a [pure Javascript youtube downloading module](https://github.com/fent/node-ytdl). The reason I'm maintaining this one is because it supports a lot more video sites besides youtube.

If you're only interested in downloading only from youtube, you should consider using the other module.

# Usage

## Downloading videos

```javascript
var fs = require('fs');
var youtubedl = require('youtube-dl');
var video = youtubedl('http://www.youtube.com/watch?v=90AiXO1pAiA',
  // Optional arguments passed to youtube-dl.
  ['--max-quality=18'],
  // Additional options can be given for calling `child_process.execFile()`.
  { cwd: __dirname });

// Will be called when the download starts.
video.on('info', function(info) {
  console.log('Download started');
  console.log('filename: ' + info.filename);
  console.log('size: ' + info.size);
});

video.pipe(fs.createWriteStream('myvideo.mp4'));
```


A similar example can be found in the *example* folder, and will produce an output that looks like the following when ran.

    Got video info
    saving to T-ara - Number Nine - MV - 티아라-Seku9G1kT0c.mp4
    100.00%

## Getting video information

```javascript
var youtubedl = require('youtube-dl');
var url = 'http://www.youtube.com/watch?v=WKsjaOqDXgg';
// Optional arguments passed to youtube-dl.
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
  if (err) throw err;

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

## Downloading subtitles

```js
var youtubedl = require('youtube-dl');
var url = 'https://youtu.be/PizwcirYuGY';

var options = {
  // Write automatic subtitle file (youtube only)
  auto: false,
  // Downloads all the available subtitles.
  all: false,
  // Languages of subtitles to download, separated by commas.
  lang: 'en',
  // The directory to save the downloaded files in.
  cwd: __dirname,
};
youtubedl.getSubs(url, options, function(err, files) {
  if (err) throw err;

  console.log('subtitle files downloaded:', files);
});

```

For more usage info on youtube-dl and the arguments you can pass to it, do `youtube-dl -h` or go to the [youtube-dl documentation][].


# Install

    npm install youtube-dl


# Tests

Tests are written with [vows](http://vowsjs.org/)

```bash
npm test
```


[youtube-dl]: http://rg3.github.com/youtube-dl/
[youtube-dl documentation]: http://rg3.github.com/youtube-dl/documentation.html


# License

MIT
