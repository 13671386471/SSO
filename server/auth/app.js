const express = require('express');
const bodyParser = require('body-parser');// 处理application/josn 请求数据的
const cors = require('../middleware/cors');
const {ALLOW_ORIGIN} = require('../config');
const router = require('./middleware/router');

const app = express();
app.use(bodyParser.json());// 这样后面就能处理application/josn 请求数据了
app.use(cors(ALLOW_ORIGIN))
app.use(router(app))

app.listen(5050, () => {
	console.log('server is running at port 5050');
});