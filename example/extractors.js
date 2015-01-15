var ytdl = require('..');

ytdl.getExtractors(true, function(err, list) {
  console.log('Found ' + list.length + ' extractors');
  var show = 4;
  for (var  i = 0; i < Math.min(show, list.length); i++) {
    console.log(list[i]);
  }
  if (list.length > show) {
    console.log('...' + (list.length-show) + ' not shown')
  }
});