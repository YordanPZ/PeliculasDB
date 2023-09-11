const { getAll, create, getOne, remove, update } = require('../controllers/genres.controller');
const express = require('express');

const Genres = express.Router();

Genres.route('/')
    .get(getAll)
    .post(create);

Genres.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = Genres;