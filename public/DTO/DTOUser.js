const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  _id: Number,
  username: String,
  email: String,
  auth: {
    passwordHash: String
  },
  name: {
    first: String,
    middle: String,
    last: String
  },
  dob: Date,
  gender: Number,
  profile: {
    picture: String,
    bio: String,
    location: {
      country: String,
      city: String
    },
    phone: String
  },
  status: {
    isActive: Boolean,
    createdAt: Date,
    lastActive: Date
  },
  social: {
    friends: [Number], 
    followers: Number,
    following: Number
  },
  interests: [String],
  posts: Number
});

module.exports = mongoose.model('Users', UserSchema, 'Users');
