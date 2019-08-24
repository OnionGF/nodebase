const Koa = require('koa');

// 1:引入
const Router = require('koa-router');
const render = require('koa-art-template');
const static = require('koa-static');
const path = require('path');

var app = new Koa();

render(app, {
  // 页面查找的目录
  root: path.join(__dirname, 'view'),
  // 设置后缀名
  extname: '.html',
  // debug: false 则每次压缩页面及js，包括混淆，静态数据不会实时更新（不每次都读文件)
  debug: process.env.NODE_ENV !== 'production'
});


let router = new Router();
router.get('/',async ctx =>{
    // ctx.body = 'index';
    ctx.render('index');
});
// 在静态资源的处理之前，重写url,改变用户url的请求
app.use(async (ctx,next) => {
    if(ctx.url.startsWith('/public') ) { 
      // /public/js/index.js
      // 改写请求url
      ctx.url = ctx.url.replace('/public','');    
    }
    // 放行，交给static来处理（不管如何都放行）
    await next();
    console.log('ahahah');
});

// 静态资源
app.use(static(path.resolve('./public')));

app.use(router.routes())
app.use(router.allowedMethods() )


app.listen(8888);