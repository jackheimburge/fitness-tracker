const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    type: String,
    caloriesPerMinLight: Number,
    caloriesPerMinMid: Number,
    caloriesPerMinHeavy: Number
})


module.exports = mongoose.model('Exercise', ExerciseSchema);