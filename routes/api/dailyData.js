const express = require('express');
const router = express.Router();
const dailyDataCtrl = require('../../controllers/api/dailyData');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

//ALL ROUTES start with '/api/dailyData'

//POST '/api/dailyData'
router.post('/', ensureLoggedIn, dailyDataCtrl.add);

module.exports = router;