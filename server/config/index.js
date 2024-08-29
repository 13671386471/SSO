/**
 * 生成两个token
 * access_token : 访问api的token
 * refresh_token : 刷新访问api的token的token
 */

const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_KEY = 'qwertyuiopasdfghjkl;123456789';
const REFRESH_TOKEN_KEY = ';123456789!qwertyuiopasdfghjkl';

// 跨域配置
const ALLOW_ORIGIN = [
    'http://localhost:5173',
    'http://localhost:3000',
]

// token的过期时间
const ACCESS_TOKEN_OPTIONS = {
    expiresIn: 60, // 数字表示是秒 '1h'：一小时 '1d'：一天 '1m'：一分钟 '1s'：一秒 '1y'：一年 
};
const REFRESH_TOKEN_OPTIONS = {
    expiresIn: 60 * 2, // 数字表示是秒 '1h'：一小时 '1d'：一天 '1m'：一分钟 '1s'：一秒 '1y'：一年 
};

module.exports = {
    ACCESS_TOKEN_KEY,
    REFRESH_TOKEN_KEY,
    ALLOW_ORIGIN,
    ACCESS_TOKEN_OPTIONS,
    REFRESH_TOKEN_OPTIONS
}