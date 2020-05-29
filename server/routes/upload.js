const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const Usuario = require('../models/usuario');
const Producto = require('../models/producto')

const fs = require('fs');
const path = require('path');

//defaul options
app.use(fileUpload());


//Subimos imagenes
app.put('/upload/:tipo/:id', (req, res) => {
    let tipo = req.params.tipo;
    let id = req.params.id;

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No existen ficheros para subir'
            }
        });
    }

    //Validar tipo
    let tiposValidos = ['productos', 'usuarios'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'los tipos permitidos son: ' + tiposValidos.join(', ')
            }
        });
    }



    let archivo = req.files.archivo;

    //Extenciones permitidas
    let extValidas = ['png', 'jpg', 'gif', 'jpeg'];
    let nombreSeparado = archivo.name.split('.');
    let ext = nombreSeparado[nombreSeparado.length - 1];

    if (extValidas.indexOf(ext) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'las extensiones permitidas son: ' + extValidas.join(', '),
                extension: ext
            }
        });
    }

    //Cambiar nombre al archivo
    let date = new Date();
    let fileName = `${id}-${date.getFullYear()}${(date.getMonth()+1)}${date.getDate()}-${date.getHours()}${date.getMinutes()}${date.getSeconds()}.${ext}`;
    //let fileName = `${id}_${new Date().getMilliseconds()}.${ext}`;

    archivo.mv(`uploads/${tipo}/${fileName}`, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        // Ya tenemos la imagen ahora podemos actualizar nuestra imagen de usuario
        switch (tipo) {
            case 'productos':
                imagenProducto(id, res, fileName, tipo);
                break;
            case 'usuarios':
                imagenUsuario(id, res, fileName, tipo);
                break;
        }
    });
});

function imagenUsuario(id, res, fileName, tipo) {
    Usuario.findById(id, (err, usuarioDB) => {
        if (err) {
            DeleteFile(fileName, tipo);
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            DeleteFile(fileName, tipo);
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El usuario no existe'
                }
            });
        }

        DeleteFile(usuarioDB.img, tipo);
        usuarioDB.img = fileName;

        usuarioDB.save((userSave) => {
            res.json({
                ok: true,
                usuario: userSave
            })
        });

    });
}

function imagenProducto(id, res, fileName, tipo) {

    Producto.findById(id, (err, productoDB) => {
        if (err) {
            DeleteFile(fileName, tipo);
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            DeleteFile(fileName, tipo);
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El producto no existe'
                }
            });
        }

        DeleteFile(productoDB.img, tipo);
        productoDB.img = fileName;

        productoDB.save((producto) => {
            res.json({
                ok: true,
                producto
            })
        });

    });
}

function DeleteFile(nombreArchivo, tipo) {

    let pathImg = path.resolve(__dirname, `../../uploads/${tipo}/${nombreArchivo}`);
    if (fs.existsSync(pathImg)) {
        fs.unlinkSync(pathImg);
    }
}

module.exports = app;