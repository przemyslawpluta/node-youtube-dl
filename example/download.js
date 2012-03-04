var ytdl = require('..');


dl = ytdl.download('http://www.youtube.com/watch?v=90AiXO1pAiA',
  __dirname,
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
