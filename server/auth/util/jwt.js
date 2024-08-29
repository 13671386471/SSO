const jwt = require('jsonwebtoken');

module.exports = {
    creteToken: function(secreteKey, payload, options) {
        return jwt.sign(payload, secreteKey, options);
    }
}

