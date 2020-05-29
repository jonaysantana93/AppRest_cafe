const express = require('express');
const fs = require('fs');
const path = require('path');
const { VerificaTokenImg } = require('../middlewares/autenticacion');

const app = express();

app.get('/imagen/:tipo/:img', VerificaTokenImg, (req, res) => {

    let tipo = req.params.tipo;
    let img = req.params.img;

    let pathImg = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        let pathNoimg = path.resolve(__dirname, '../assets/original.jpg');
        res.sendFile(pathNoimg);
    }
});


module.exports = app;