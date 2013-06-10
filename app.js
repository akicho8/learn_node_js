
/**
 * Module dependencies.
 */

var express = require('express');
var routes  = require('./routes');
var user    = require('./routes/user');
var http    = require('http');
var path    = require('path');
// var my_chat = require('./lib/my_chat').init();
var io      = require('socket.io');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
// app.post('/talk', function(req, res){
//   var input = req.body.input;
//   res.send(input);
// });

// app.post('/talk', function(req, res){
//   var input = req.body.input || '';
//   res.send(my_chat.talk(input));
// });

// socket.IO
// var socket = io.listen(app);
// socket.on('connection', function(client){
//     client.on('message', function(msg){
//         // 受信データを全員に送信
//         client.broadcast(msg);
//         // 応答送信
//         var reply = {
//             name: 'my_chat',
//             input: my_chat.talk(msg.input)
//         };
//         client.send(reply);
//         client.broadcast(reply);
//     });
// });

var server = http.createServer(app);
var io = io.listen(server);

server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

// io.sockets.on('connection', function (socket) {
//     // socket.emit('news', { hello: 'world' });
//     // socket.on('my other event', function (data) {
//     //     console.log(data);
//     // });
//
//     alert("a");
//
//     console.log("ok");
//
//     socket.on('message', function(msg){
//         // 受信データを全員に送信
//         socket.broadcast(msg);
//         // 応答送信
//         var reply = {
//             name: 'my_chat',
//             input: my_chat.talk(msg.input)
//         };
//         socket.send(reply);
//         socket.broadcast(reply);
//     });
//
// });

// var io = require('socket.io').listen(app);
io.sockets.on('connection', function (socket) {
    //クライアント側からのイベントを受け取る。
    socket.on('msg send', function (msg) {
        //イベントを実行した方に実行する
        socket.emit('msg push', msg);
        //イベントを実行した方以外に実行する
        socket.broadcast.emit('msg push', msg);
    });
    //接続が解除された時に実行する
    socket.on('disconnect', function() {
        console.log('disconnected');
    });
});
