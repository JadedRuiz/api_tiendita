const query = require('../../config/conexion');
const { multipleColumnSet } = require('../utils/Common.utils');

class UsuarioModel {

    tableName = "cat_usuarios";

    busqueda = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;
        
        if(!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params);
        sql += ` WHERE ${columnSet}`;
        
        return await query(sql, [...values]);
    }

    buscarPerfiles = async(params = {}) => {
        let sql = `SELECT nombre, descripcion, activo FROM cat_perfiles`;

        if(!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params);
        sql += ` WHERE ${columnSet}`;
        
        return await query(sql, [...values]);
    }

    crear = async ({ id_perfil, usuario, contra, nombre, fecha_creacion = new Date(), usuario_creacion = 1, activo = 1}) => {
        let sql = `INSERT INTO ${this.tableName}
        (id_perfil, usuario, contra, nombre, fecha_creacion, usuario_creacion, activo) VALUES (?,?,?,?,?,?,?)`;

        const result = await query(sql,[id_perfil,usuario,contra,nombre,fecha_creacion,usuario_creacion,activo]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    actualizar = async(params, id_usuario) => {
        const { columnSet, values } = multipleColumnSet(params);

        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id_usuario = ?`;
        
        const result = await query(sql, [...values, id_usuario]);

        return result;
    }
}

module.exports = new UsuarioModel;