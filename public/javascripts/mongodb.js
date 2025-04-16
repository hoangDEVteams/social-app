const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost:27017/SocialApp';

const connectDB = async () => {
    try {
      await mongoose.connect(dbURI);
      console.log('Kết nối MongoDB thành công');
    } catch (err) {
      console.error('Lỗi kết nối MongoDB:', err);
    }
};

module.exports = connectDB;