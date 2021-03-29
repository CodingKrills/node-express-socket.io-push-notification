var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendfile('index.html');
});


io.on('connection', function (socket) {
    socket.on('new_notification', function (data) {
        console.log(data.title, data.message);
        io.sockets.emit('show_notification', {
            title: data.title,
            message: data.message,
            icon: data.icon,
        });
    });
});

const PORT = process.env.PORT || 5000;

http.listen(PORT, function () {
    console.log(`listening on localhost: ${PORT}`);
});