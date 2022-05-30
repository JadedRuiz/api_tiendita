var Usuario = require('../models/UsuarioModel');
const HttpException = require('../utils/HttpException.utils');
const { crearRespuesta } = require('../utils/Common.utils');
const { encodeData } = require('../utils/Common.utils');


const dotenv = require("dotenv");
const UsuarioModel = require('../models/UsuarioModel');
dotenv.config();

class UserController {

    obtenerUsuarios = async (req, res, next)  => {
        let usuarios = await Usuario.busqueda();
        if( !usuarios.length ) {
            crearRespuesta(2,res,"Usuarios no encontrados", 301);
        }

        crearRespuesta(1,res,usuarios,200);
    }

    obtenerUsuario = async (req, res, next) => {
        let usuario = await Usuario.busqueda(req.body);

        if( !usuario.length ) {
            crearRespuesta(2,res,"Usuario no encontrado", 301);
        }

        crearRespuesta(1,res,usuario[0],200);
    }

    obtenerUsuarioPerfil = async(req, res, next) => {
        let perfil = await Usuario.buscarPerfiles(req.body);

        if( !perfil.length ) {
            crearRespuesta(2,res,"Perfil no encontrado", 301);
        }

        crearRespuesta(1,res,perfil[0],200);
    }

    altaUsuario = async (req, res, next) => {
        let usuarios = await Usuario.busqueda({
            usuario : req.body.usuario
        });

        //#region [Validaciones]

        if( typeof req.body.id_perfil !== 'number' && req.body.id_perfil !== 0){
            crearRespuesta(2,res,"El id_perfil no ha sido brindado o no es de tipo 'number'", 301);
        }

        if( req.body.usuario == "" ){
            crearRespuesta(2,res,"No se ha brindado el nombre de usuario", 301);
        }
        if( req.body.contra == "" ){
            crearRespuesta(2,res,"No se ha brindado la contraseña", 301);
        }
        
        if( req.body.nombre == "" ){
            crearRespuesta(2,res,"No se ha brindado el nombre", 301);
        }

        if( usuarios.length ) {
            crearRespuesta(2,res,"Este nombre de usuario ya ha sido registrado", 301);
        }
        //#endregion
        
        req.body.contra = encodeData(req.body.contra);
        const result = await UsuarioModel.crear(req.body);

        if(!result){
            crearRespuesta(2,res,"Ha ocurrido un error al momento de guardar en la BD", 301);
        }

        //Almecenar foto
        crearRespuesta(1,res,"El usuario ha sido creado exitosamente",200);
    }

    modUsuario = async (req, res, next) => {
        if(req.body.datos.usuario != undefined){
            let usuarios = await Usuario.busqueda({
                usuario : req.body.datos.usuario
            });
        }
        
        
        //#region [Validaciones]
        if( req.body.datos.id_perfil !== undefined && typeof req.body.datos.id_perfil !== 'number' && req.body.id_perfil !== 0){
            crearRespuesta(2,res,"El id_perfil no ha sido brindado o no es de tipo 'number'", 301);
        }

        if( req.body.datos.usuario !== undefined && req.body.datos.usuario == "" ){
            crearRespuesta(2,res,"No se ha brindado el nombre de usuario", 301);
        }
        if( req.body.datos.contra !== undefined && req.body.datos.contra == "" ){
            crearRespuesta(2,res,"No se ha brindado la contraseña", 301);
        }
        
        if( req.body.datos.nombre !== undefined && req.body.datos.nombre == "" ){
            crearRespuesta(2,res,"No se ha brindado el nombre", 301);
        }

        if( req.body.datos.usuario !== undefined && usuarios.length ) {
            crearRespuesta(2,res,"Este nombre de usuario ya ha sido registrado", 301);
        }
        //#endregion
        
        req.body.datos.contra = encodeData(req.body.datos.contra);
        let result = await UsuarioModel.actualizar(req.body.datos,req.body.id_usuario);

        if (!result) {
            crearRespuesta(2,res,"Ha ocurrido un error al momento de guardar en la BD", 301);
        }
        const { affectedRows, changedRows, info } = result;

        !affectedRows ? crearRespuesta(2,res,"No se ha encontrado el usuario",301) :
            affectedRows && changedRows ? crearRespuesta(1,res,"El usuario ha sido actualizado",200) : crearRespuesta(2,res,"No se han realizado modificaciones",301);
    }
}

module.exports = new UserController;