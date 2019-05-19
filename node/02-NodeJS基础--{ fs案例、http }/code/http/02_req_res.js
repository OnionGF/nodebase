// 1:引入核心对象http
const http = require('http');

// 2: 用这个东西创建服务器
let server = http.createServer();

// 3: 基于事件， 很多的on('xxx')
// server.on('request',(req,res) => {
//     // req 是只读对象，拿属性
//     // res 是只写对象，调函数
  
//     console.log(req.headers); // 头
//     console.log(req.url);  // 行
//     console.log(req.method); // 行
//     //体
//     req.on('data',(data)=>{
//       console.log(data.toString());
//        // 写入到响应体
//     });

//     res.end('xxx');
// });

server.on('request',(req,res) => {
    // req 是只读对象，拿属性
    // res 是只写对象，调函数
  
    // 写头=>   1:一次性写 2:多次写
    res.setHeader('a','a');
    res.setHeader('b','b');
    res.setHeader('c','c');
    // 一次性写一定在多次写的后面
    // res.writeHead(200,{'d':'d'})
    // 写行
    res.writeHead(500,{'content-type':'text/html;charset=utf-8'});


      
    // 写体(一次)
    res.write('床前明月光');
    res.write('夏天心慌慌');
    // 一次性写一定在多次写的后面
    res.end('抬头看蚊子');
});



// IP 找计算机，  端口找程序
server.listen(8888,()=>{
  console.log('服务器启动在8888端口');
});