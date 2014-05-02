var vows   = require('vows');
var ytdl   = require('..');
var fs     = require('fs');
var path   = require('path');
var assert = require('assert');
var video1  = 'http://www.youtube.com/watch?v=90AiXO1pAiA';
var video2 = 'https://www.youtube.com/watch?v=179MiZSibco';


vows.describe('download').addBatch({
  'a video': {
    'topic': function() {
      var dl = ytdl(video1, ['-f', '18']);
      var cb = this.callback;

      dl.on('error', cb);

      dl.on('info', function(info) {
        var pos = 0;
        var progress;

        dl.on('data', function(data) {
          pos += data.length;
          progress = pos / info.size;
        });

        dl.on('end', function() {
          cb(null, progress, info);
        });

        var filepath = path.join(__dirname, info.filename);
        dl.pipe(fs.createWriteStream(filepath));
      });
    },

    'data returned': function(err, progress, data) {
      if (err) throw err;

      assert.equal(progress, 1);
      assert.isObject(data);
      assert.equal(data.id, '90AiXO1pAiA');
      assert.isTrue(/lol-90AiXO1pAiA/.test(data.filename));
      assert.equal(data.size, 756000);
    },

    'file was downloaded': function(err, progress, data) {
      if (err) throw err;

      // Check existance.
      var filepath = path.join(__dirname, data.filename);
      var exists = fs.existsSync(filepath);
      if (exists) {
        // Delete file after each test.
        fs.unlinkSync(filepath);
      } else {
        assert.isTrue(exists);
      }
    }
  },
  'a video with subtitles': {
    topic: function() {
      var args = ['--max-quality=22', '--write-srt', '--srt-lang=en'];
      var dl = ytdl(video2, args, { cwd: __dirname });
      var cb = this.callback;
      dl.on('error', cb);
      dl.on('end', cb);
      dl.resume();
    },

    'subtitles were downloaded': function(err) {
      if (err) throw err;
      var filepath = path.join(__dirname, '1 1 1-179MiZSibco.en.srt');
      assert.isTrue(fs.existsSync(filepath));
    }
  }
}).export(module);
