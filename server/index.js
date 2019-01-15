const express = require('express')
const path = require('path');   // 引入处理路径的模块
const fs = require('fs'); // 引入文件模块
const api = require('./api');  // 引入编写好的api
const app = express()

// 引入处理post数据的模块
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, '../dist')))

// 因为是单页应用 所有请求都走/dist/index.html
// app.get('*', function(req, res) {
// 	console.log(1111)
// 	const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'),'utf-8');
// 	res.send(html)
// })
// 设置cors跨域
app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-control-Allow-Headers", "Content-Type");
    res.header('Content-Type', 'application/json');
    next();
})

// 后端api路由
app.use('/api', api);
const port = process.env.PORT || 8081

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})