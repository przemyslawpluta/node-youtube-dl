var vows   = require('vows');
var ytdl   = require('..');
var assert = require('assert');
var video  = 'http://www.youtube.com/watch?v=0k2Zzkw_-0I';


var expected = [
  { id: '0k2Zzkw_-0I', itag: 171, filetype: 'webm', resolution: 'audio only' },
  { id: '0k2Zzkw_-0I', itag: 140, filetype: 'm4a', resolution: 'audio only' },
  { id: '0k2Zzkw_-0I', itag: 160, filetype: 'mp4', resolution: '144p' },
  { id: '0k2Zzkw_-0I', itag: 242, filetype: 'webm', resolution: '240p' },
  { id: '0k2Zzkw_-0I', itag: 133, filetype: 'mp4', resolution: '240p' },
  { id: '0k2Zzkw_-0I', itag: 243, filetype: 'webm', resolution: '360p' },
  { id: '0k2Zzkw_-0I', itag: 134, filetype: 'mp4', resolution: '360p' },
  { id: '0k2Zzkw_-0I', itag: 244, filetype: 'webm', resolution: '480p' },
  { id: '0k2Zzkw_-0I', itag: 135, filetype: 'mp4', resolution: '480p' },
  { id: '0k2Zzkw_-0I', itag: 17, filetype: '3gp', resolution: '176x144' },
  { id: '0k2Zzkw_-0I', itag: 36, filetype: '3gp', resolution: '320x240' },
  { id: '0k2Zzkw_-0I', itag: 5, filetype: 'flv', resolution: '400x240' },
  { id: '0k2Zzkw_-0I', itag: 43, filetype: 'webm', resolution: '640x360' },
  { id: '0k2Zzkw_-0I', itag: 18, filetype: 'mp4', resolution: '640x360' }
];

vows.describe('getFormats').addBatch({
  'from a video': {
    'topic': function() {
      ytdl.getFormats(video, this.callback);
    },

    'formats returned': function(err, formats) {
      assert.isNull(err);
      assert.isArray(formats);
      assert.deepEqual(formats, expected);
    }
  }
}).export(module);
