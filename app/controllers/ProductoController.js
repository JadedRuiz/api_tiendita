const { body } = require('express-validator');
const Producto = require('../models/Producto');
const Inventario = require('../models/Inventario');
const { crearRespuesta } = require('../utils/Common.utils');
const { subirFoto, getURLFoto } = require('../utils/Common.utils');
const Foto = require('../models/Foto');


class ProductoController {
    
    obtenerProductos = async (req, res, next) => {
      const resp = await Producto.findAll({
          limit: 10
        });
        if(resp){
          let respa= [];
          for await (let row of resp){
            respa.push({
              'id_producto' : row.id_producto,
              'id_categoria' : row.id_categoria,
              'id_foto' : row.id_foto,
              'url_foto' : await getURLFoto(row.id_foto),
              'id_estatus' : row.id_estatus,
              'codigo' : row.codigo,
              'producto' : row.producto,
              'descripcion' : row.descripcion,
              'precio' : row.precio,
              'stock' : row.stock,
              'unidad_medida' : row.unidad_medida,
              'tiene_caducidad' : row.tiene_caducidad,
              'fecha_caducidad' : row.fecha_caducidad,
              'fecha_creacion' : row.fecha_creacion,
              'activo' : row.activo
            })
          }
          return crearRespuesta(1,res,respa,200);
        }
          return crearRespuesta(2,res,"No se ha encontrado productos",200);
    }

    obtenerProductosPorId = async (req, res, next) => {
        Producto.hasMany(Foto, {foreignKey: 'id_foto'});
        const resp = await Producto.findAll({
            attributes : ['id_producto','id_categoria','id_foto','id_estatus','codigo','descripcion',
            'precio','stock','unidad_medida','tiene_caducidad','fecha_caducidad','fecha_creacion','activo'],
            include: [
              {
                model: Foto,
                attributes : ['url_foto'],
                required: true
              },
            ],
          });
          if(resp){
            return crearRespuesta(1,res,resp,200);
          }
          return crearRespuesta(2,res,"No se ha encontrado productos",200);
    }

    altaProducto = async (req, res, next) => {
        try{
            const validar = await Producto.findAll({
                where: {
                  codigo: req.body.producto.codigo
                }
            });
            if(validar.length > 0){
              return crearRespuesta(2,res,"Este folio ya se encuentra en uso",200);
            }
            const data = await subirFoto(req.body.foto,req.body.producto.codigo, req.body.producto.usuario_c);
            let id_foto = 0;
            if(data.ok){
                req.body.producto.id_foto = data.data;
            }
            const producto = await Producto.create(req.body.producto);
            if(req.body.inventariar){
                req.body.inventario.id_producto = producto.id_producto;
                await Inventario.create(req.body.inventario);
            }
            return crearRespuesta(1,res,"Producto almacenado con éxito",200);
        } catch (err) {
            return crearRespuesta(2,res,"Error al guardar el producto",200);
            err.statusCode = 500;
            throw err;
        }
    }
  
}
module.exports = new ProductoController;