// 引入核心对象
const path = require('path');  // path没有写路径(核心对象)
                              // path在node.exe里面
                            
// 3段路径来自不同用户的输入    //one//    two      ///three ///

const myPath = path.join(__dirname,'//one//','//two//','//three///');

console.log(myPath);

console.log('=================')
// 根据相对路径，返回绝对路径
// 对程序说 ./xxx.js 非要一个绝对路径 

const str = './//abc////efg.js';
let temp = path.resolve(str);  //相对==>绝对
console.log(temp);
console.log('1==========')
console.log(path.join(__dirname,str))
console.log('2==========')
console.log(path.resolve(__dirname,'//one//','//two//'))
console.log('3==========')


// path.resolve(str);
// path.join(__dirname,'//one//','three')