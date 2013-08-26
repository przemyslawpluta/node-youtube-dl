var ytdl = require('..');


var dl = ytdl.download('http://www.youtube.com/watch?v=90AiXO1pAiA',
  __dirname,
  // Optional arguments passed to youtube-dl.
  ['--max-quality=18']);


// Will be called when the download starts.
dl.on('download', function(data) {
  console.log('Download started');
  console.log('filename: ' + data.filename);
  console.log('size: ' + data.size);
  console.log();
});

// Will be called during download progress of a video.
dl.on('progress', function(data) {
  process.stdout.write(data.eta + ' ' + data.percent + '% at ' + data.speed + '\r');
});

// Catches any errors.
dl.on('error', function(err) {
  throw err;
});

// Called when youtube-dl finishes.
dl.on('end', function(data) {
  console.log('\n\nDownload finished!');
  console.log('ID:', data.id);
  console.log('Filename:', data.filename);
  console.log('Size:', data.size);
  console.log('Time Taken:', data.timeTaken);
  console.log('Time Taken in ms:', + data.timeTakenms);
  console.log('Average Speed:', data.averageSpeed);
  console.log('Average Speed in Bytes:', data.averageSpeedBytes);
});
