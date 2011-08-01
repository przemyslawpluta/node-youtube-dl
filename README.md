A [youtube-dl][] driver for node.

Usage
------------------

    youtubedl = require('youtube-dl');

###Downloading videos

    youtubedl.download('http://www.youtube.com/watch?v=90AiXO1pAiA',
      './videos',

      // will be called when a state changes
      function(state, data) {
        console.log(state);
        if (state == 'Downloading video') {
          console.log('Video size: ' + data.size);
        }
      },

      // will be called during download progress of a video
      function(data) {
        console.log(data.eta + ' ' + data.percent + '% at ' + data.speed);
      },

      // called when youtube-dl finishes
      function(err) {
        if (err)
          throw err;
        console.log('Download finished!')
      },

      // optional arguments passed to youtube-dl
      ['--max-quality=18']);

This example can be found in the *example* folder, and will produce an output that looks like the following when ran.

    Setting language
    Downloading video webpage
    Downloading video info webpage
    Extracting video information
    Downloading video
    Video size: 918.31k
    --:-- 0.1% at ---b/s
    --:-- 0.3% at ---b/s
    00:12 0.8% at 75.62k/s
    00:06 1.6% at 135.69k/s
    00:03 3.4% at 223.15k/s
    00:04 6.9% at 171.27k/s
    00:05 13.8% at 135.40k/s
    00:03 26.1% at 194.62k/s
    00:03 50.5% at 140.90k/s
    00:02 62.8% at 169.02k/s
    00:00 87.3% at 210.18k/s
    00:00 100.0% at 181.41k/s
    Download finished!

###Getting video information

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

Running that will produce something like

    title: Ace Rimmer to the Rescue
    url: http://v2.lscache2.c.youtube.com/videoplayback?sparams=id%2Cexpire%2Cip%2Cipbits%2Citag%2Calgorithm%2Cburst%2Cfactor%2Coc%3AU0hPSFFQVF9FSkNOOV9JSlhJ&fexp=904410%2C907048%2C910100&algorithm=throttle-factor&itag=34&ipbits=0&burst=40&sver=3&signature=4093330AC1A5B0CAF8709A0416A4B593A75BB892.21F2F12C418003492D9877E1570DC7AEE6DBEEBA&expire=1303156800&key=yt1&ip=0.0.0.0&factor=1.25&id=58ab2368ea835e08
    thumbnail: http://i4.ytimg.com/vi/WKsjaOqDXgg/default.jpg
    description: An old Red Dwarf eposide where Ace Rimmer saves the Princess Bonjella.

For more usage info on youtube-dl and the arguments you can pass to it, do `youtube-dl -h` or go to the [youtube-dl documentation][].


Installation
------------
Using npm:

    $ npm install youtube-dl

This will install this node module along with the latest version of [youtube-dl][] into your module folder. It will also create a symlink to youtube-dl so you run it from the command line.

Issues and the Future
---------------------

I haven't tested this with playlists yet because I haven't needed to use them. But my guess is they probably work with the download function but not the info function.


[youtube-dl]: http://rg3.github.com/youtube-dl/
[youtube-dl documentation]: http://rg3.github.com/youtube-dl/documentation.html
