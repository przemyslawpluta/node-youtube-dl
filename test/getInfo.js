var vows   = require('vows');
var ytdl   = require('..');
var assert = require('assert');


vows.describe('getInfo').addBatch({
  'from a youtube video': {
    'topic': function() {
      var video = 'http://www.youtube.com/watch?v=90AiXO1pAiA';
      ytdl.getInfo(video, ['-f', '18/22/37/38'], this.callback);
    },

    'info returned': function(err, info) {
      assert.isNull(err);
      assert.isObject(info);
      assert.equal(info.id, '90AiXO1pAiA');
      assert.equal(info.itag, '18');
      assert.equal(info.title, 'lol');
      assert.isString(info.url);
      assert.isString(info.thumbnail);
      assert.equal(info.description,
        'Ridley High School\'s real American Bad ASS,A true Delco Savage. ' +
        'Filmed in 2003 before Youtube was invented. ' +
        'This is also the original I find it hilarious that there ' +
        'are copycat videos!');
      assert.equal(info.filename, 'lol-90AiXO1pAiA.mp4');
      assert.equal(info.resolution, '640x360');
    }
  },
  'from a vimeo video': {
    'topic': function() {
      var video = 'https://vimeo.com/6586873';
      ytdl.getInfo(video, this.callback);
    },

    'info returned': function(err, info) {
      assert.isNull(err);
      assert.isObject(info);
      assert.equal(info.id, '6586873');
      assert.equal(info.title, 'OWEN - good friends, bad habits');
      assert.isString(info.url);
      assert.isString(info.thumbnail);
      assert.equal(info.description,
        'Video for the song "Good Friends, Bad Habits" from the album ' +
        'New Leaves. Directed by Joe Wigdahl. Purchase the album here: ' +
        'hobbledehoyrecords.com/store');
      assert.equal(info.filename,
        'OWEN - good friends, bad habits-6586873.mp4');
      assert.equal(info.resolution, '480x272');
    }
  }
}).export(module);
