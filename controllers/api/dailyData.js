const User = require('../../models/user');
const Exercise = require('../../models/Exercise');
const DailyData = require('../../models/DailyData');

async function add(req, res) {
    console.log('CONTROLLER REACHED')
    const userId = req.user._id;
    try {
        const user = await User.findById(userId);
        const newDailyData = new DailyData({
            date: req.body.date,
            weight: req.body.weight,
            exercises: [
                {
                    exercise: req.body.exercise.exerciseId,
                    minutes: req.body.exercise.minutes,
                    caloriesBurned: 0, // Placeholder, will be updated below
                },
            ],
        });

        // Calculate calories burned and update the newDailyData
        const exercise = await Exercise.findById(req.body.exercise.exerciseId); // Assuming Exercise model is imported
        if (exercise) {
            newDailyData.exercises[0].caloriesBurned = newDailyData.calcCaloriesBurned(exercise);
        }

        // Add the newDailyData to the user's dailyData array
        user.dailyData.push(newDailyData);
        console.log(user.dailyData)

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