var vows        = require('vows');
var ytdl        = require('..');
var assert      = require('assert-diff');
var youtube     = 'http://www.youtube.com/watch?v=0k2Zzkw_-0I';
var crunchyroll = 'http://www.crunchyroll.com/fairy-tail/episode-42-celestial-spirit-beast-662713';


var expected = {
  youtube: [
		{"id":"0k2Zzkw_-0I","code":"140","filetype":"m4a","resolution":"audio only","itag":140,"mediaformat":"DASH audio","bitrate":"128k","filesize":"4.44MiB"},
    {"id":"0k2Zzkw_-0I","code":"171","filetype":"webm","resolution":"audio only","itag":171,"mediaformat":"DASH audio","bitrate":"185k","filesize":"5.36MiB"},
    {"id":"0k2Zzkw_-0I","code":"141","filetype":"m4a","resolution":"audio only","itag":141,"mediaformat":"DASH audio","bitrate":"255k","filesize":"8.90MiB"},
    {"id":"0k2Zzkw_-0I","code":"278","filetype":"webm","resolution":"192x144","itag":278,"mediaformat":"DASH video","bitrate":"117k","fps":15,"filesize":"2.57MiB"},
    {"id":"0k2Zzkw_-0I","code":"160","filetype":"mp4","resolution":"192x144","itag":160,"mediaformat":"DASH video","bitrate":"120k","fps":15,"filesize":"3.90MiB"},
    {"id":"0k2Zzkw_-0I","code":"242","filetype":"webm","resolution":"320x240","itag":242,"mediaformat":"DASH video","bitrate":"207k","fps":30,"filesize":"5.96MiB"},
    {"id":"0k2Zzkw_-0I","code":"133","filetype":"mp4","resolution":"320x240","itag":133,"mediaformat":"DASH video","bitrate":"248k","fps":30,"filesize":"8.53MiB"},
    {"id":"0k2Zzkw_-0I","code":"243","filetype":"webm","resolution":"480x360","itag":243,"mediaformat":"DASH video","bitrate":"358k","fps":30,"filesize":"10.21MiB"},
    {"id":"0k2Zzkw_-0I","code":"134","filetype":"mp4","resolution":"480x360","itag":134,"mediaformat":"DASH video","bitrate":"605k","fps":30,"filesize":"13.12MiB"},
    {"id":"0k2Zzkw_-0I","code":"244","filetype":"webm","resolution":"640x480","itag":244,"mediaformat":"DASH video","bitrate":"792k","fps":30,"filesize":"20.51MiB"},
    {"id":"0k2Zzkw_-0I","code":"135","filetype":"mp4","resolution":"640x480","itag":135,"mediaformat":"DASH video","bitrate":"1105k","fps":30,"filesize":"26.55MiB"},
    {"id":"0k2Zzkw_-0I","code":"17","filetype":"3gp","resolution":"176x144","itag":17},
    {"id":"0k2Zzkw_-0I","code":"36","filetype":"3gp","resolution":"320x240","itag":36},
    {"id":"0k2Zzkw_-0I","code":"5","filetype":"flv","resolution":"400x240","itag":5},
    {"id":"0k2Zzkw_-0I","code":"43","filetype":"webm","resolution":"640x360","itag":43},
    {"id":"0k2Zzkw_-0I","code":"18","filetype":"mp4","resolution":"640x360","itag":18}
  ],

  crunchyroll: [
    {"id":"662713","code":"360p","filetype":"flv","resolution":"unknown"},
    {"id":"662713","code":"480p","filetype":"flv","resolution":"unknown"},
    {"id":"662713","code":"720p","filetype":"flv","resolution":"unknown"},
    {"id":"662713","code":"720p","filetype":"flv","resolution":"unknown"},
    {"id":"662713","code":"1080p","filetype":"flv","resolution":"unknown"},
    {"id":"662713","code":"1080p","filetype":"flv","resolution":"unknown"}
   ],

  mixcloud: [
    { id: 'TheBloodyBeetroots-sbcr-dj-mix-october-2014', itag: 0, filetype: 'mp3', resolution: 'unknown' }
  ]
};

vows.describe('getFormats').addBatch({
  'from a youtube video': {
    'topic': function() {
      ytdl.getFormats(youtube, this.callback);
    },

    'formats returned': function(err, formats) {
      assert.isNull(err);
      assert.isArray(formats);
      assert.deepEqual(formats, expected.youtube);
    }
  },

  'from a crunchyroll video': {
    'topic': function() {
      ytdl.getFormats(crunchyroll, this.callback);
    },

    'formats returned': function(err, formats) {
      assert.isNull(err);
      assert.isArray(formats);
      assert.deepEqual(formats, expected.crunchyroll);
    }
  },

  'from a mixcloud mix': {
    'topic': function() {
      ytdl.getFormats('http://www.mixcloud.com/TheBloodyBeetroots/sbcr-dj-mix-october-2014/', this.callback);
    },

    'formats returned': function(err, formats) {
      assert.isNull(err);
      assert.isArray(formats);
      assert.deepEqual(formats, expected.mixcloud);
    }
  }
}).export(module);
