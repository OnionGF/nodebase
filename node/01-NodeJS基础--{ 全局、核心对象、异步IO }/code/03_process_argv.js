// 接收命令行参数 ，输出一个数组，前两个值是node绝对路径，文件的绝对路径 后两个值跟参数

// console.log(process.argv);

// 最简单的需求，命令行加法计算器 
// process.argv => [node绝对路径，文件的绝对路径 ,1, 3]

// 获取数组的2,3索引对应的元素
let num1 = process.argv[2] - 0;
let num2 = parseInt(process.argv[3]); // parseInt也ok
let sum = num1 + num2;
// // 输出（卡顿输出）（定时输出）
console.log('计算中.....');

// // 2秒后输出
setTimeout(()=>{
  console.log('结果为:' + sum );
},2000);