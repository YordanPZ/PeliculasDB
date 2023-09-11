const express = require('express');
const Actors = require('./actors.route');
const Directors = require('./directors.route');
const Genres = require('./genre.route');
const Movies = require('./movies.route');
const router = express.Router();

// colocar las rutas aquí
router.use('/actors', Actors);
router.use('/directors', Directors);
router.use('/genres', Genres);
router.use('/movies', Movies);

module.exports = router;