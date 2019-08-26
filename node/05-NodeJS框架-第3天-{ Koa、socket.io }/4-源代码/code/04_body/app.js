const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
 
var app = new Koa();
  
app.use(bodyParser());
 
app.use(async ctx => {
  // the parsed body will store in ctx.request.body
  // if nothing was parsed, body will be an empty object {}
  console.log('ctx.request.rowBody',ctx.request.rowBody)
  ctx.body = ctx.request.body;  

  /*
    客户端：name=jack
    {
      "name": "jack"
    }
   */
  
   /*
   客户端发的是以下字符串，同时头application/json
    {
    "name": "json"
    }
    */
});

app.listen(8888,()=>{
  console.log('项目启动在8888端口...')
});