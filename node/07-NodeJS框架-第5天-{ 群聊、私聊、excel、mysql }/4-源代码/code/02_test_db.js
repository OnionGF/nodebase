const db = require('./01_db_test.js');


db.q(`insert into musics (title,singer,time,file,filelrc,uid) values (?,?,?,?,?,?)`,['呵呵1','周杰伦1','03:00','file','filelrc',1],function(err,results) {
    if(err) throw err;
    console.log(results);
});

/*
增删改，results对象中都有发生行为的信息
OkPacket {
  affectedRows: 1,
  insertId: 4,
}
查询操作对象就是一个数组
*/