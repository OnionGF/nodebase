'use strict';
const http = require('http');
const fs = require('fs');
//getTimeByLongConn
let server = http.createServer(function(req, res) {
    if (req.url === '/1') { //响应长轮询的页面
        fs.readFile('./01_long_pull.html', (err, data) => {
            res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' });
            return res.end(data);
        });
    } else if (req.url === '/2') { //响应长轮询的页面
        fs.readFile('./02_long_conn.html', (err, data) => {
            res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' });
            return res.end(data);
        });
    } else if (req.url === '/3') { //响应长轮询的页面
        fs.readFile('./03_ws.html', (err, data) => {
            res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' });
            return res.end(data);
        });
    } else if (req.url === '/jquery.js') { //处理静态资源
        fs.readFile('./jquery.js', (err, data) => {
            res.writeHead(200, { 'content-type': 'application/x-javascript;charset=utf-8' });
            return res.end(data);
        });
    } else if (req.url === '/getTimerByLongPull') { //处理长轮询
        res.end(Date.now() + '');
    } else if (req.url === '/getTimeByLongConn') { //处理长连接不要end
        res.writeHead(200, { 'content-type': 'text/event-stream' }); //达到每次传输部分数据的效果
        setInterval(function() {
            // res.write(Date.now() + ''); 原生ajax使用方式
            // eventSouce 使用方式
            res.write('data:' + Date.now() + '\n\n')
        }, 1000);
    } else {
        return res.end('icon'); //处理图标
    }
});

server.listen(80, '127.0.0.1', function() {
    console.log('服务器启动了');
});


//启动websocket服务器
var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function(ws) {
    //ws 就是一个websocket对象,里边可以发送和接受数据,
    ws.on('message', function(message) {
        console.log('received: ' + message);
    });

    setInterval(function() {
        ws.send(Date.now() + '');
    }, 1000);
});
