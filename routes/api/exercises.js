const express = require('express');
const router = express.Router();
const exercisesCtrl = require('../../controllers/api/exercises');

//ALL ROUTES START WITH /api/exercises


//get all database exercises
router.get('/', exercisesCtrl.getAllExercises);


module.exports = router;