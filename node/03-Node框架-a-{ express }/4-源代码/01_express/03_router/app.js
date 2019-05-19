const express = require('express');

let server = express();

// - 1:获取路由中间件对象 let router = express.Router();
let router = express.Router();
// - 2:配置路由规则 router.请求方式(URL,fn事)
router.get('/login',(req,res) => {
  res.end('login page');
})
.get('/register',(req,res) => {
  res.end('register page');
})
//   - fn中参数有req,res,next
// - 3:将router加入到应用server.use(router)
server.use(router);

server.listen(8888);



