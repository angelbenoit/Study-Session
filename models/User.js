const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    displayName: String,
    sessions: Array,
    goalSessionNumber: Number
});

mongoose.model('user', userSchema);
