var vows   = require('vows');
var ytdl   = require('..');
var assert = require('assert');
var video  = 'http://www.youtube.com/watch?v=0k2Zzkw_-0I';


var expected = [
  { id: '0k2Zzkw_-0I', itag: 171, filetype: 'webm', resolution: 'audio only' },
  { id: '0k2Zzkw_-0I', itag: 140, filetype: 'm4a', resolution: 'audio only' },
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
