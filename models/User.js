const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    score: { type: Number, default: 0 },
    uniqueId: { type: String, default: uuidv4, unique: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

