/***********************************/
// Configuracion del puerto
/***********************************/
process.env.PORT = process.env.PORT || 3000;


/***********************************/
// Entorno
/***********************************/
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'


/***********************************/
// Base de datos
/***********************************/
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://127.0.0.1/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

/***********************************/
// Fecha de expiracion del token
/***********************************/
/*
    -> 60 = segundos
    -> 60 = Minutos
    -> 24 = Horas
    -> 30 = Días
*/

process.env.CADUCIDAD_TOKEN = '24h';

/***********************************/
// SEED de Autenticacion
/***********************************/

process.env.SEED_TOKEN = process.env.SEED_TOKEN || 'este-es-el-seed-desarrollo'


/***********************************/
// Google Client ID
/***********************************/
process.env.CLIENT_ID = process.env.CLIENT_ID || '358112295890-qjvpefp18fvc2m69m78ci70reajdktbi.apps.googleusercontent.com';