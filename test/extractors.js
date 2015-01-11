var vows   = require('vows');
var ytdl   = require('..');
var assert = require('assert');

vows.describe('getExtractors').addBatch({
  'plain extractors': {
    'topic': function() {
      ytdl.getExtractors(false, this.callback);
    },

    'extractors returned': function(err, extractors) {
      assert.isNull(err);
      assert.isArray(extractors);
    }
  },

  'extractors with description': {
    'topic': function() {
      ytdl.getExtractors(true, this.callback);
    },

    'extractors returned': function(err, formats) {
      assert.isNull(err);
      assert.isArray(formats);
    }
  }
}).export(module);