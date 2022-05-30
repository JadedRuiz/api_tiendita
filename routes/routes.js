const rutas = require("express").Router();
const { routes } = require("..");
const MainController = require("../app/controllers/MainController");
const ProductoController = require("../app/controllers/ProductoController");
//#region [Rutas Generales]

rutas.post('/login', MainController.login);
//#endregion


module.exports = rutas;