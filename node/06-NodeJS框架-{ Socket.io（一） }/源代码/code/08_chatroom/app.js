const Koa = require('koa')
const render = require('koa-art-template')
const static = require('koa-static')
const Router = require('koa-router')
const path = require('path')
const session = require('koa-session')
const bodyparser = require('koa-bodyparser')

let app = new Koa()
let router = new Router()


const msgs = [
  { username : '小敏', content: '你好'},
  { username : '小行', content: '在吗'},
  { username : '小是', content: '在的'},
]
render(app, {
  // 页面查找的目录
  root: path.join(__dirname, 'views'),
  // 设置后缀名
  extname: '.html',
  // debug: false 则每次压缩页面及js，包括混淆，静态数据不会实时更新（不每次都读文件)
  debug: process.env.NODE_ENV !== 'production'
});

router.get('/',async ctx=>{
  ctx.render('index')
})
.post('/login',async ctx=> {
  let {username,password} = ctx.request.body;
  ctx.session.user = {
    username
  }
  ctx.redirect('/list')
})
.get('/list',async ctx=>{
  ctx.render('list',{
    username: ctx.session.user.username,
    msgs
  })
})
.post('/add',async ctx => {
  let username = ctx.session.user.username;
  let content = ctx.request.body.msg;
  // 加入到数组中,返回最新消息回去
  msgs.push({
    username,content
  });
  ctx.body = msgs;
})
// 在服务七内存中存储{ session_id: 用户数据}

let store = {
  myStore:{},
  get:function(key){
    return this.myStore[key]
  },
  set:function(key,session){
    this.myStore[key] = session
  },
  destroy:function(){
    delete this.myStore[key]
  },
}

// 签名
app.keys =['test']
//处理请求体数据
app.use(bodyparser())

// 引入处理静态资源
app.use(static(path.resolve('./public')))

//处理session

app.use(session({store},app))

//路由
app.use(router.routes())

//c处理404 405
app.use(router.allowedMethods())

app.listen(8888,()=>{
  console.log("服务器启动在8888端口")
})