const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DailyExerciseSchema = new Schema({
    exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise' },
    minutes: Number,
    caloriesBurned: Number
});


module.exports = mongoose.model('DailyExercise', DailyExerciseSchema);