const jwt = require('jsonwebtoken');
const { crearRespuesta } = require('../utils/Common.utils');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
       crearRespuesta(2,res,"Token Invalido",301);
    }

    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'secretfortoken');
    } catch (err) {
        crearRespuesta(2,res,"Token Invalido",301);
        err.statusCode = 500;
        throw err;
    }

    if (!decodedToken) {
        const error = new Error('No autorizado');
        crearRespuesta(2,res,"Token Invalido",301);
        error.statusCode = 401;
        throw error;
    }

    req.isLoggedIn = true;
    req.id_usuario = decodedToken.id_usuario;
    req.usuario = decodedToken.usuario;
    next();

}