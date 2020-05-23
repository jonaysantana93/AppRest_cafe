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
    urlDB = 'mongodb+srv://cafe-user:FGTEERTZEaC7qRVI@cluster0-jksag.mongodb.net/cafe';
}

process.env.URLDB = urlDB;