const express = require('express');
let app = express();

app.listen(8888,()=>{
  console.log('服务器启动在8888端口');
});

// 1: app.use是请求与相应中执行的一件事，按代码顺序来执行
// 2:next() 是放行到下一件事的开关
// 3:如果全next，最终没有end页面数据，框架帮我们处理了
//     status:404

// 用户选择性url开头的部分，选择性调用对应的事
app.use('/sucai',(req,res,next)=>{
  console.log('萝卜');
  next(); // 放行开关
});
// 一件事
app.use('/sucai',(req,res,next)=>{
  console.log('白菜');
  next();
});
app.use('/huncai',(req,res,next)=>{
  console.log('牛肉');
  next();
});
app.use('/huncai',(req,res,next)=>{
  console.log('羊肉');
  next();
});
