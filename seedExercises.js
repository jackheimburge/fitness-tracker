const mongoose = require('mongoose');
const Exercise = require('./models/Exercise');

mongoose.connect('mongodb+srv://jheimburge:nXdzDT3seoy8YVMa@cluster0.m5owbrn.mongodb.net/fitness-tracker?retryWrites=true&w=majority');


const exercisesToSeed = [
    { type: 'Walking', caloriesPerMin: 2.7 },
    { type: 'Jogging', caloriesPerMin: 5.2 },
    { type: 'Running', caloriesPerMin: 15 },
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