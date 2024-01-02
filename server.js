const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

require('dotenv').config();
require('./config/database');

const app = express();

app.use(logger('dev'));
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use(require('./config/check-token'));

const port = process.env.PORT || 3001;

// API routes here, before 'catch all' route
app.use('/api/users', require('./routes/api/users'));
app.use('/api/exercises', require('./routes/api/exercises'));

// The following 'catch all *' route is used
// to return the index.html on all non-AJAX ==> API requests
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
});


app.listen(port, function () {
    console.log(`Express APP running on port ${port}`)
});