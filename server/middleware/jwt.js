const jwt = require('jsonwebtoken');

module.exports = function verifyToken(secretKey) {
    /**
     * 前端发送请求时携带token的地方和格式
     * 地方：headers => Authorization
     * 格式：Bearer XXXXXXXXXXXXtokenXXXXXXXXXX
     */
    return function(req, res, next) {
        console.log('header:::', req.headers, req.headers['authorization']);
        const token = req.headers['authorization'].split(' ')[1];
        // token 是请求带的
        // secretKey 是后端设置的
        // 当 前端传递的token 和 后端 secretKey 匹配时，验证通过，回调方法中的decoded就是生成token时的payload对象
        jwt.verify(token, secretKey, function(err, decoded) {
            if (err) {
                // return res.status(401).json({
                //     message: 'Unauthorized'
                // });
                return res.json({
                    code: 2,
                    message: 'Invalid token'
                });
            }
            
            console.log('decoded::', decoded);
            req.tokenInfo = decoded;
            next();
        });
    }
}