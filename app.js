
const express = require('express');
const app = express();
const bodypasrser = require('body-parser');
const path = require('path');
const cors = require('cors');

const api1 = require('./routes/usuarios');
const api2 = require('./routes/categorias');
const api3 = require('./routes/producto');

app.use(bodypasrser.urlencoded({extended : false}))
app.use(bodypasrser.json())
app.use(express.static(path.resolve(__dirname, './public')))
app.use(cors())

app.use('/usuario', api1)
app.use('/categoria', api2)
app.use('/producto', api3)


module.exports = app

