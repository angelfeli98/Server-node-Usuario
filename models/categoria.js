
const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const UsuarioSchema = require('./usuario');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name : {
        type : String,
        require : [true, 'El nombre debe de ser provisto'],
        unique : true
    },
    usuario : {
        type : Schema.Types.ObjectId,
        ref : 'Usuario',
        required : [true, 'Se necesita un usuario']
    },
    status : {
        type : Boolean,
        default : true
    }
})

const opt = {
    message : '{PATH} debe de ser unico'
}

CategorySchema.plugin(mongooseUniqueValidator, opt);


module.exports = mongoose.model('Category', CategorySchema);
