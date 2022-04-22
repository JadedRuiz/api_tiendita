const query = require('../../config/conexion');

class UserModel {

    tableName = "cat_usuario";

    busqueda = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;
        
        if(!Object.keys(params).length) {
            return await query(sql);
        }
    }
}

module.exports = new UserModel;