
const express = require('express');
const Usuario = require('../controllers/usuario')
const app = express.Router()



app.post('/saveUser', Usuario.saveUser)
app.put('/updateUser/:id', Usuario.updateUser)
app.get('/getUsers', Usuario.getUsers)
app.delete('/deleteUser/:id', Usuario.deleteUser)
app.delete('/deleteUserStatus/:id', Usuario.deleteUserStatus)


module.exports = app;