
const express = require('express');
const app = express();
const bodypasrser = require('body-parser')

const api = require('./routes/usuarios');

app.use(bodypasrser.urlencoded({extended : false}))
app.use(bodypasrser.json())

app.use('/usuario', api)

module.exports = app

