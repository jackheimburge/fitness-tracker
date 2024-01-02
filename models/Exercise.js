const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    type: String,
    caloriesPerMin: Number
})


module.exports = mongoose.model('Exercise', ExerciseSchema);