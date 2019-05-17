// 引入核心对象 fs
const fs = require('fs');

//读取文件                            err=>Error||null
fs.readFile('./a.txt','utf8',(err,data)=>{
    if (err) throw err; // 抛到控制台显示异常信息
    // console.log(data);
    // 需要获取字符串数据，就可以调用 buffer篮子.toString(编码)函数
    // console.log(data.toString('utf8'));  默认urf8可以不传递
    console.log(data);
});

//  I or O?
//  I input 计算机来说，就是输入
//  O output 计算机来说 ，展现/写入数据就是输出，
//  fs.writeFile(path,data||string,callback);
fs.writeFile('./a.txt','我今天赚了2块钱', {flag:'a'},(err)=>{
  // window中目录层级超级深的时候，写入会报错
  if(err) throw err;
  console.log('写文件完成了');
});

// 追加方式1: appendFile('path',data,callback);
// fs.appendFile('./a.txt','我今天赚了1块钱',(err)=>{
//     if(err) throw err;
//     console.log('文件追加成功');
// });