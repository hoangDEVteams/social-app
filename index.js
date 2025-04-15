const express = require('express');
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);

// Gửi giao diện tĩnh
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/pages')));

// Cấu hình kết nối MongoDB
const dbURI = 'mongodb://localhost:27017/SocialApp'; 
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ Kết nối MongoDB thành công');
  })
  .catch((err) => {
    console.log('❌ Lỗi kết nối MongoDB:', err);
  });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/pages/home.html'));
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
