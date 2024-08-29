const users = require('../database/user');
const { checkCryptotoHash } = require('../../util/crypto');
const jwtObj = require('../util/jwt')
const { 
    ACCESS_TOKEN_KEY, ACCESS_TOKEN_OPTIONS,
    REFRESH_TOKEN_KEY, REFRESH_TOKEN_OPTIONS
} = require('../../config');
const user = require('../database/user');
exports.loginAction = function(req, res) {

    const { username, password} = req.body;

    const user = users[username];

    if (!user) {
        // res.status(401).json({
        //     message: '用户不存在'
        // });
        return res.json({
            code: 1,
            msg: 'Invalid usernam'
        });
        
    }

    const isRightPassword = checkCryptotoHash(password, user.password);
    if(!isRightPassword){
        return res.json({
            code: 1,
            msg: 'Invalid password'
        });
    }
    // 上述是校验等了的用户和密码是否正确

    // 下面是生成token
    const { accessToken, refreshToken} = createDoubleToken(user);

    return res.json({
        code: 0,
        msg: 'success',
        data: {
            access_token: accessToken,
            refresh_token: refreshToken
        }
    });

}

exports.refreshToken = function(req, res) {
    // tokenInfo是从前一个校验的中间件挂载的
    const {tokenInfo} = req;
    const { username, userId } = tokenInfo;
    const userData = user[username];
    if(userData && userData.id === userId){
        const { accessToken, refreshToken } = createDoubleToken(userData);
        return res.json({
            code: 0,
            msg: 'success',
            data: {
                access_token: accessToken,
                refresh_token: refreshToken
            }
        });
    }
    console.log('tokenInfo::', tokenInfo);
    return res.json({
        code: 1,
        msg: 'user does not exist'
    });
}

function createDoubleToken(userData){
    const accessToken = jwtObj.creteToken(
        ACCESS_TOKEN_KEY, 
        {
            userId: userData.id,
            username: userData.username
        }, 
        ACCESS_TOKEN_OPTIONS
    );
    const refreshToken = jwtObj.creteToken(
        REFRESH_TOKEN_KEY, 
        {
            userId: userData.id,
            username: userData.username
        }, 
        REFRESH_TOKEN_OPTIONS
    );

    return {
        accessToken,
        refreshToken
    }
}