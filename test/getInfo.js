var vows = require('vows')
var ytdl = require('..')
var assert = require('assert')

vows
  .describe('getInfo')
  .addBatch({
    'from a youtube video': {
      topic: function () {
        'use strict'
        var video = 'http://www.youtube.com/watch?v=90AiXO1pAiA'
        ytdl.getInfo(video, ['-f', '18/43/36'], this.callback)
      },

      'info returned': function (err, info) {
        'use strict'

        assert.isNull(err)
        assert.isObject(info)
        assert.equal(info.id, '90AiXO1pAiA')
        assert.equal(info.format_id, '18')
        assert.equal(info.title, 'lol')
        assert.isString(info.url)
        assert.isString(info.thumbnail)
        assert.equal(
          info.description,
          "Ridley High School's real American Bad ASS,A true Delco Savage. " +
            'Filmed in 2003 before Youtube was invented. ' +
            'This is also the original I find it hilarious that there are copycat videos!'
        )
        assert.equal(info._filename, 'lol-90AiXO1pAiA.mp4')
        assert.equal(info.format, '18 - 480x360 (medium)')
        assert.equal(info._duration_raw, 11)
        assert.equal(info._duration_hms, '00:00:11')
        assert.equal(info.duration, '11')
        assert.equal(info.width, 480)
        assert.equal(info.height, 360)
        assert.isArray(info.formats)
      }
    },
    'from a youtube playlist': {
      topic: function () {
        'use strict'
        var pl = 'https://www.youtube.com/playlist?list=PLEFA9E9D96CB7F807'
        ytdl.getInfo(pl, this.callback)
      },

      'info returned': function (err, info) {
        'use strict'
        assert.isNull(err)
        assert.isArray(info)
        assert.ok(info.length)
        info.forEach(function (videoInfo) {
          assert.isString(videoInfo.url)
        })
      }
    },
    'from a twitch video': {
      topic: function () {
        'use strict'
        var video =
          'https://clips.twitch.tv/RelentlessOptimisticPterodactylRitzMitz'
        ytdl.getInfo(video, ['--no-warnings'], this.callback)
      },

      'info returned': function (err, info) {
        'use strict'
        assert.isNull(err)
        assert.isObject(info)
        assert.equal(info.id, '131170216')
        assert.equal(info.format_id, '1080')
        assert.equal(
          info.title,
          'Worlds 2017 Play-In: Rampage vs. 1907 Fenerbahçe Espor'
        )
        assert.isString(info.url)
        assert.isString(info.thumbnail)
        assert.equal(
          info.fulltitle,
          'Worlds 2017 Play-In: Rampage vs. 1907 Fenerbahçe Espor'
        )
        assert.equal(
          info._filename,
          'Worlds 2017 Play-In - Rampage vs. 1907 Fenerbahçe Espor-131170216.mp4'
        )
        assert.equal(info.format, '1080 - 1080p')
        assert.equal(info.height, 1080)
        assert.equal(info._duration_raw, 29.75)
        assert.equal(info._duration_hms, '00:00:29.750')
        assert.equal(info.duration, '29.75')
        assert.isArray(info.formats)
      }
    },

    'from multiple videos': {
      topic: function () {
        'use strict'
        var youtube = 'http://www.youtube.com/watch?v=90AiXO1pAiA'
        var twitch =
          'https://clips.twitch.tv/RelentlessOptimisticPterodactylRitzMitz'
        ytdl.getInfo([youtube, twitch], ['--no-warnings'], this.callback)
      },

      'info returned': function (err, info) {
        'use strict'
        assert.isNull(err)
        assert.isArray(info)
        assert.equal(info.length, 2)

        assert.equal(info[0].id, '90AiXO1pAiA')
        assert.equal(info[0].format_id, '43')
        assert.equal(info[0].title, 'lol')
        assert.isString(info[0].url)
        assert.isString(info[0].thumbnail)
        assert.equal(
          info[0].description,
          "Ridley High School's real American Bad ASS,A true Delco Savage. " +
            'Filmed in 2003 before Youtube was invented. ' +
            'This is also the original I find it hilarious that there are copycat videos!'
        )
        assert.equal(info[0]._filename, 'lol-90AiXO1pAiA.webm')
        assert.equal(info[0].width, 640)
        assert.equal(info[0].height, 360)
        assert.equal(info[0].format, '43 - 640x360 (medium)')
        assert.equal(info[0]._duration_raw, 11)
        assert.equal(info[0]._duration_hms, '00:00:11')
        assert.equal(info[0].duration, '11')
        assert.isArray(info[0].formats)
        assert.equal(info[1].id, '131170216')
        assert.equal(info[1].format_id, '1080')
        assert.equal(
          info[1].title,
          'Worlds 2017 Play-In: Rampage vs. 1907 Fenerbahçe Espor'
        )
        assert.isString(info[1].url)
        assert.isString(info[1].thumbnail)
        assert.equal(
          info[1].fulltitle,
          'Worlds 2017 Play-In: Rampage vs. 1907 Fenerbahçe Espor'
        )
        assert.equal(
          info[1]._filename,
          'Worlds 2017 Play-In - Rampage vs. 1907 Fenerbahçe Espor-131170216.mp4'
        )
        assert.equal(info[1].format, '1080 - 1080p')
        assert.equal(info[1].height, 1080)
        assert.equal(info[1]._duration_raw, 29.75)
        assert.equal(info[1]._duration_hms, '00:00:29.750')
        assert.equal(info[1].duration, '29.75')
        assert.isArray(info[1].formats)
      }
    }
  })
  .export(module)
