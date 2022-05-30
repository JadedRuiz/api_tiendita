const rutas = require("express").Router();
const UserController = require("../app/controllers/UserController");
const Auth = require('../app/middleware/Auth');

//#region [Rutas del Usuario]
rutas.post('/obtenerUsuarioPorId', Auth, UserController.obtenerUsuario);
rutas.post('/obtenerPerfilPorId', Auth, UserController.obtenerUsuarioPerfil);
rutas.get('/obtenerUsuarios', Auth, UserController.obtenerUsuarios);
rutas.post('/altaUsuario', Auth, UserController.altaUsuario);
rutas.post('/modUsuario', Auth, UserController.modUsuario);
//#endregion

module.exports = rutas;