const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://huan:an672005@cluster0.rjjsb.mongodb.net/SocialApp?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('✅ Kết nối MongoDB Atlas thành công');
    } catch (err) {
        console.error('❌ Lỗi kết nối MongoDB:', err);
    }
};

const User = require('../DTO/DTOUser');

module.exports = { connectDB, User };