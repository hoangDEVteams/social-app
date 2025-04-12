const express = require('express');
const http = require('http');
const path = require('path');
const db = require('./server');

const app = express();
const server = http.createServer(app);
const initWebSocket = require('./socket');

// Gửi giao diện tĩnh
app.use(express.static(path.join(__dirname, '../publice/pages')));
app.use(express.static(path.join(__dirname, '../publice/img')));
app.use('/socket', express.static(path.join(__dirname, '../publice/pages/socket')));
app.use('/post', express.static(path.join(__dirname, '../publice/pages/post')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../publice/pages/index.html'));
});
app.get('/socket', (req, res) => {
  res.sendFile(path.join(__dirname, '../publice/pages/socket/socket.html'));
});
app.get('/post', (req, res) => {
  res.sendFile(path.join(__dirname, '../publice/pages/post/post.html'));
});

app.post('/post', (req, res) => {
  const { title, content } = req.body;
  posts.push({ title, content });
  res.redirect('/home');
});

initWebSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
