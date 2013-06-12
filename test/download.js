var vows       = require('vows')
  , ytdl       = require('..')
  , fs         = require('fs')
  , path       = require('path')
  , existsSync = fs.existsSync || path.existsSync
  , assert     = require('assert')
  , video      = 'http://www.youtube.com/watch?v=90AiXO1pAiA'
  ;


vows.describe('download').addBatch({
  'a video': {
    'topic': function() {
        var dl = ytdl.download(video, __dirname),
            cb = this.callback;

        dl.on('error', cb);

        var progress;
        dl.on('progress', function(data) {
          progress = data;
        });

        dl.on('end', function(data) {
          cb(null, progress, data);
        });
      },

    'data returned': function(err, progress, data) {
      if (err) throw err;

      assert.isObject(progress);
      assert.include(progress, 'percent');
      assert.isString(progress.percent);
      assert.include(progress, 'speed');
      assert.isString(progress.speed);
      assert.include(progress, 'eta');
      assert.isString(progress.eta);

      assert.isObject(data);
      assert.include(data, 'filename');
      assert.equal(data.filename, 'lol-90AiXO1pAiA.flv');
      assert.include(data, 'size');
      assert.equal(data.size, '1.26MiB');
      assert.include(data, 'timeTakenms');
      assert.isNumber(data.timeTakenms);
      assert.include(data, 'timeTaken');
      assert.isString(data.timeTaken);
      assert.include(data, 'averageSpeedBytes');
      assert.isNumber(data.averageSpeedBytes);
      assert.include(data, 'averageSpeed');
      assert.isString(data.averageSpeed);
    },

    'file was downloaded': function(err, progress, data) {
      if (err) throw err;

      process.nextTick(function() {
        // Delete file after each test.
        fs.unlink(filepath);
      });

      // Check existance.
      var filepath = path.join(__dirname, data.filename);
      assert.isTrue(existsSync(filepath));
    }
  }
}).export(module);
