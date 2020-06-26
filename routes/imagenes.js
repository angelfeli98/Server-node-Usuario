
const express = require('express');
const Img = require('../controllers/imagenes');
const middlewares = require('../middlewares/autenticacion');

const app = express.Router();

app.get('/:tipo/:img/:token', middlewares.verificaToken, Img.getImg)


module.exports = app;