var	assert = require('assert'),
	fs = require('fs'),
	path = require('path'),
	converter = require('../library.js');


describe('Converting source/vbulletin', function() {
	it('should match', function(done) {
		fs.readFile(path.join(__dirname, '../source/vbulletin.txt'), function(err, vbulletin) {
			fs.readFile(path.join(__dirname, '../source/expected.txt'), function(err, expected) {
				vbulletin = vbulletin.toString();
				expected = expected.toString();

				converter.parse(vbulletin, function(err, parsed) {
					assert.equal(parsed, expected);
					done();
				});
			});
		});
	});
});
