var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'root',
  database        : 'node_music'
});
 
var db = {};

 // db.q('select..',[],function(err,data) {
 //    if(err) {

 //    }
 //    console.log(data);
 // })


db.q = function (sql,params,callback) {
  // 取出链接
  pool.getConnection(function(err, connection) {
    if (err) {
      callback(err,null);
      return;
    }
    connection.query(sql,params, function (error, results, fields) {
          console.log(`${sql}=>${params}`);
           // 释放连接
          connection.release();
          callback(error,results);  
          // error是否为空由数据库查询结果决定
    });
  });
}


// 导出对象
module.exports = db;
