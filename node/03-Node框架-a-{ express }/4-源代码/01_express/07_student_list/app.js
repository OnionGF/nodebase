
const express = require('express');
const fs = require('fs');
const formidable = require('formidable');
const path = require('path');
let server = express();

let heros = [];





server.engine('.html',require('express-art-template'));

server.set('view options', {
    debug: process.env.NODE_ENV !== 'production',
});

// 配置默认渲染引擎
server.set('view engine','.html');

let router = express.Router();
router
.get('/',(req,res,next) => {
     res.render('index',{
      heros, // ES6属性简写，key和value是同名的
     })

})
.post('/add',(req,res,next) => {
  // 解析文件,用包
   var form = new formidable.IncomingForm();
  
  // 修改上传目录
  form.uploadDir = path.join(__dirname,'public','imgs');
  // 保持原有后缀名
  form.keepExtensions = true;

   // 解析
    form.parse(req, function(err, fields, files) {
      // console.log(fields);  // fields.nickname
                            // files.avater.path
                            // path.parse(路径).base文件名
      // console.log(files);
      
      let nickname = fields.nickname;
      let filename = path.parse(files.avater.path).base;
      // 存储 img: 网络能请求道的路径    img/uploadxxx.js
      let img = 'imgs/' + filename;
      heros.push({
        nickname,img
      });
      // 同步提交，浏览器等待页面显示
      res.redirect('/');
    });
})
// 最后一条路由中
.all('*',(req,res)=> {
  res.send('地址错误，您去首页吧');
});   




// 处理图片
server.use(express.static('./public'));
// /imgs/upload_5304f504b298af0f0330f9d0c77ea3c9.jpg

server.use(router); 


// 处理错误(参数位置错误优先) -> 优雅的用户体验
server.use((err,req,res,next) => {
  console.log(err);
  res.send('<h1>亲爱的用户，您访问的页面，有事儿了,<a href="/">去首页看看?</a></h1>');
});

server.listen(8888);