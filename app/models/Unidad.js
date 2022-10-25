const Sequelize = require('sequelize');
const db = require('../../config/db_connect');

const Unidad = db.define('cat_unidades', {
    id_unidad : {
        type : Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre : {
        type : Sequelize.STRING(150),
        allowNull: false
    },
    abrev : {
        type : Sequelize.STRING(10),
        allowNull: false
    },
    clave_sat : {
        type : Sequelize.STRING(10)
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

module.exports = Unidad;