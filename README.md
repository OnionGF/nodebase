# nodebase
node基础笔记
05 月18日

### 结合koa框架项目整理：
```
.
├── apidoc.json
├── commitlint.config.js
├── config
│   ├── dev.json
│   └── production.json
├── ecosystem.json
├── modules   // 项目主要代码都在该目录下
│   ├── controllers // index.js中路由分发后，逻辑部分会引用该文件夹文件，用来处理操作数据库给客户端返回数据
│   │   └── test.js
│   ├── index.js   // 入口文件，引入中间件 监听端口 启动服务
│   ├── middleware  // 中间件 中间件的配置 设置
│   │   ├── cors.js
│   │   └── request_log.js
│   ├── models   // 数据库 可以理解为数据库的映射，逻辑中操作数据库主要是操作这里就ok了
│   │   ├── db.js
│   │   └── vip_black_shop
│   │       ├── index.js
│   │       ├── sms_activity.js
│   │       ├── sms_banner.js
│   │       ├── sms_hot_sale.js
│   │       └── sms_icon.js
│   ├── routers // 路由分发、逻辑部分会调用上面controllers里面的逻辑
│   │   └── test.js
│   ├── services // 操作数据库 封装一些对数据库的增删改查的方法 供需要操作数据库的逻辑使用 如上面的controllers 
│   │   └── test.js
│   └── web_router.js   // 路由入口，汇总router里面的文件
├── package.json
├── package-lock.json
└── README.md
```

> 总结下最近几天学习koa框架的新的， 在学会以后总给你框架后，在学习别的框架感觉框架都是大同小异，就拿koa框架和之前搞过的vue框架和react框架。 真的是大同小异。学一门框架首先是学他的结构、工作流程。然后在针对每一个点去深入学习，有整体到局部、 由广泛到深入。koa是node框架，他可以操作文件、操作数据库、是一个偏后端的工作范畴。也就是说可以用js 去写后端。 在我了解了我们项目在用的koa框架后，以react框架为例，koa框架中 路由分发之后是根据路由去匹配逻辑操作数据库返回数据，react框架则是根据路由分发去加载页面、渲染页面。 koa的操作数据库就像是react中去操作状态管理拿数据。也太神奇了八。从今天开始 将开启我的koa 学习之路。。。