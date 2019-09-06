// koa 解析请求体数据  登录，koa-session
// koa-static  koa-router art-template

const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');
const render = require('koa-art-template');
const path = require('path');
const session = require('koa-session');
const bodyparser = require('koa-bodyparser');



const group = {
  'male':'男生组','female':'女生组'
};

// 全局变量: global
global.mySessionStore = {};  // 132313: {socketid:/#I4LARR47CSu5pd1EAAAB ,username}


// 根据socketid找key
function findKeyBySocketId(socketid) {
  for(var key in global.mySessionStore ) {
      let obj = global.mySessionStore[key];
      if(obj.socketid === socketid) {
        return key;
      }
  }
}
// 根据socketid找value
function findBySocketId (socketid) {
  for(var tempstamp in global.mySessionStore ) {
      let obj = global.mySessionStore[tempstamp];
      if(obj.socketid === socketid) {
        return obj;
      }
  }
}



let app = new Koa();

// 加入socket.io 开始
const IO = require( 'koa-socket' )

const io = new IO()

io.attach( app ); // 附加到app产生关联
 
io.on( 'connection', ( context ) => {
  console.log('链接上了一个' );
  io.broadcast('msg1','我是服务器来的');
});

// 接收用户的消息
io.on('sendMsg',(context)=>{
  console.log('xxxx');
    // context.socket (客户端的那个连接)   
    // context.socket.socket.id 私聊用的
    // console.log('消息来了',context.data.newContent);
    // console.log('当前的socketid',context.socket.socket.id);

    //查找对象的用户
    let obj = findBySocketId(context.socket.socket.id)
    // console.log(obj);

    // 广播给所有人
    io.broadcast('allmessage',obj.username +'对所有人说:' + context.data.newContent);

    // 在这里没有ctx.session 所以我们
    // 得想办法在这里拿到当前用户的
})
// 处理登陆同步信息
io.on('login',context => {
  let id = context.data.id;

  global.mySessionStore[id].socketid = context.socket.socket.id

  // 测试当前在线用户
  io.broadcast('online',{
    online:global.mySessionStore
  });
    
  context.socket.on('disconnect',(context)=>{
    // 删除掉原本存在的id的用户
    // 获取到socketid
    let socketid = context.socket.socket.id;
    let key = findKeyBySocketId(socketid);
    // 删除key
    delete global.mySessionStore[key];
    io.broadcast('online',{
      online:global.mySessionStore
    });
  })
});
// 发起私聊
io.on('sendPrivateMsg',context => {
  // socketid,to,msg
  let { msg } = context.data;
  let toId = context.data.to;
  let fromSocketId = context.socket.socket.id;
  let { username } = findBySocketId(fromSocketId);
  //  xxx 对你私聊说 ： xxx
  // koa-socket 是一个socket.io 的语法糖 ,app._io 就是io对象
  app._io.to(toId).emit('allmessage',`${username}对你说:${msg}`);
});

// 处理加入组
io.on('jounGroup',context => {
  let groupId = context.data;
  // 使用当前socket加入组
  context.socket.socket.join(groupId);
  console.log('加入' + groupId);
});

// 组聊天
io.on('sendGroupMsg',context => {
  let { groupTo,msg } = context.data;
  let fromSocketId = context.socket.socket.id;
  let { username } = findBySocketId(fromSocketId);

  app._io.to(groupTo).emit('allmessage',`来自${group[groupTo]} 组的${username} 对大家说:  ${msg}`);
});

// 加入socket.io 结束



render(app, {
  // 页面查找的目录
  root: path.join(__dirname, 'views'),
  // 设置后缀名
  extname: '.html',
  // debug: false 则每次压缩页面及js，包括混淆，静态数据不会实时更新（不每次都读文件)
  debug: process.env.NODE_ENV !== 'production'
});



let router = new Router();
router.get('/',async ctx=>{
  ctx.render('index');
})
.post('/login',async ctx => {
    let {username,password} = ctx.request.body;
    // 不验证直接挂在session
    ctx.session.user = {
      username
    }

  // 1:生成时间戳将时间戳响应给客户端(类似cookie)
    let id = Date.now();
    ctx.session.user.id = id;

    //2: 保存到自己的sessionStroe中
    global.mySessionStore[id] = {
      username:username
    }


    // 重定向到聊天室
    ctx.redirect('/list'); // http
})
.get('/list',async ctx=>{  // http
    // 3:接着可以使用了
    ctx.render('list',{
      username:ctx.session.user.username,
      id:ctx.session.user.id,
    });
})
// .post('/add',async ctx => {
//     let username = ctx.session.user.username;
//     let content = ctx.request.body.msg;
//     // 加入到数组中,返回最新消息回去
//     msgs.push({
//       username,content
//     });
//     ctx.body = msgs;
// })
// 签名的依据
app.keys = ['test'];

// 在服务器内存中存储 {session_id:用户数据}
let store = {
  myStore:{},
  get:function(key) {
    return this.myStore[key];
  },
  set:function(key,session) {
    this.myStore[key] = session;
  },
  destroy:function() {
    delete this.myStore[key];
  }
}
// 处理静态资源
app.use(static(path.resolve('./public')));
// 处理session
app.use(session({store},app,))
// 处理请求体数据
app.use(bodyparser());
// 路由
app.use(router.routes());
// 处理405 501
app.use(router.allowedMethods());


app.listen(8888);