const express = require('express');
const app = express();

//En este fichero definiremos todas las rutas de nuestro WebService

app.use(require('./usuario'));
app.use(require('./login'));


module.exports = app;