const Koa = require('koa');

// 1:引入
const Router = require('koa-router');
const render = require('koa-art-template');
const static = require('koa-static');
const path = require('path');
// var jwt = require('jsonwebtoken');

const bodyParser = require('koa-bodyparser');


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
})
.post('/login',async ctx => {
   // 用户名abc 密码123
   let username = ctx.request.body.username;
   let password = ctx.request.body.password;
   // 回写cookie，保存用户数据到session中
   if(username != 'abc' || password != '123') {
      // koa中的异常处理
      // ctx.set('content-type','text/html;charset=utf-8');
      ctx.throw(400);
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

// 静态资源
app.use(static(path.resolve('./public')));


const session = require('koa-session');
 
// 通过任意字符串为基准进行加密算法的字符串
app.keys = ['shhhhhh'];
 
// const CONFIG = {
//   key: 'koa:sess', // session的名
//   maxAge: 86400000,
//   overwrite: true,
//   // false的时候，客户端可以操作cookie
//   httpOnly: true, // 不允许在客户端操作cookie
  
// // {"user":{"username":"abac"},"_expire":1532529416883,"_maxAge":86400000}
// // 未作数据签名
//   signed: true, // 数字签名，保证数据不被串改
//   rolling: false,  // 过期时间访问顺眼
//   renew: false, // 过期后是否创建新的
//   encode: function(str) {
//     var token = jwt.sign(str, 'shhhhh');
//     //console.log(token);
//     return token;
//   },
//   decode: function(str) {
//     var decoded = jwt.verify(str, 'shhhhh');
//     //console.log(data);
//     return decoded;
//   }
// };

// 
let store = {
  storage: {},
  get (key) {  // key就是 cookie中的session_id
    return this.storage[key]
  },
  set (key, session) {
    this.storage[key] = session
  },
  destroy (key) {
    delete this.storage[key]
  }
} 

// ctx.session
app.use(session({store:store}, app));



// ctx.request.body挂载属性
app.use(bodyParser());

// koa中优雅的处理错误页面
// app.use(async (ctx,next)=>{
//   try {
//     await next();
//     // 等待
//   }catch(ee) {
//     console.log('=====================',ee);
//     ctx.status = 200;
//     ctx.body = `
//     <div>
//       出错了
//     </div>`
//   }
// });


// 处理错误页面
app.use(async (ctx,next)=> {
    try {
      // 执行了
      await next();   // 作为一个同步代码来执行
    } catch (e) {
      console.log(123,e.message);
      ctx.status = 200;
      ctx.body = `
        <div>
          页面出错了
        </div>
      `;
    }

});

app.use(router.routes());  // 各种页面的响应
app.use(router.allowedMethods() )


// 错误处理
app.on('error', async (err, ctx) => {
  // 仅仅是服务器（后端）方的一个log日志记录
  console.log(2,err);

});

app.listen(8888,()=>{
  console.log('项目启动在8888端口....')
});