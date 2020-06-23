
// ======================
//    Entorno
// ======================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB = 'mongodb+srv://feli:feli@cluster0.4mvut.mongodb.net/cafe?retryWrites=true&w=majority';

(process.env.NODE_ENV === 'dev') ? process.env.URLDB = urlDB : urlDB; 