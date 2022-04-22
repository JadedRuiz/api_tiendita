const rutas = require("express").Router();
const UserController = require("../app/controllers/UserController");
//Rutas
rutas.get('/', UserController.main);

module.exports = rutas;