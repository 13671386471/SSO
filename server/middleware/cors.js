

module.exports = function(allowOriginsArr) {
    // 中间件的写法：一个函数返回一个中间件函数，其中中间件函数的参数是req、res、next，最后执行next()执行下一个中间件函数执行
    return function(req, res, next) {
        const { origin } = req.headers;// 从请求头中获取的来源
        if(!Array.isArray(allowOriginsArr)) {return;}
        
        if(allowOriginsArr.includes(origin)) {
            res.header("Access-Control-Allow-Origin", origin);
            res.header("Access-Control-Allow-Methods", "GET, POST");//, PUT, DELETE, OPTIONS
            res.header("Access-Control-Allow-Headers", "Content-Type,Authorization,Origin,X-Requested-With,Accept");
            res.header("Access-Control-Allow-Credentials", 'true');// 认证
            next();
        }

       
    };
}