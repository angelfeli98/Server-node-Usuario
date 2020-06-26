
const mongoose = require('mongoose');
const mongooseUniqueValidator  = require('mongoose-unique-validator')

const Category = require('./categoria');
const Usuario = require('./usuario');

const Schema = mongoose.Schema;

const SchemaProducto = new Schema({
    name : {
        type : String,
        required : [true, 'Ingrese el nombre del producto'],
        unique : true
    },
    precioUni : {
        type : Number,
        required : [true, 'Ingrese el precio del producto']
    },
    categoria : {
        type:  Schema.Types.ObjectId,
        ref : 'Category',
        required : [true, 'Categoria no rpovista']
    },
    disponible : {
        type : Boolean,
        default : true
    },
    usuario : {
        type : Schema.Types.ObjectId,
        ref : 'Usuario',
        required : [true, 'Usuario no provisto']
    },
    descripcion : {
        type : String,
        required : [true, 'Descripcion no provista']
    },
    img : {
        type : String,
        required : false
    }
})

const options = {
    message : '{PATH} debe de ser unico'
}

SchemaProducto.plugin(mongooseUniqueValidator, options)


module.exports = mongoose.model('Producto', SchemaProducto);