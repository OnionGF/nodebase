// 1:引入核心对象http
const http = require('http');

// 2: 用这个东西创建服务器
let server = http.createServer();

// 3: 基于事件， 很多的on('xxx')
server.on('request',(req,res) => {

    //不管请求是什么，都返回同一个数据
    res.end('xxx');
});


// IP 找计算机，  端口找程序
server.listen(8888,()=>{
  console.log('服务器启动在8888端口');
});