const mypath = 'C:/Users/Administrator/Desktop/Node.mp4'
const fs = require('fs');


console.log('同步读取前..');
fs.readFileSync(mypath);
console.log('工作A...');
console.log('读取成功了');


console.log('异步读取前..');
// // 异步读取
fs.readFile(mypath,()=>{
  console.log('异步读取后..');
});
console.log('工作B...');