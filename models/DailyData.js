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


DailyDataSchema.methods.calcCaloriesBurned = function (exercise) {
    const weight = this.weight;
    const minutes = exercise.minutues;
    if (weight <= 125) {
        return exercise.caloriesPerMinLight * minutes;
    } else if (weight > 125 && weight < 200) {
        return exercise.caloriesPerMinMid * minutes;
    } else {
        return exercise.caloriesPerMinHeavy * minutes;
    }
}

module.exports = mongoose.model('DailyData', DailyDataSchema);

