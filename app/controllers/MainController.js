const HttpException = require('../utils/HttpException.utils');
var Usuario = require('../models/UsuarioModel');
var Unidad = require('../models/Unidad');
const { crearRespuesta, decodeData } = require('../utils/Common.utils');
const jwt = require('jsonwebtoken');
const db = require('../../config/db_connect');

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

    getCatalogo = (req, res, next) => {
        let seletcs ="*";
        if(req.body.select.length != 0){
            seletcs ="";
            req.body.select.forEach( (element, index) => {
                index+1 == req.body.select.length ? seletcs += element : seletcs += element+", ";
            });
        }
        db.query(`SELECT ${seletcs} FROM ${req.body.table} WHERE activo = 1`, { replacements : [1], type: db.QueryTypes.SELECT})
        .then(query => {
            // We don't need spread here, since only the results will be returned for select queries
            return crearRespuesta(1,res,query,200);
        });
    }
}

module.exports = new MainController;