var ytdl = require('..');

var url = 'http://www.youtube.com/watch?v=0RUvealeXZ0';

function mapInfo(item) {
  'use strict';
  return {
  	itag: item.format_id,
  	filetype: item.ext,
  	resolution: item.resolution || ((item.width) ? item.width + 'x' + item.height : 'audio only')
  };
}

ytdl.getInfo(url, function getInfo(err, info) {
  'use strict';
  if (err) { throw err; }
  var formats = {id: info.id, formats: info.formats.map(mapInfo)};
  console.log(formats);
});