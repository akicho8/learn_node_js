$(function() {
    var socket = io.connect("http://localhost");
    socket.on("connect", function() {
        console.log("connected");
    });

    $("#btn").click(function() {
        var name = $("#name");
        var message = $("#message");
        console.log(name);
        console.log(message);
        socket.emit("msg_send", {"name": name.val(), "message": message.val()});
    });

    socket.on("msg_push", function (my_data) {
        console.log(my_data);
        $("#list").append($("<li>" + my_data.name + ": " + my_data.message + "</li>"));
    });
});
