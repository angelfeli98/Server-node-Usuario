
// ======================
//    Entorno
// ======================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


let urlDB = 'mongodb://localhost:27017/cafe';

if(process.env.NODE_ENV === 'dev'){
    process.env.URLDB = urlDB
}else{
    process.env.URLDB = process.env.MONGO_URL
} 

// ======================
//    Semilla
// ======================
process.env.SEED = process.env.SEED || 'SECRETO';

// ======================
//    time
// ======================
process.env.DEADLINE = process.env.DEADLINE || 60*60*12;


// ======================
//    Goolge client
// ======================

process.env.CLIENT_ID = process.env.CLIENT_ID || '925442591259-1da1kvehnecdldjj61se342evakiqchm.apps.googleusercontent.com';