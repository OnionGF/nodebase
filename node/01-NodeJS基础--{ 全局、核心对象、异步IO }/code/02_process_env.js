// process 全局对象，直接用  可以用来获取查看全局变量
console.log(process.env); 


// 需求: 如果执行该代码，在刘老师的机器上，运行教师端kaikeba
// 如果不在刘老师的机器上，运行学生端

// 1:获取环境变量中关键的值
// 相对var来说，var会自动提升全局变量，let不会，就是块级{}
// let stuOrTeacher = process.env.MY_TEST;  
// // 判断是否等于 liulaoshi
// if (stuOrTeacher === 'liulaoshi') {
//   console.log('教师端');
// } else {
//   console.log('学生端');
// }

// 应用上，我们同样运行一个项目，但是，在你本机，和真实的服务器上
// 应该要有区别
//  比如: 你的机器上，可以一堆的log
//  服务器上，不应该了吧。。。