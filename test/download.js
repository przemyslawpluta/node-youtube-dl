var vows   = require('vows');
var ytdl   = require('..');
var fs     = require('fs');
var path   = require('path');
var assert = require('assert');
var video1 = 'http://www.youtube.com/watch?v=90AiXO1pAiA';
var video2 = 'https://www.youtube.com/watch?v=179MiZSibco';
var video3 = 'https://www.youtube.com/watch?v=AW8OOp2undg';
var subtitleFile = '1 1 1-179MiZSibco.en.vtt';

vows.describe('download').addBatch({
  'a video with format specified': {
    'topic': function() {
      'use strict';
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

        var filepath = path.join(__dirname, info._filename);
        dl.pipe(fs.createWriteStream(filepath));
      });
    },

    'data returned': function(err, progress, data) {
      'use strict';
      if (err) { throw err; }

      assert.equal(progress, 1);
      assert.isObject(data);
      assert.equal(data.id, '90AiXO1pAiA');
      assert.isTrue(/lol-90AiXO1pAiA/.test(data._filename));
      assert.equal(data.size, 755360);
    },

    'file was downloaded': function(err, progress, data) {
      'use strict';
      if (err) { throw err; }

      // Check existance.
      var filepath = path.join(__dirname, data._filename);
      var exists = fs.existsSync(filepath);
      if (exists) {
        // Delete file after each test.
        fs.unlinkSync(filepath);
      } else {
        assert.isTrue(exists);
      }
    }
  },
  'a video with no format specified': {
    'topic': function() {
      'use strict';
      var dl = ytdl(video3);
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

        var filepath = path.join(__dirname, info._filename);
        dl.pipe(fs.createWriteStream(filepath));
      });
    },

    'data returned': function(err, progress, data) {
      'use strict';
      if (err) { throw err; }

      assert.equal(progress, 1);
      assert.isObject(data);
      assert.equal(data.id, 'AW8OOp2undg');
      assert.equal(data.size, 33700);
    },

    'file was downloaded': function(err, progress, data) {
      'use strict';
      if (err) { throw err; }

      // Check existance.
      var filepath = path.join(__dirname, data._filename);
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
      'use strict';
      try {
        fs.unlinkSync(path.join(__dirname, subtitleFile));
      } catch (err) {}
      ytdl.getSubs(video2, { lang: 'en', cwd: __dirname }, this.callback);
    },

    'subtitles were downloaded': function(err, files) {
      'use strict';
      if (err) { throw err; }

      assert.equal(files[0], subtitleFile);
      assert.isTrue(fs.existsSync(path.join(__dirname, subtitleFile)));
      fs.unlinkSync(path.join(__dirname, subtitleFile));
    }
  }
}).export(module);
