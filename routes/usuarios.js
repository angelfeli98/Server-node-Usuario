
const express = require('express');
const Usuario = require('../controllers/usuario')
const middlewares = require('../middlewares/autenticacion');
const app = express.Router()



app.post('/saveUser', middlewares.verificaToken, middlewares.verificarRole, Usuario.saveUser)
app.put('/updateUser/:id', middlewares.verificaToken, Usuario.updateUser)
app.get('/getUsers', middlewares.verificaToken ,Usuario.getUsers)
app.delete('/deleteUser/:id', middlewares.verificaToken, middlewares.verificarRole, Usuario.deleteUser)
app.delete('/deleteUserStatus/:id', middlewares.verificaToken, middlewares.verificarRole, Usuario.deleteUserStatus)
app.post('/login', Usuario.loginUser)


module.exports = app;