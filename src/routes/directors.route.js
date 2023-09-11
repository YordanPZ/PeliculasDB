const { getAll, create, getOne, remove, update } = require('../controllers/directors.controller');
const express = require('express');

const Directors = express.Router();

Directors.route('/')
    .get(getAll)
    .post(create);

Directors.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = Directors;