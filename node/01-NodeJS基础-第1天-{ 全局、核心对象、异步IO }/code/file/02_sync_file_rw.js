// 引入核心对象
const fs = require('fs');


// 先读后写  (有异常catch)
let data = fs.readFileSync('./a.txt','utf8');
console.log(data);
// 写入到b.txt(有异常catch)
fs.writeFileSync('./b.txt',data);
console.log('文件复制成功');