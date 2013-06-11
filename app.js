/**
 * Module dependencies.
 */

var express = require('express');
var routes  = require('./routes');
var user    = require('./routes/user');
var http    = require('http');
var path    = require('path');
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

var server = http.createServer(app);
var io = io.listen(server);

server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

// ここがMediator相当？
io.sockets.on('connection', function (socket) {
    socket.on('msg_send', function (my_data) {
        socket.emit('msg_push', my_data);           // イベントを実行した方に実行
        socket.broadcast.emit('msg_push', my_data); // イベントを実行した方以外に実行
    });
    // 接続が解除された時に実行する
    socket.on('disconnect', function() {
        console.log('disconnected');
    });
});
