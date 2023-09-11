const { getAll, create, getOne, remove, update } = require('../controllers/actors.controller');
const express = require('express');

const Actors = express.Router();

Actors.route('/')
    .get(getAll)
    .post(create);

Actors.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = Actors;