const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserExerciseSchema = new Schema({
    exercise: String,
    minutes: Number,
    caloriesBurned: Number
})


module.exports = mongoose.model('UserExercise', UserExerciseSchema);