const { getAll, create, getOne, remove, update,setMoviesDirectors,setMoviesActors,setMoviesGenres } = require('../controllers/movies.controller');
const express = require('express');

const Movies = express.Router();

Movies.route('/')
    .get(getAll)
    .post(create);

Movies.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

Movies.route('/:id/directors')
    .post(setMoviesDirectors);

Movies.route('/:id/actors')
    .post(setMoviesActors);

Movies.route('/:id/genres')
    .post(setMoviesGenres);

module.exports = Movies;