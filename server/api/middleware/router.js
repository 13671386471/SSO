const { REFRESH_TOKEN_KEY, ACCESS_TOKEN_KEY } = require('../../config');
const  verifyToken = require('../../middleware/jwt');
const { getCustomer } = require('../handler');


module.exports = function(app) {
    return function(req, res, next) {
        // 请求之前验证token，验证通过了才能处理请求
        app.post('/api/customer', verifyToken(ACCESS_TOKEN_KEY), getCustomer);

        next();
    }
}