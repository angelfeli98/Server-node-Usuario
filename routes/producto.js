const express = require('express');
const app = express.Router();
const middlewares = require('../middlewares/autenticacion');
const Product = require('../controllers/producto');


app.get('/getProduct/:id', middlewares.verificaToken, Product.getProducto)
app.post('/saveProduct', middlewares.verificaToken, Product.saveProducto)
app.get('/getProducts', middlewares.verificaToken, Product.getProducts)
app.put('/updateProduct/:id', middlewares.verificaToken, Product.updateProduct)
app.delete('/deleteProduct/:id', middlewares.verificaToken, middlewares.verificarRole, Product.deleteProduct)
app.get('/getProductName/:termino', middlewares.verificaToken, Product.getProductTermino)


module.exports = app;