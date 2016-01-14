var vows   = require('vows');
var ytdl   = require('..');
var assert = require('assert');

vows.describe('getExtractors').addBatch({
  'plain extractors': {
    'topic': function() {
      'use strict';
      ytdl.getExtractors(false, this.callback);
    },

    'extractors returned': function(err, extractors) {
      'use strict';
      assert.isNull(err);
      assert.isArray(extractors);
    }
  },

  'extractors with description': {
    'topic': function() {
      'use strict';
      ytdl.getExtractors(true, this.callback);
    },

    'extractors returned': function(err, formats) {
      'use strict';
      assert.isNull(err);
      assert.isArray(formats);
    }
  }
}).export(module);