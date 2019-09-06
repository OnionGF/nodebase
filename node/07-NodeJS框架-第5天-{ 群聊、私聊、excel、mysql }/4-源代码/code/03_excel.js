// var xlsx = require('node-xlsx').default;
// const fs = require('fs');
// // Parse a buffer
// const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`./1.xls`));
// // Parse a file
// const workSheetsFromFile = xlsx.parse(`./2.xlsx`);

// // console.log(workSheetsFromBuffer);
// console.log(workSheetsFromBuffer[0].data)
// console.log(workSheetsFromFile[0].data);
// 
// 
// 
// 生成文件
// var xlsx = require('node-xlsx').default;
 
// const data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
// var buffer = xlsx.build([{name: "mySheetName", data: data}]);
// const fs = require('fs');
// fs.writeFile('./3.xlsx',buffer,function(){});


// 合并单元格
var xlsx = require('node-xlsx').default;
const data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
const range = {s: {c: 0, r:0 }, e: {c:0, r:3}}; // A1:A4
const option = {'!merges': [ range ]};
 
var buffer = xlsx.build([{name: "mySheetName", data: data}], option); // Returns a buffer

const fs = require('fs');
fs.writeFile('./4.xlsx',buffer,function(){});