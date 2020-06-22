const mongoose = require('mongoose');

// pasamos las opciones para la conexion a la base de datos
const opt = {
    useNewUrlParser : true, 
    useUnifiedTopology : true,
    useFindAndModify: false,
    useCreateIndex: true
}

const url = 'mongodb+srv://feli:feli@cluster0.4mvut.mongodb.net/cafe?retryWrites=true&w=majority';

mongoose.connect(url, opt, (err, res) => {
    if(err) throw err;
    else console.log('Conexion establecida a la base de datos');
})

module.exports = mongoose;