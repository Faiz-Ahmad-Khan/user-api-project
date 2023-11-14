const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  gender: String,
  status: String,
  createdAt: { type: Date, default: Date.now }, // Added createdAt field
  updatedAt: { type: Date, default: Date.now }, // Added updatedAt field
}, { versionKey: false });

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
