const HttpException = require('../utils/HttpException.utils');
var Usuario = require('../models/UsuarioModel');
const { crearRespuesta, decodeData } = require('../utils/Common.utils');
const jwt = require('jsonwebtoken');

class MainController {

    login = async (req, res, next) => {
        let usuario = await Usuario.busqueda({
            usuario : req.body.usuario
        });

        //#region [Validaciones]
        if( !usuario.length ) {
            return crearRespuesta(2,res,"Usuario no encontrado", 301);
        }

        if(decodeData(usuario[0].contra) !== req.body.contra){
            return crearRespuesta(2,res,"La contraseña es incorrecta", 301);
        }
        //#endregion

        var token = jwt.sign(
            {
                id_usuario : usuario[0].id_usuario,
                usuario : usuario[0].usuario
            },
            'secretfortoken',
            { expiresIn : '1h'}
        );
        return crearRespuesta(1,res,{ token : token, id_usuario : usuario[0].id_usuario} ,200);
    }
}

module.exports = new MainController;