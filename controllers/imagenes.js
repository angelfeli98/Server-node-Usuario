const path = require('path');
const fs = require('fs');

const getImg = (req, res) => {
    const type = req.params.tipo;
    const img = req.params.img;
    const typesValid = ['user', 'product'];

    if(!!!typesValid.find(typ => typ == type))
        return res.status(400).json({ok : false, message : 'BAD TYPE'});

    const pathFile = path.resolve(__dirname, `../uploads/${type}/${img}`);

    if(fs.existsSync(pathFile)) res.sendFile(pathFile);
    else res.sendFile(path.resolve(__dirname, '../assets/img/original.jpg'));
}


module.exports = {
    getImg
}