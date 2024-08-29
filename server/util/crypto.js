const crypto = require('crypto');

module.exports = {
	md5: function(str) {
		return crypto.createHash('md5').update(str).digest('hex');
	},
	sha1: function(str) {
		return crypto.createHash('sha1').update(str).digest('hex');
	},
	sha256: function(str) {
		return crypto.createHash('sha256').update(str).digest('hex');
	},
    checkCryptotoHash: function(str, hash) {
        return crypto.createHash('sha256').update(str).digest('hex') === hash;
    }
}