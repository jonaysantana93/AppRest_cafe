require('./config/config');
const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

/*
    //Credenciales usuario para base de datos MLab
    user = strider
    password = 2GCiQDgIE1P4EzoM

    mongodb+srv://strider:2GCiQDgIE1P4EzoM@cluster0-jksag.mongodb.net/cafe
*/

// parse application/json
app.use(bodyParser.json())
app.use(require('./routes/usuario'));

mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err, res) => {
    if (err) throw err;

    console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => console.log(`Escuchando en el puerto ${process.env.PORT}`));