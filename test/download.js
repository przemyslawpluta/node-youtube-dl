var vows   = require('vows')
  , ytdl   = require('..')
  , fs     = require('fs')
  , path   = require('path')
  , assert = require('assert')
  , video  = 'http://www.youtube.com/watch?v=90AiXO1pAiA'


vows.describe('download').addBatch({
  'a video': {
    'topic': function() {
        var dl = ytdl.download(video, __dirname),
            cb = this.callback;

        dl.on('error', cb);
        dl.on('end', function(data) {
          cb(null, data);
        });
      },

    'data returned': function(err, data) {
      assert.include(data, 'filename');
      assert.isString(data.filename);
      assert.include(data, 'size');
      assert.isString(data.size);
      assert.include(data, 'timeTakenms');
      assert.isNumber(data.timeTakenms);
      assert.include(data, 'timeTaken');
      assert.isString(data.timeTaken);
      assert.include(data, 'averageSpeedBytes');
      assert.isNumber(data.averageSpeedBytes);
      assert.include(data, 'averageSpeed');
      assert.isString(data.averageSpeed);
    },

    'file was downloaded': function(err, data) {
      // check existance
      var filepath = path.join(__dirname, data.filename);
      assert.isTrue(path.existsSync(filepath));

      // delete file after each test
      fs.unlinkSync(filepath);
    }
  }
}).export(module);
