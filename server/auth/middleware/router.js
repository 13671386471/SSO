const { REFRESH_TOKEN_KEY } = require('../../config');
const  verifyToken = require('../../middleware/jwt');
const { loginAction, refreshToken } = require('../handler');


module.exports = function(app) {
    return function(req, res, next) {
        
        app.post('/auth/login', loginAction);
        
        // 走到这里是因为accress_token失效了，
        // 要用refresh_token换取新的token,那么就要先验证refresh_token，通过了再刷新token
        app.post('/auth/refresh', verifyToken(REFRESH_TOKEN_KEY), refreshToken);

        next();
    }
}