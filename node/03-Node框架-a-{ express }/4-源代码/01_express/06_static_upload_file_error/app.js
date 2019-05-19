
const express = require('express');
const fs = require('fs');

let server = express();

server.engine('.html',require('express-art-template'));

server.set('view options', {
    debug: process.env.NODE_ENV !== 'production',
});

// 配置默认渲染引擎
server.set('view engine','.html');

let router = express.Router();

router.get('/',(req,res,next) => {
  console.log('请求进来了？',req.url);
  // 假如获取文件
  let errorPath = './abc/e.txt';
  try {
     fs.readFileSync(errorPath);
     res.render('index');
  } catch (err) {
    // throw err;  // 给用户看到了异常，太恶心
    next(err); // 触发一个具备4个参数的中间件函数
  }

})
// 最后一条路由中
.all('*',(req,res)=> {
  res.send('地址错误，您去首页吧');
})

// 要把public下下下的文件暴露出来
server.use('/public',express.static('./public'));  
// 当虚拟目录/public被匹配以后，未来url都会去除掉/public

server.use(router);


// 处理错误(参数位置错误优先) -> 优雅的用户体验
server.use((err,req,res,next) => {
  res.send('<h1>亲爱的用户，您访问的页面，有事儿了,<a href="/">去首页看看?</a></h1>');
})



server.listen(8888);