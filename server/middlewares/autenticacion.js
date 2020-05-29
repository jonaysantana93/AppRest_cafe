const jwt = require('jsonwebtoken');


/***********************************/
// Verificar token
/***********************************/
let VerificaToken = (req, res, next) => {

    //Obtenemos el token del header de la peticion
    let token = req.get('token');

    jwt.verify(token, process.env.SEED_TOKEN, (err, decode) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'token no valido'
                }
            });
        }

        req.usuario = decode.usuario;
        next();
    });
};

/***********************************/
// Verificar token img
/***********************************/
let VerificaTokenImg = (req, res, next) => {
    let token = req.query.token;

    jwt.verify(token, process.env.SEED_TOKEN, (err, decode) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'token no valido'
                }
            });
        }

        req.usuario = decode.usuario;
        next();
    });
};

/***********************************/
// Verificar User Role
/***********************************/
let VerificaAdminRole = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }


}

module.exports = {
    VerificaToken,
    VerificaAdminRole,
    VerificaTokenImg
}