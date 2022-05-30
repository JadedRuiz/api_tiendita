const Sequelize = require('sequelize');
const db = require('../../config/db_connect');

const Producto = db.define('cat_productos', {
    id_producto : {
        type : Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_categoria : {
        type : Sequelize.INTEGER,
        allowNull: false
    },
    id_foto : {
        type : Sequelize.INTEGER,
    },
    id_estatus : {
        type : Sequelize.INTEGER
    },
    codigo : {
        type : Sequelize.STRING(50),
        allowNull: false
    },
    producto : {
        type : Sequelize.STRING(350),
        allowNull: false
    },
    descripcion : {
        type : Sequelize.STRING(500)
    },
    precio : {
        type : Sequelize.DOUBLE,
        allowNull: false
    },
    stock : {
        type : Sequelize.DOUBLE,
        allowNull : false
    },
    unidad_medida : {
        type : Sequelize.INTEGER,
        allowNull : false,
    },
    tiene_caducidad : {
        type : Sequelize.INTEGER(1),
    },
    fecha_caducidad : {
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

module.exports = Producto;