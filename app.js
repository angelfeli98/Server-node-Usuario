
const express = require('express');
const app = express();
const bodypasrser = require('body-parser');
const path = require('path');
const cors = require('cors');
const fileload = require('express-fileupload')

const api1 = require('./routes/usuarios');
const api2 = require('./routes/categorias');
const api3 = require('./routes/producto');
const api4 = require('./routes/upload');

app.use(bodypasrser.urlencoded({extended : false}))
app.use(bodypasrser.json())
app.use(express.static(path.resolve(__dirname, './public')))
app.use(cors())
app.use(fileload({ useTempFiles : true}))

app.use('/usuario', api1)
app.use('/categoria', api2)
app.use('/producto', api3)
app.use('/file', api4)


module.exports = app

