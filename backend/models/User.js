const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profession: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true }
});

module.exports = mongoose.model('User', userSchema);