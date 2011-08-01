(function() {
  var youtube;
  youtube = require('../lib/youtube-dl');
  youtube.download(process.argv[2], './', (function(state, data) {
    console.log('state: ' + state);
    if (data) {
      return console.log('data: ' + data);
    }
  }), (function(data) {
    return console.log("Downloading: " + data.percent + "%, " + data.speed + ", " + data.eta);
  }), (function(err) {
    if (err) {
      return console.log('error: ' + err);
    }
  }));
}).call(this);
