const mongoose = require('mongoose');
const Exercise = require('./models/Exercise');
require('dotenv').config();


mongoose.connect(process.env.DATABASE_URL);


const exercisesToSeed = [
    { type: 'Walking', caloriesPerMinLight: 2.1, caloriesPerMinMid: 3.0, caloriesPerMinHeavy: 4.7 },
    { type: 'Jogging', caloriesPerMinLight: 8.0, caloriesPerMinMid: 12, caloriesPerMinHeavy: 18 },
    { type: 'Running', caloriesPerMinLight: 10.0, caloriesPerMinMid: 16.0, caloriesPerMinHeavy: 23.0 },
    { type: 'Sprinting', caloriesPerMinLight: 15, caloriesPerMinMid: 24, caloriesPerMinHeavy: 36 },
    { type: 'Swimming (Moderate)', caloriesPerMinLight: 6.0, caloriesPerMinMid: 9.1, caloriesPerMinHeavy: 14.0 },
    { type: 'Swimming (Fast)', caloriesPerMinLight: 10.0, caloriesPerMinMid: 15.0, caloriesPerMinHeavy: 23.0 },
    { type: 'Weight Lifting (Moderate)', caloriesPerMinLight: 3.0, caloriesPerMinMid: 4.5, caloriesPerMinHeavy: 6.8 },
    { type: 'Weight Lifting (Heavy)', caloriesPerMinLight: 6.0, caloriesPerMinMid: 9.0, caloriesPerMinHeavy: 14 },
]

async function seedExercises() {
    try {
        await Exercise.deleteMany();
        const seededExercises = await Exercise.create(exercisesToSeed);
        console.log('Exercises seeded =>', seededExercises)
    } catch (error) {
        console.error('error seeding exercises', error)
    } finally {
        mongoose.disconnect();
    }
}

seedExercises();