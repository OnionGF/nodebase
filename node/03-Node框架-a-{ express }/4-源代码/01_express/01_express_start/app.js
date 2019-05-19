// - 1:引入express第三方对象
const express = require('express'); // 自动逐级向上查找node_modules/express的文件夹-> package.json(main属性) || express的文件夹/index.js
// - 2:构建一个服务器对象
// let server = http.createServer();
let server = express();
// - 3:开启服务器监听端口
server.listen(8888);

// - 4:处理响应
server.use((req,res)=> {  // 使用（请求与响应的过程中）
  res.end('hello world!!'); // 原生API
});

// 类似路由 if( req.url === '/abc' ) { 做某件事}
// 类似路由 if( req.url === '/def' ) { 做某件事}