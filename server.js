const express = require('express');
const http = require('http');
const path = require('path');
const connectDB = require('./public/javascripts/mongodb'); 
const userRoutes = require('./public/javascripts/user');

const app = express();
const server = http.createServer(app);

// kết nối DB
connectDB();

// Gửi giao diện tĩnh
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/images')));
app.use(express.static(path.join(__dirname, 'public/pages')));
app.use('/Users', userRoutes);

app.get(['/', '/home' , '*'], (req, res) => {
  res.sendFile(path.join(__dirname, '/public/pages/home.html'));
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
