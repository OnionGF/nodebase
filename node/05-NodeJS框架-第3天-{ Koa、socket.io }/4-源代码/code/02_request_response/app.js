// request常用属性(接收)
// - ctx.request.url(ctx.url)
// - ctx.request.method(ctx.method)
// - ctx.request.headers(ctx.headers)
// response常用属性(向客户端写回的)
// - ctx.response.set('key',value)  函数:参数key,val
// - ctx.response.statu(ctx.status)
// - ctx.response.body(ctx.body)  

const Koa = require('koa');
let app = new Koa();
app.use((context,next)=>{
    // console.log(context.request.url);
    // console.log(context.request.method);
    // console.log(context.request.headers);    
    console.log(context.url);
    console.log(context.method);
    console.log(context.headers);
    next(); // 放行
}); // 请求与响应之间发生的一件事
app.use((ctx)=>{
  console.log('第二件事');

  // 响应头/状态码，体
  // ctx.response.set('mytest','12345');
  // ctx.response.status = 200;
  // ctx.response.body = '<h1>大家好</h1>'; 
  ctx.set('mytest','12345');
  ctx.status = 200;
  ctx.body = '<h1>大家好</h1>';


})
app.listen(8888);
// 404 在框架中最终并未响应数据给客户端