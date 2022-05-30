const rutas = require("express").Router();
const ProductoController = require("../app/controllers/ProductoController");
const Auth = require('../app/middleware/Auth');

//#region [Rutas del Usuario]
rutas.post('/obtenerProductos',Auth, ProductoController.obtenerProductos);
rutas.post('/altaProducto', Auth, ProductoController.altaProducto);

module.exports = rutas;