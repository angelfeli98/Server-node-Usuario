
const express = require('express');
const app = express();
const bodypasrser = require('body-parser');
const path = require('path');
const cors = require('cors');

const api = require('./routes/usuarios');
const api2 = require('./routes/web');

app.use(bodypasrser.urlencoded({extended : false}))
app.use(bodypasrser.json())
app.use(express.static(path.resolve(__dirname, './public')))
app.use(cors())

app.use('/usuario', api)


module.exports = app

