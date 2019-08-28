const Koa = require('koa');

// 1:引入中间件
const Router = require('koa-router');
const render = require('koa-art-template');
const static = require('koa-static');
const path = require('path');
const bodyParser = require('koa-bodyparser');


var app = new Koa();
let router = new Router();

router.get('/',async ctx =>{
    // ctx.body = 'index';
    ctx.render('index');
})
.post('/login',async ctx => {
   // 用户名abc 密码123
   let username = ctx.request.body.username;
   let password = ctx.request.body.password;
   // 回写cookie，保存用户数据到session中
   if(username != 'abc' || password != '123') {
      // koa中的异常处理
      // ctx.set('content-type','text/html;charset=utf-8');
      ctx.throw(200, `^_^亲爱的哥哥妹妹们，
         小猿生病了，马上就来修理^_^`);
      // return;
   } else {
    // 使用session保存数据
    ctx.session.user = {
      username:'abc'
    }
    ctx.body = '登录成功';
   }
})
.get('/list',ctx=>{
  ctx.body = `当前登录用户为:` + ctx.session.user.username
})


// 中间件koa-art-template、 koa-static
render(app, {
  // 页面查找的目录
  root: path.join(__dirname, 'view'),
  // 设置后缀名
  extname: '.html',
  // debug: false 则每次压缩页面及js，包括混淆，静态数据不会实时更新（不每次都读文件)
  debug: process.env.NODE_ENV !== 'production'
});
// 静态资源
app.use(static(path.resolve('./public')));


const session = require('koa-session');
// 通过任意字符串为基准进行加密算法的字符串
app.keys = ['some secret hurr'];
 
const CONFIG = {
  key: 'koa:sess', // session的名
  maxAge: 86400000,
  overwrite: true,
  // false的时候，客户端可以操作cookie
  httpOnly: true, // 不允许在客户端操作cookie
// {"user":{"username":"abac"},"_expire":1532529416883,"_maxAge":86400000}
// 未作数据签名
  signed: true, // 数字签名，保证数据不被串改
  rolling: false,  // 过期时间访问顺眼
  renew: false, // 过期后是否创建新的
};
 
app.use(session(CONFIG, app));

// ctx.request.body挂载属性
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods() )


// 错误处理
app.on('error', async (err, ctx) => {
  console.log(err);

});

app.listen(8888,()=>{
  console.log('服务已启动在8888端口....')
});