var vows   = require('vows');
var ytdl   = require('..');
var assert = require('assert');
var video  = 'http://www.youtube.com/watch?v=90AiXO1pAiA';


var expected = {
  title: 'lol',
  id: '90AiXO1pAiA',
  thumbnail: 'https://i1.ytimg.com/vi/90AiXO1pAiA/hqdefault.jpg',
  description: 'Ridley High School\'s real American Bad ASS,A true Delco Savage. Filmed in 2003 before Youtube was invented. This is also the original I find it hilarious that there are copycat videos!',
  filename: 'lol-90AiXO1pAiA.mp4',
  itag: '18',
  resolution: '640x360'
};

vows.describe('getInfo').addBatch({
  'from a video': {
    'topic': function() {
      ytdl.getInfo(video, ['-f', '18/22/37/38'], this.callback);
    },

    'info returned': function(err, info) {
      assert.isNull(err);
      assert.isObject(info);
      assert.equal(info.id, expected.id);
      assert.equal(info.itag, expected.itag);
      assert.equal(info.title, expected.title);
      assert.isString(info.url);
      assert.isString(info.thumbnail);
      assert.equal(info.description, expected.description);
      assert.equal(info.filename, expected.filename);
      assert.equal(info.resolution, expected.resolution);
    }
  }
}).export(module);
