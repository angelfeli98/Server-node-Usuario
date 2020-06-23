const jwb = require('jsonwebtoken');

const verificaToken = (req, res, next) => {

    const token = req.get('token');
    try{
        const data = jwb.verify(token, process.env.SEED);
        req.usuario = data.userFounded;
        next();
    }catch(err){
        res.status(401).json({ok : false, err : {name : 'TokenError' , message : 'Token invalido'}})
    }
}

const verificarRole = (req, res, next) => {
    const role = req.usuario.role;
    (role === 'ADMIN_ROLE')? next() : res.status(401).json({ok : false, err : {name : 'Not auth', message : 'El usuario dede de ser un administrador'} }); 
}

module.exports = {
    verificaToken,
    verificarRole
}