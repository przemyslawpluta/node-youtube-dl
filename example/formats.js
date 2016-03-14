var ytdl = require('..');

var url = 'http://www.youtube.com/watch?v=0RUvealeXZ0';

function mapInfo(item) {
  'use strict';
  return {itag: item.format_id, filetype: item.ext, resolution: item.resolution || 'audio only'};
}

ytdl.getInfo(url, function getFormats(err, info) {
  'use strict';
  if (err) { throw err; }
  var formats = {id: info.id, formats: info.formats.map(mapInfo)};
  console.log(formats);
});