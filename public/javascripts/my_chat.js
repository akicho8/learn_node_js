$(function() {
    var socket = io.connect('http://localhost');
    socket.on('connect', function() {
        console.log('connected');
    });

    $('#btn').click(function() {
        var message = $('#message');
        console.log(message);
        //サーバーにメッセージを引数にイベントを実行する
        socket.emit('msg send', message.val());
    });

    //サーバーが受け取ったメッセージを返して実行する
    socket.on('msg push', function (msg) {
        console.log(msg);
        $('#list').prepend($('<li>' + msg + '</li>'));
    });

    socket.on('msg updateDB', function(msg){
        console.log(msg);
    });
});

// window.addEventListener('load', function() {
// 
//     var name = document.querySelector('#name');
//     var input = document.querySelector('#input');
//     var textarea = document.querySelector('textarea');
// 
//     var socket = new io.Socket();
//     socket.connect();
//     // 受信したmsgをtextareaに表示
//     socket.on('message', function(msg){
//         textarea.value += msg.name + '> ' + msg.input + '\n';
//         textarea.scrollTop = textarea.scrollHeight;
//         input.value = '';
//     });
// 
//     document.querySelector('form').addEventListener('submit', function(e) {
//         textarea.value += 'あなた> ' + input.value + '\n';
//         // Socket.IOで送信
//         socket.send({
//             name: name.value,
//             input: input.value
//         });
//         e.preventDefault();
//     }, false);
// 
//     name.focus();
// 
// }, false);

// window.addEventListener('load', function() {
//     var input = document.querySelector('input[type=text]');
//     var textarea = document.querySelector('textarea');
//
//     document.querySelector('form').addEventListener('submit', function(e) {
//         textarea.value += 'あなた> ' + input.value + '\n';
//
//         var req = new XMLHttpRequest();
//         req.open('POST', '/talk');
//
//         req.onreadystatechange = function() {
//             if (req.readyState == 4 && req.status == 200) {
//                 // 応答をtextareaに表示してscrollを最下部に＆inputを空に
//                 textarea.value += 'my_chat> ' + req.responseText + '\n';
//                 textarea.scrollTop = textarea.scrollHeight;
//                 input.value = '';
//             }
//         };
//
//         req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//         req.send('input=' + encodeURIComponent(input.value));
//         e.preventDefault();
//     }, false);
//
//     input.focus();
// }, false);
