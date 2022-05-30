const Sequelize = require('sequelize');
const db = require('../../config/db_connect');

const Foto = db.define('cat_fotografias', {
    id_foto : {
        type : Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    url_foto : {
        type : Sequelize.STRING(100),
        allowNull: false
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

module.exports = Foto;