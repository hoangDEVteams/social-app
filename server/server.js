const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/myDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

const Post = require('./models/Post'); 

// Lấy tất cả bài post
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // mới nhất trước
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi lấy dữ liệu' });
  }
});
