const Sequelize = require('sequelize');
const db = require('../../config/db_connect');

const Inventario = db.define('inventarios', {
    id_inventario : {
        type : Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_producto : {
        type : Sequelize.INTEGER
    },
    stock_minimo : {
        type : Sequelize.INTEGER,
        allowNull: false
    },
    stock_max : {
        type : Sequelize.INTEGER,
        allowNull: false
    },
    fecha_surtido : {
        type : Sequelize.DATE,
    },
    fecha_creacion : {
        type : Sequelize.DATE,
    },
    fecha_modificacion : {
        type : Sequelize.DATE,
    },
    usuario_creacion : {
        type : Sequelize.INTEGER
    },
    usuario_modificacion : {
        type : Sequelize.INTEGER
    },
    activo : {
        type : Sequelize.INTEGER(1)
    }
},
{
    timestamps: false
});

module.exports = Inventario;