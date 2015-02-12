var vows   = require('vows');
var ytdl   = require('..');
var assert = require('assert');

var youtubevideo = 'http://www.youtube.com/watch?v=0k2Zzkw_-0I';
var mixcloudvideo =
  'http://www.mixcloud.com/' +
  'TheBloodyBeetroots/sbcr-dj-mix-october-2014/';

vows.describe('getFormats').addBatch({
  'from a video': {
    'topic': function() {
      ytdl.getFormats(youtubevideo, this.callback);
    },

    'formats returned': function(err, formats) {
      assert.isNull(err);
      assert.isArray(formats);
    }
  },

  'from a mixcloud mix': {
    'topic': function() {
      ytdl.getFormats(mixcloudvideo, this.callback);
    },

    'formats returned': function(err, formats) {
      assert.isNull(err);
      assert.isArray(formats);
    }
  }
}).export(module);
