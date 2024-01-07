const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DailyDataSchema = new Schema({
    date: { type: Date, default: Date.now },
    weight: { type: Number, default: null },
    exercises: [
        {
            exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise' },
            minutes: Number,
            caloriesBurned: Number,
        }
    ],
    foods: [/* Define your Food schema here */],
})


DailyDataSchema.methods.calcCaloriesBurned = async function (exercise, userId) {
    const User = require('../models/user');
    const user = await User.findById(userId);
    const weight = user.weight;
    console.log('exercise=', exercise)
    console.log('weight:', weight)
    const minutes = this.exercises[0].minutes;
    console.log('minutes:', minutes)
    if (weight <= 125) {
        console.log('calories burned:', exercise.caloriesPerMinLight * minutes)
        return exercise.caloriesPerMinLight * minutes;
    } else if (weight > 125 && weight < 200) {
        console.log('calories burned:', exercise.caloriesPerMinMid * minutes)
        return exercise.caloriesPerMinMid * minutes;
    } else {
        console.log('calories burned:', exercise.caloriesPerMinHeavy * minutes)
        return exercise.caloriesPerMinHeavy * minutes;
    }
}

module.exports = mongoose.model('DailyData', DailyDataSchema);

