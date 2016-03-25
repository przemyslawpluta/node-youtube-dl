var vows   = require('vows');
var ytdl   = require('..');
var fs     = require('fs');
var path   = require('path');
var assert = require('assert');
var video1 = 'https://www.youtube.com/playlist?list=PLEFA9E9D96CB7F807';

vows.describe('download playlist').addBatch({
  'from a youtube playlist': {
    'topic': function() {
      'use strict';

      var cb = this.callback;
      var details = [];
      var count = 0;

      function playlist(url) {
        var dl = ytdl(url);

        dl.on('error', cb);

        dl.on('info', function(info) {
          var pos = 0;
          var progress;

          dl.on('data', function(data) {
            pos += data.length;
            progress = pos / info.size;
          });

          dl.on('end', function() {
            details.push({progress: progress, data: info});
            count = count + 1;
            if (count === 2) { return cb(null, details); }
          });

          dl.on('next', playlist);

          var filepath = path.join(__dirname, info._filename);
          dl.pipe(fs.createWriteStream(filepath));
        });
      }

      playlist(video1);

    },
    'data returned': function(err, data) {
      'use strict';
      if (err) { throw err; }
      assert.equal(data.length, 2);
      assert.isArray(data);
      assert.isObject(data[0]);
      assert.isObject(data[1]);
    },
    'files downloaded': function(err, data) {
      'use strict';
      if (err) { throw err; }
      assert.equal(data[0].progress, 1);
      assert.equal(data[0].data._filename, 'Amy Castle - The Original Cuppycake Video-12Z6pWhM6TA.webm');
      assert.equal(data[1].progress, 1);
      assert.equal(data[1].data._filename, 'LA REGAÑADA DEL MILENIO.wmv-SITuxqDUjPI.mp4');

      function fileExists(data) {
        var filepath = path.join(__dirname, data._filename);
        var exists = fs.existsSync(filepath);

        if (exists) {
          // Delete file after each test.
          fs.unlinkSync(filepath);
        } else {
          assert.isTrue(exists);
        }
      }

      fileExists(data[0].data);
      fileExists(data[1].data);

    }
  }
}).export(module);
