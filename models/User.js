const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    displayName: String,
    sessions: Array,
    totalSubjectsCompleted: Number,
    totalSubjects: Number,
    goalSessionNumber: Number,
    attempedGoalNumber: Number
});

mongoose.model('user', userSchema);
