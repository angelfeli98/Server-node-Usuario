
const express = require('express');
const app = express.Router()
const Web = require('../controllers/web');

app.get('/', express.static('../public'))


module.exports = app;