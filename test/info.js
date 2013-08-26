var vows   = require('vows')
  , ytdl   = require('..')
  , assert = require('assert')
  , video  = 'http://www.youtube.com/watch?v=90AiXO1pAiA'
  ;


var expected = {
  title: 'lol',
  id: '90AiXO1pAiA',
  thumbnail: 'https://i1.ytimg.com/vi/90AiXO1pAiA/hqdefault.jpg',
  description: 'Ridley High School\'s real American Bad ASS,A true Delco Savage. Filmed in 2003 before Youtube was invented. This is also the original I find it hilarious that there are copycat videos!',
  filename: 'lol-90AiXO1pAiA.mp4',
  itag: '18',
  resolution: '360x640'
};

vows.describe('info').addBatch({
  'from a video': {
    'topic': function() {
      ytdl.info(video, this.callback, ['-f', '18/22/37/38']);
    },

    'info returned': function(err, info) {
      assert.isNull(err);
      assert.isObject(info);
      assert.equal(info.id, expected.id);
      assert.equal(info.title, expected.title);
      assert.isString(info.url);
      assert.isString(info.thumbnail);
      assert.equal(info.description, expected.description);
      assert.equal(info.filename, expected.filename);
      assert.equal(info.itag, expected.itag);
      assert.equal(info.resolution, expected.resolution);
    }
  }
}).export(module);
