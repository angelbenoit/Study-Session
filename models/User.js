const mongoose = require('mongoose');
const { Schema } = mongoose;

const subSchema = new Schema({
    date: String,
    subject: String,
    minutes: String
})

const userSchema = new Schema({
    googleId: String,
    displayName: String,
    sessions: Array
});

mongoose.model('user', userSchema);
