
// ======================
//    Entorno
// ======================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB = 'mongodb://localhost:27017/cafe';

(process.env.NODE_ENV === 'dev') ? process.env.URLDB = urlDB : process.env.MONGO_URL; 