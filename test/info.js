var vows   = require('vows')
  , ytdl   = require('..')
  , assert = require('assert')
  , video  = 'http://www.youtube.com/watch?v=90AiXO1pAiA'
  ;


vows.describe('info').addBatch({
  'from a video': {
    'topic': function() {
      ytdl.info(video, this.callback, ['-f', '18/22/37/38']);
    },

    'info returned': function(err, info) {
      assert.isNull(err);
      assert.isObject(info);
      assert.isString(info.id);
      assert.isString(info.title);
      assert.isString(info.url);
      assert.isString(info.thumbnail);
      assert.isString(info.description);
      assert.isString(info.filename);
      assert.isString(info.itag);
      assert.isString(info.resolution);
    }
  }
}).export(module);
