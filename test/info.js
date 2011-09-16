var vows = require('vows')
  ytdl   = require('./../lib/youtube-dl'),
  assert = require('assert'),
  video  = 'http://www.youtube.com/watch?v=90AiXO1pAiA';


vows.describe('info').addBatch({
  'from a video': {
    'topic': function() {
      ytdl.info(video, this.callback);
    },

    'info returned': function(err, info) {
      assert.include(info, 'title');
      assert.isString(info.title);
      assert.include(info, 'url');
      assert.isString(info.url);
      assert.include(info, 'thumbnail');
      assert.isString(info.thumbnail);
      assert.include(info, 'description');
      assert.isString(info.description);
      assert.include(info, 'filename');
      assert.isString(info.filename);
    }
  }
}).export(module);
