
const path = require('path');
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const fs = require('fs');

const uploadFile = (req, res) => {

    valirateType(req, res);
    let pathFileAbs = path.resolve(__dirname , `../uploads`) + `/${tipo}/`;
    const id = req.params.id;
    if(!!!req.files)
            return res.status(400).json({
            ok : false,
            err : {
                    name : 'File error',
                    message : 'NINGUN ARCHIVO'
                }
            })

    const file = req.files.archivo;
    const extenciones = ['png', 'jpg', 'gif', 'jpeg'];
    let nombre = file.name.split('.');
    const permitido = extenciones.find(extencion => extencion == nombre[1]);
    nombre = nombre.join('.');

    if(!!!permitido) res.status(404).json({ok : false, message : 'EXTENCION NO PERMITIDA'});
    else{
        const name = `${new Date().getTime() + nombre}`;
        const pathFile = pathFileAbs + name;
        req.body.path = pathFile;
        file.mv(pathFile, (err) => {
            if(err) return res.status(500).json({ok : false, err});
            data = {img : name};
            const dataUpdated = (tipo == 'user')? Usuario.findByIdAndUpdate(id, data) : Producto.findByIdAndUpdate(id, data);
            dataUpdated.then(data => {
                if(data){
                    req.body.path = pathFileAbs + data.img;
                    deleteImage(req, res)
                    res.status(200).json({ok : true, message : 'ARCHIVO SUBIDO'});
                }
                else{
                    deleteImage(req, res);
                    res.status(500).json({ok : false, message : 'DATA NO ENCONTRADA'});
                }
            }).catch(err =>{
                deleteImage(req, res);
                res.status(500).json({OK : false, err});
            });
        });
    }
}

const valirateType = (req, res) => {
    const tipo = req.params.tipo;
    const tiposValidos = ['user', 'product'];

    if(!!! tiposValidos.find(tip => tip === tipo))
        return res.status(404).json({ok : false, message : 'Tipo no valido'});
}

const deleteImage = (req, res) => {
    valirateType(req, res);
    let pathFileAbs = path.resolve(__dirname , `../uploads`) + `/${req.params.tipo}/`;
    const pathFile = req.body.path || (pathFileAbs + req.body.name);
    if(fs.existsSync(pathFile)) fs.unlinkSync(pathFile);
}

module.exports = {
    uploadFile,
    deleteImage
}