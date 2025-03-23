const express = require('express');
const http = require('http');
const path = require('path');
const db = require('./sever');

const app = express();
const server = http.createServer(app);
const initWebSocket = require('./socket');

// Gửi giao diện tĩnh
app.use(express.static(path.join(__dirname, '../pages')));
app.use('/socket', express.static(path.join(__dirname, '../pages/public/socket')));
app.use('/post', express.static(path.join(__dirname, '../pages/public/post')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../pages/index.html'));
});
app.get('/socket', (req, res) => {
  res.sendFile(path.join(__dirname, '../pages/public/socket/socket.html'));
});
app.get('/post', (req, res) => {
  res.sendFile(path.join(__dirname, '../pages/public/post/post.html'));
});
initWebSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
