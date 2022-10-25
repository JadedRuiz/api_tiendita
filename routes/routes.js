const rutas = require("express").Router();
const { routes } = require("..");
const MainController = require("../app/controllers/MainController");
const Auth = require('../app/middleware/Auth');


//#region [Rutas Generales]

rutas.post('/login', MainController.login);
rutas.post('/getCatalogo', Auth, MainController.getCatalogo);
//#endregion


module.exports = rutas;