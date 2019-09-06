// 私聊给谁
var privateTo;
// 向什么组发
var groupTo;
  // 发起私聊
  document.getElementById('sendPrivateMsg').onclick = function () {
    socket.emit('sendPrivateMsg',{
      msg:document.getElementById('privateMsg').value,
      //向谁发
      to:privateTo, // socketid
    });
  }

  // 对大家说
  document.getElementById('btn').onclick = function () {
      var newContent = document.getElementById('newContent').value;
      socket.emit('sendMsg',{
        newContent:newContent
      });
  }

  // 加入男生组
  document.getElementById('male').onclick = function () {
    socket.emit('jounGroup','male');
    groupTo = 'male';
  }
 // 加入女生组
   document.getElementById('female').onclick = function () {
    socket.emit('jounGroup','female');
    groupTo = 'female';
  }

// 发起组聊
 document.getElementById('sendGroupMsg').onclick = function() {
    // 获取发起的消息
    var msg = document.getElementById('groupMsg').value;
    socket.emit('sendGroupMsg',{
      groupTo,msg
    })
 }