youtubedl = require('youtube-dl');

// will be called when a state changes
stateChange = function(state, data) {
  console.log(state);
  if (state == 'Downloading video') {
    console.log('Video size: ' + data.size);
  }
}

// will be called during download progress of a video
progress = function(data) {
  console.log(data.eta + ' ' + data.percent + '% at ' + data.speed);
}

// called when youtube-dl finishes
finished = function(err) {
  if (err)
    throw err;
  console.log('Download finished!')
},

youtubedl.download('http://www.youtube.com/watch?v=90AiXO1pAiA', './',
  stateChange, progress, finished,

  // optional arguments passed to youtube-dl
  ['--max-quality=18']);
