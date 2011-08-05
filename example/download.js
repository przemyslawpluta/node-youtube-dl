youtubedl = require('./../lib/youtube-dl');


// will be called when a state changes
stateChange = function(state, data) {
  console.log(state);
  if (state == 'Downloading video') {
    console.log('Video size: ' + data.size);
  }
}

// will be called during download progress of a video
progress = function(data) {
  process.stdout.write(data.eta + ' ' + data.percent + '% at ' + data.speed + '\r');
}

// called when youtube-dl finishes
finished = function(err, data) {
  if (err)
    throw err;
  console.log('\nDownload finished!');
  console.log('Time Taken: ' + data.timeTaken);
  console.log('Average Speed: ' + data.averageSpeed);
},

youtubedl.download('http://www.youtube.com/watch?v=90AiXO1pAiA', './',
  stateChange, progress, finished,

  // optional arguments passed to youtube-dl
  ['--max-quality=18']);
