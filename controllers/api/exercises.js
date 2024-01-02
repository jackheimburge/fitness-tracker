const Exercise = require('../../models/Exercise');

const getAllExercises = async (req, res) => {
    try {
        const allExercises = await Exercise.find({});
        res.json(allExercises)
    } catch (err) {
        console.error('Error fetching all exercises', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllExercises
}