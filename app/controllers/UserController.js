var Usuario = require('../models/UsuarioModel');
const HttpException = require('../utils/HttpException.utils');

const dotenv = require("dotenv");
dotenv.config();

class UserController {

    main = async (req, res, next) => {
        res.send("Entro");
    }

    obtenerUsuarios = async (req, res, next)  => {
        let usuarios = await Usuario.busqueda();
        if( !usuarios.length ) {
            throw new HttpException(404, 'Users not found');
        }

        res.send(usuarios);
    }
}

module.exports = new UserController;