const jwb = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library')

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

const verificarTokenGoogle = async (req, res, next) => {
    try{
        const token = req.body.token;
        const client = new OAuth2Client(process.env.CLIENT_ID);
        const ticket = await client.verifyIdToken({
                idToken : token,
                audience : process.env.CLIENT_ID
            })
        req.data = ticket.getPayload();
        next()
    }catch(err){
        res.status(400).json({ok : false, err : {name : 'Bad token',err}});
    }
}

module.exports = {
    verificaToken,
    verificarRole,
    verificarTokenGoogle
}