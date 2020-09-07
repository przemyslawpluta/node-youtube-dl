# youtube-dl

[![Build Status](https://travis-ci.org/przemyslawpluta/node-youtube-dl.svg?branch=master)](https://travis-ci.org/przemyslawpluta/node-youtube-dl) [![npm version](https://badge.fury.io/js/youtube-dl.svg)](https://badge.fury.io/js/youtube-dl)

Download videos from youtube in node.js using [youtube-dl](http://rg3.github.com/youtube-dl/).

If you're only interested in downloading only from youtube, you should consider using [pure Javascript youtube downloading module](https://github.com/fent/node-ytdl).

## Installation

With [npm](https://www.npmjs.com/) do:

``` sh
npm install youtube-dl
```

## Usage

### Downloading videos

``` js
const fs = require('fs')
const youtubedl = require('youtube-dl')

const video = youtubedl('http://www.youtube.com/watch?v=90AiXO1pAiA',
  // Optional arguments passed to youtube-dl.
  ['--format=18'],
  // Additional options can be given for calling `child_process.execFile()`.
  { cwd: __dirname })

// Will be called when the download starts.
video.on('info', function(info) {
  console.log('Download started')
  console.log('filename: ' + info._filename)
  console.log('size: ' + info.size)
})

video.pipe(fs.createWriteStream('myvideo.mp4'))
```

It will produce an output that looks like the following when ran.

```bash
Got video info
saving to T-ara - Number Nine - MV - 티아라-Seku9G1kT0c.mp4
100.00%
```

### Resuming partially downloaded videos

``` js
const youtubedl = require('youtube-dl')
const fs = require('fs')
const output = 'myvideo.mp4'

let downloaded = 0

if (fs.existsSync(output)) {
  downloaded = fs.statSync(output).size
}

const video = youtubedl('https://www.youtube.com/watch?v=179MiZSibco',

  // Optional arguments passed to youtube-dl.
  ['--format=18'],

  // start will be sent as a range header
  { start: downloaded, cwd: __dirname })

// Will be called when the download starts.
video.on('info', function(info) {
  console.log('Download started')
  console.log('filename: ' + info._filename)

  // info.size will be the amount to download, add
  let total = info.size + downloaded
  console.log('size: ' + total)

  if (downloaded > 0) {
    // size will be the amount already downloaded
    console.log('resuming from: ' + downloaded)

    // display the remaining bytes to download
    console.log('remaining bytes: ' + info.size)
  }
})

video.pipe(fs.createWriteStream(output, { flags: 'a' }))

// Will be called if download was already completed and there is nothing more to download.
video.on('complete', function complete(info) {
  'use strict'
  console.log('filename: ' + info._filename + ' already downloaded.')
})

video.on('end', function() {
  console.log('finished downloading!')
})
```

It will produce an output that looks like the following when ran.

**Output:**

``` sh
[~/nodejs/node-youtube-dl/example]$ node resume.js
Download started
filename: 1 1 1-179MiZSibco.mp4
size: 5109213
^C
```

``` sh
[~/nodejs/node-youtube-dl/example]$ node resume.js
Download started
filename: 1 1 1-179MiZSibco.mp4
size: 5109213
resuming from: 917504
remaining bytes: 4191709
finished downloading
```

### Getting video information

``` js
const youtubedl = require('youtube-dl')

const url = 'http://www.youtube.com/watch?v=WKsjaOqDXgg'
// Optional arguments passed to youtube-dl.
const options = ['--username=user', '--password=hunter2']

youtubedl.getInfo(url, options, function(err, info) {
  if (err) throw err

  console.log('id:', info.id)
  console.log('title:', info.title)
  console.log('url:', info.url)
  console.log('thumbnail:', info.thumbnail)
  console.log('description:', info.description)
  console.log('filename:', info._filename)
  console.log('format id:', info.format_id)
})
```

Running that will produce something like

``` sh
id: WKsjaOqDXgg
title: Ace Rimmer to the Rescue
url: http://r5---sn-p5qlsn7e.c.youtube.com/videoplayback?ms=au&ip=160.79.125.18&cp=U0hWTFVQVl9FTENONl9NSlpDOjgtU1VsODlkVmRH&id=58ab2368ea835e08&source=youtube&expire=1377558202&factor=1.25&key=yt1&ipbits=8&mt=1377534150&itag=34&sver=3&upn=-rGWz2vYpN4&fexp=912306%2C927900%2C919395%2C926518%2C936203%2C913819%2C929117%2C929121%2C929906%2C929907%2C929922%2C929127%2C929129%2C929131%2C929930%2C925726%2C925720%2C925722%2C925718%2C929917%2C906945%2C929919%2C929933%2C912521%2C932306%2C913428%2C904830%2C919373%2C930803%2C908536%2C904122%2C938701%2C936308%2C909549%2C900816%2C912711%2C904494%2C904497%2C900375%2C906001&sparams=algorithm%2Cburst%2Ccp%2Cfactor%2Cid%2Cip%2Cipbits%2Citag%2Csource%2Cupn%2Cexpire&mv=m&burst=40&algorithm=throttle-factor&signature=ABD3A847684AD9B39331E567568D3FA0DCFA4776.7895521E130A042FB3625A17242CE3C02A4460B7&ratebypass=yes
thumbnail: https://i1.ytimg.com/vi/WKsjaOqDXgg/hqdefault.jpg
description: An old Red Dwarf eposide where Ace Rimmer saves the Princess Bonjella.
filename: Ace Rimmer to the Rescue-WKsjaOqDXgg.flv
format id: 34
```

You can use an array of urls to produce an array of response objects with matching array index (e.g. the 1st response object will match the first url etc...)

``` js
const youtubedl = require('youtube-dl')

const url1 = 'http://www.youtube.com/watch?v=WKsjaOqDXgg'
const url2 = 'https://vimeo.com/6586873'

youtubedl.getInfo([url1, url2], function(err, info) {
  if (err) throw err

  console.log('title for the url1:', info[0].title)
  console.log('title for the url2:', info[1].title)
})
```

### Using a proxy

``` js
const youtubedl = require('youtube-dl')

const video = youtubedl('http://www.youtube.com/watch?v=90AiXO1pAiA',
  // Optional arguments passed to youtube-dl.
  ['--proxy', 'http://ip:port'],
```

### Downloading subtitles

``` js
const youtubedl = require('youtube-dl')
const url = 'https://youtu.be/PizwcirYuGY'

const options = {
  // Write automatic subtitle file (youtube only)
  auto: false,
  // Downloads all the available subtitles.
  all: false,
  // Subtitle format. YouTube generated subtitles
  // are available ttml or vtt.
  format: 'ttml',
  // Languages of subtitles to download, separated by commas.
  lang: 'en',
  // The directory to save the downloaded files in.
  cwd: __dirname,
}

youtubedl.getSubs(url, options, function(err, files) {
  if (err) throw err

  console.log('subtitle files downloaded:', files)
})
```

### Downloading thumbnails

``` js
const youtubedl = require('youtube-dl')
const url = 'https://youtu.be/PizwcirYuGY'

const options = {
  // Downloads available thumbnail.
  all: false,
  // The directory to save the downloaded files in.
  cwd: __dirname,
}

youtubedl.getThumbs(url, options, function(err, files) {
  if (err) throw err

  console.log('thumbnail file downloaded:', files)
})
```

For more usage info on youtube-dl and the arguments you can pass to it, do `youtube-dl -h` or go to the [youtube-dl documentation][].

### Downloading playlists

``` js

const path = require('path')
const fs   = require('fs')
const youtubedl = require('youtube-dl')

function playlist(url) {

  'use strict'
  const video = youtubedl(url)

  video.on('error', function error(err) {
    console.log('error 2:', err)
  })

  let size = 0
  video.on('info', function(info) {
    size = info.size
    let output = path.join(__dirname + '/', size + '.mp4')
    video.pipe(fs.createWriteStream(output))
  })

  let pos = 0
  video.on('data', function data(chunk) {
    pos += chunk.length
    // `size` should not be 0 here.
    if (size) {
      let percent = (pos / size * 100).toFixed(2)
      process.stdout.cursorTo(0)
      process.stdout.clearLine(1)
      process.stdout.write(percent + '%')
    }
  })

  video.on('next', playlist)
}

playlist('https://www.youtube.com/playlist?list=PLEFA9E9D96CB7F807')

```

Note node-youtube-dl does not currently support playlist urls with the "list" format:
```
https://www.youtube.com/watch?v=<video-id>&list=<playlist id>
```
Please use instead the equivalent "playlist" format as the example below:
```
https://www.youtube.com/playlist?list=<playlist id>
```
The following snippet could be of use when making this format conversion.
```
function toSupportedFormat(url) {
    if (url.includes("list=")) {
        var playlistId = url.substring(url.indexOf('list=') + 5);
        return "https://www.youtube.com/playlist?list=" + playlistId;
    }
    return url;
}

var url = "https://www.youtube.com/watch?v=shF8Sv-OswM&list=PLzIUZKHPb1HbqsPMIFdE0My54iektZrNU"
url = toSupportedFormat(url);
console.log(url) // "https://www.youtube.com/playlist?list=PLzIUZKHPb1HbqsPMIFdE0My54iektZrNU"
```

### Getting the list of extractors

``` js
const youtubedl = require('youtube-dl')

youtubedl.getExtractors(true, function(err, list) {
  console.log('Found ' + list.length + ' extractors')

  for (let i = 0 i < list.length i++) {
    console.log(list[i])
  }
})
```

Will print something like

``` sh
Found 521 extractors
1up.com
220.ro
24video
3sat
```

### Getting the binary path

``` js
const youtubedl = require('youtube-dl')

console.log(youtubedl.getYtdlBinary())
```

### Changing the binary path

```js
const path = require('path')
const youtubedl = require('youtube-dl')

const customBinaryPath = path.resolve('custom/path/to-binary')

youtubedl.setYtdlBinary(customBinaryPath)
```

### Call the `youtube-dl` binary directly

This module doesn't have `youtube-dl` download the video. Instead, it uses the `url` key from the `--dump-json` CLI option to create a node stream. That way, it can be used like any other node stream.

If that, or none of the above support your use case, you can use `youtubedl.exec()` to call `youtube-dl` however you like.

``` js
const youtubedl = require('youtube-dl')

youtubedl.exec(url, ['-x', '--audio-format', 'mp3'], {}, function(err, output) {
  if (err) throw err

  console.log(output.join('\n'))
})
```

### Update

Since the youtube-dl binary is updated regularly, you can run `npm run update` to check for and download any updates for it. You can also require `youtube-dl/lib/downloader` in your app if you'd like to place `youtube-dl` binary in a specific directory and control when it gets updates.

``` js
const downloader = require('youtube-dl/lib/downloader')

downloader('path/to-binary', function error(err, done) {
  'use strict'
  if (err) throw err

  console.log(done)
})
```

This script parses a couple of flags from `argv`:

* `--platform=windows` forces downloading the Windows version of youtube-dl.
* `--overwrite` overwrites the existing youtube-dl executable if it exists.


### Update (promise version)

If you are using promises there's now a promise version, if you don't pass a function as second argument:

``` js
const downloader = require('youtube-dl/lib/downloader')

downloader('path/to-binary')
.then((message) => {
    console.log(message);
}).catch((err) => {
    console.log("err", err);
    exit(1);
});

```


### Environment Variables

Youtube-dl looks for certain environment variables to aid its operations. If Youtube-dl doesn't find them in the environment during the installation step, a lowercased variant of these variables will be used from the [npm config](https://docs.npmjs.com/cli/config) or [yarn config](https://yarnpkg.com/lang/en/docs/cli/config/).

- **YOUTUBE\_DL\_DOWNLOAD\_HOST** - overwrite URL prefix that is used to download the binary file of Youtube-dl. Note: this includes protocol and might even include path prefix. Defaults to `https://yt-dl.org/downloads/latest/youtube-dl`.

### Tests

Tests are written with [vows](http://vowsjs.org/)

``` sh
npm test
```

## License

MIT

[youtube-dl]: http://rg3.github.com/youtube-dl/
[youtube-dl documentation]: http://rg3.github.com/youtube-dl/documentation.html
