const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>');
});

app.get('/signal', function (req, res) {
	io.sockets.emit('my broadcast', 'signal emitted');
	res.send('signal emitted');
})

io.on('connection', (socket) => {
	let token = socket.handshake.query.token;
  console.log('a user with token ' + token + ' connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('my message', (msg) => {
    console.log('message: ' + msg);
  });
});

io.on('connection', (socket) => {
  socket.on('my message', (msg) => {
    io.emit('my broadcast', `server: ${msg} + server`);
  });
});




http.listen(3000, () => {
  console.log('listening on *:3000');
});