// 接受一段字符串路径
const path = require('path');
let myPath = path.join(__dirname,'jack','rose','mick.txt');

// 解析这个路径为对象，更易于操作
let pathObj = path.parse(myPath);
// console.log(pathObj);

// base可以作为修改文件名，或后缀的方式
pathObj.base = 'mick_die.good';

// 接收路径对象，转换成路径字符串
myPath = path.format(pathObj);
console.log(pathObj);

//path.parse(myPath) 路径字符串==> 路径对象
//path.format(myPath)  路径对象==> 路径字符串