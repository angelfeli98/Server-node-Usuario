
const express = require('express');
const File = require('../controllers/upload');


const app = express.Router();

app.put('/upload/:tipo/:id', File.uploadFile)
app.delete('/deleteImg/:tipo', File.deleteImage)



module.exports = app;