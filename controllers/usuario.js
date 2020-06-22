
const _ = require('underscore');
const User = require('../models/usuario');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const saveUser = (req, res) => {
    const data = req.body;
    data.password = bcrypt.hashSync(data.password, saltRounds);
    const user = new User(data);
    const userSaved = user.save()
    userSaved.then(dataUser => res.status(200).json({ok : true, dataUser}))
            .catch(err => res.status(400).json({ok : true, err}))
}

const updateUser = (req, res) => {
    const id = req.params.id;
    // filtramos los valores permitido para actualizar
    const data =  _.pick(req.body, 'nombre', 'email', 'img', 'role', 'status');
    const options = {
        new : true,
        runValidators : true,
        context: 'query'
    };
    const userModifie = User.findByIdAndUpdate(id, data, options)
    userModifie.then( dataUpdated => {
                    if(dataUpdated) res.status(200).json({ok : true, dataUpdated});
                    else res.status(200).json({ok : false, message : 'Usuario no encontrado'});
                })
                .catch(err => res.status(400).json({ok : false, err}))
}

const getUsers = (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const Users = User.find({status : true}, 'nombre email')
        .limit(limit*1)
        .skip(limit*(page-1));
    Users.then(users => {
        User.countDocuments({status : true})
            .then(count => res.status(200).json({ok : true, users, count}))
            .catch(err => res.status(400).json({ok : false, err}))
    }).catch( err => res.status(400).json({ok : false, err}))
}

const deleteUser = (req, res) => {
    const id = req.params.id;
    const userDeleted = User.findByIdAndDelete(id)
    userDeleted.then(userDeleted => {
        if(userDeleted) res.status(200).json({userDeleted});
        else res.status(400).json({ok : false, err : {
                message : 'Usuario no encontrado'
        }});
    }).catch(err => res.status(400).json({err}))
}

const deleteUserStatus = (req, res) =>{
    const id = req.params.id;
    const data = {status : false};
    const options = {new : true};
    const userDeleted = User.findByIdAndUpdate(id, data, options)
    userDeleted.then(Userdeleted => {
        if(Userdeleted) res.status(200).json({ok: true, Userdeleted})
        else res.status(400).json({ok : false, err : {
            message : 'Usuario no encontrado'
        }})
    }).catch(err => res.status(400).json({ok: false, err}))
}

module.exports = {
    saveUser,
    updateUser,
    getUsers,
    deleteUser,
    deleteUserStatus
}