var vows       = require('vows');
var ytdl       = require('..');
var fs         = require('fs');
var path       = require('path');
var existsSync = require('fs').existsSync;
var assert     = require('assert');
var video      = 'http://www.youtube.com/watch?v=90AiXO1pAiA';


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
      assert.isString(progress.percent);
      assert.isString(progress.speed);
      assert.isString(progress.eta);

      assert.isObject(data);
      assert.equal(data.id, '90AiXO1pAiA');
      assert.equal(data.filename, 'lol-90AiXO1pAiA.flv');
      assert.equal(data.size, '1.26MiB');
      assert.isNumber(data.timeTakenms);
      assert.isString(data.timeTaken);
      assert.isNumber(data.averageSpeedBytes);
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
