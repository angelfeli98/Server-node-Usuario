
const expres = require('express');
const app = expres.Router();
const middlewares = require('../middlewares/autenticacion');
const Categories = require('../controllers/cotegoria')

app.post('/saveCategory',middlewares.verificaToken, Categories.saveCategoria)
app.delete('/deleteCategory/:id', middlewares.verificaToken, middlewares.verificarRole, Categories.deleteCategory)
app.get('/getCategory/:id', middlewares.verificaToken, Categories.getCategory)
app.get('/getCategories', middlewares.verificaToken, Categories.getCategories)
app.put('/updateCategory/:id', middlewares.verificaToken, Categories.updateCategory)

module.exports = app;