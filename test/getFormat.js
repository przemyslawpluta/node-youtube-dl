var vows   = require('vows');
var ytdl   = require('..');
var assert = require('assert');
var video = 'http://www.youtube.com/watch?v=WKsjaOqDXgg';


var expected = [
  { itag: 34, filetype: 'flv', resolution: '360x640' },
  { itag: 18, filetype: 'mp4', resolution: '360x640' },
  { itag: 43, filetype: 'webm', resolution: '360x640' },
  { itag: 5, filetype: 'flv', resolution: '240x400' },
  { itag: 36, filetype: '3gp', resolution: '240x320' },
  { itag: 17, filetype: '3gp', resolution: '144x176' }
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
