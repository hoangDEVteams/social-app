const express = require('express');
const http = require('http');
const path = require('path');
const { connectDB } = require('./public/javascripts/mongodb');
const userRoutes = require('./public/javascripts/user');
const multer = require('multer');
const fs = require('fs');
const userService = require('./service');
const app = express();
const server = http.createServer(app);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'public', 'images');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});


const upload = multer({ storage: storage });

// kết nối DB
connectDB();

// Gửi giao diện tĩnh
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/pages')));
app.use('/Users', userRoutes);

// Define routes separately
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/pages/home.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/pages/home.html'));
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public/pages/home.html'));
});


app.put('/api/users/:id', upload.single('picture'), async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    
    const userData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      active: req.body.active === 'on' || req.body.active === 'true' || req.body.active === true
    };
    
    if (req.file) {
      userData.picture = '/images/' + req.file.filename;
    }
    
    const success = userService.updateUser(userId, userData);
    
    if (!success) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(userService.findUserById(userId));
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});