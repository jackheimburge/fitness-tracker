const User = require('../../models/user');
const Exercise = require('../../models/Exercise');
const DailyData = require('../../models/DailyData');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

async function add(req, res) {
    console.log('CONTROLLER REACHED')
    const userId = req.user._id;
    try {
        const user = await User.findById(userId);
        const newDailyData = new DailyData({
            date: req.body.date,
            weight: req.body.weight,
            exercises: [{ type: Schema.Types.ObjectId, ref: 'DailyExercise' }],
        });

        // Calculate calories burned and update the newDailyData
        const exercise = await Exercise.findById(req.body.exercise.exerciseId);
        if (exercise) {
            const caloriesBurned = await newDailyData.calcCaloriesBurned(exercise, userId, req.body);
            console.log(caloriesBurned, 'caloriesBurned')
        }

        // Add the newDailyData to the user's dailyData array
        user.dailyData.push(newDailyData);

        // Save the updated user
        await user.save();

        res.json({ message: 'Daily data added successfully', data: newDailyData });
    } catch (error) {
        console.error('Error adding daily data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    add,
};