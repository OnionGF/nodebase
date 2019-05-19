const express = require('express');

let server = express();

// - res.json() 响应数据,最常用 , 返回ajax数据
// - redirect() 重定向
// - download() 下载
// - jsonp() 跨域处理


// - 1:获取路由中间件对象 let router = express.Router();
let router = express.Router();
// - 2:配置路由规则 router.请求方式(URL,fn事)
router.get('/json',(req,res) => {
  res.json([{name:'jack'}]);  // res.end只能响应string||读文件中的data Buffer
})
.get('/redirect',(req,res) => {
  res.redirect('http://www.baidu.com');
})
.get('/jsonp',(req,res) => {
  res.jsonp('jack love rose');
})
.get('/download',(req,res) => {
  res.download('./app.js');  // 注意文件是如何被下载成功的
  // 基于服务器回写的content-type。等头信息
})
//   - fn中参数有req,res,next
// - 3:将router加入到应用server.use(router)
server.use(router);

server.listen(8888);



