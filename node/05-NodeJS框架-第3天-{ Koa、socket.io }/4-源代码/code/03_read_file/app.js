// 需求： 读取一个html文件，展示给用户显示
const fs = require('fs');
const Koa = require('koa');

let app = new Koa();


function asyncReadFile(url) {
   return new Promise(function(resolve,reject) {
      fs.readFile(url,(err,data)=>{
        // 1:失败，err  2：成功需要data
          if(err) {
             reject(err);
             return;
          }
          // 成功
          resolve(data);
      });
   });
}



// aysnc(声明函数中有异步操作) + await(等待) = promise (三合一)
app.use(async (ctx)=>{
  // 设置响应头
  ctx.set('content-type','text/html;charset=utf-8');
  if(ctx.url === '/') {
    // 响应首页
    ctx.body = await asyncReadFile('./index.html');
  }else if(ctx.url === '/content') {
    // 响应首页
    ctx.body = await asyncReadFile('./second.html');
  } else {
    // ok
      ctx.body = 'ok';  // 二进制数据buffer 作为下载
  }
});

app.listen(8888,()=>{
  console.log('项目启动成功...')
});