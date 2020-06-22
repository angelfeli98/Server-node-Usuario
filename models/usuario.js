
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Squema = mongoose.Schema;
const roles = {
    values: ['USER_ROLE', 'ADMIN_ROLE'],
    message : '{VALUE} no es un rol valido'
}

const usuarioSchema = new Squema({
    nombre : {
        type : String,
        required : [true, 'El nombre es necesario']
    },
    email : {
        type : String,
        required : [true, 'El correo es necesario'],
        unique : true,
        uniqueCaseInsensitive : true
    },
    password : {
        type : String,
        required : [true, 'La contraseña es requerida']
    },
    img : {
        type : String,
        required : false
    },    
    role : {
        type : String,
        default : 'USER_ROLE',
        required : [true, 'Se necesita un rol'],
        enum : roles
    },
    status : {
        type : Boolean,
        default : true
    },
    google : {
        type : Boolean,
        default : false
    }
});

usuarioSchema.methods.toJSON = function(){
    const user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

const opt = {
    message : '{PATH} debe de ser unico'
}

usuarioSchema.plugin(uniqueValidator, opt);

module.exports = mongoose.model('Usuario', usuarioSchema)