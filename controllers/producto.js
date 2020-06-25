const Producto = require('../models/producto');

const getProducto = (req, res) => {
    const id = req.params.id;
    const limite = req.params.limit || 5;
    const skip = req.params.skip || 1;

    const producto = Producto.findById(id)
                                .limit(limite*1)
                                .skip((limite*skip*1)-1)
                                .populate({path : 'usuario', select : 'nombre email'})
                                .populate({path : 'categoria'})

    producto.then(product => {
        if(product.disponible) res.status(200).json({ok : true, product});
        else res.status(404).json({ok : false, message : 'ARTICULO NO ENCONTRADO'});
    }).catch(err => res.status(400).json({ok : false, err}));
}

const getProducts = (req, res) => {

    const product = Producto.find({disponible : true})
                            .populate({path : 'usuario', select : 'nombre email role'})
                            .populate({path : 'categoria', select : 'name'})

    product.then(products => {
        if(products) res.status(200).json({ok : true, products});
        else res.status(404).json({ok : false , message : 'PRODUCTOS NO ENCONTRADOS'})
    }).catch(err => res.status(400).json({ok : fals, err}))
}

const getProductTermino = (req, res) => {
    const termino = req.params.termino;
    const regex = new RegExp(termino, 'i');

    const producto = Producto.find({name : regex})
                                .populate({path : 'usuario', select : 'nombre email'})
                                .populate({path : 'categoria', select : 'name'});
    producto.then(gotproducto => {
        if(gotproducto) res.status(200).json({ok : true, gotproducto});
        else res.status(404).json({ok : false , message : 'NINGUN PRODUCTO COINCIDE CON LA BUSQUEDA'});
    }).catch(err => res.status(400).json({ok : true, err}));
}

const saveProducto = (req, res) => {
    const data = req.body;
    data.usuario = req.usuario._id;

    const newProducto = new Producto(data);
    const savedProduct = newProducto.save();

    savedProduct.then(product => {
        if(product) res.status(200).json({ok : true, product});
        else res.status(400).json({ok : true, message : 'NO SE CREO EL PRODUCTO'});
    }).catch(err => res.status(400).json({ok : false, err}))

}

const updateProduct = (req, res) => {
    const id = req.params.id;
    const data = req.body;

    const opt = {
        new : true,
        runValidators : true,
        context : 'query'
    };

    const updatedProduct = Producto.findByIdAndUpdate(id, data, opt);
    updatedProduct.then(updatedProduct => {
        if(updatedProduct) res.status(200).json({ok : true, updatedProduct});
        else res.status(404).json({ok : false, message : 'NO SE ENCONTRO NINGUN PRODUCTO'});
    }).catch(err => res.status(400).json({ok : true, err}));
}

const deleteProduct = (req, res) => {
    const id = req.params.id;
    const data = { disponible : false }

    const opt = {
        new : true,
        runValidators : true,
        context : 'query',
    }

    const deletedProduct = Producto.findByIdAndUpdate(id, data, opt);
    deletedProduct.then(product => {
        if(product) res.status(200).json({ok : true, message : 'PRODUCTO BORRADO'});
        else res.status(404).json({ok : false, message : 'Producto no encontrado'});
    }).catch(err => res.status(400).json({ok : false, err}));
}

module.exports = {
    getProducto,
    saveProducto,
    updateProduct,
    deleteProduct,
    getProducts,
    getProductTermino
}