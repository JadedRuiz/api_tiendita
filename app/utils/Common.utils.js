const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();
const Foto = require('../models/Foto');

exports.multipleColumnSet = (object) => {
    if (typeof object !== 'object') {
        throw new Error('Invalid input');
    }

    const keys = Object.keys(object);
    const values = Object.values(object);

    columnSet = keys.map(key => `${key} = ?`).join(', ');

    return {
        columnSet,
        values
    }
}

exports.encodeData = (code) => {
    if(typeof code !== 'string') {
        throw new Error('Invalid input');
    }
    
    let rand = between(3,9);
    let base_64 =  Buffer.from(code).toString('base64');
    let cabecera = base_64.substring(0,3);
    let cola = base_64.substring(3,base_64.length);
    for(let r=0;r<rand; r++){
        cabecera = Buffer.from(cabecera).toString('base64');
    }
    let longitud = cabecera.length+"";
    let cabecera_cola = cola.substring(0,cola.length-1);
    let cola_cola = cola.substring(cola.length-1,cola.length);
    let longitud_1er = longitud.substring(0,1);
    let longitud_2do = longitud.substring(longitud.length,1);
    let letras = convert1toInvers(longitud_1er) + convert1toInvers(longitud_2do);
    let letra_rand = convertAto1(rand);
    return letra_rand+cabecera+cabecera_cola+letras+cola_cola;
}

exports.decodeData = (code) => {
    let ultimoCharacter = code.substring(code.length-1,code.length);
    let restante = code.substring(0,code.length-1);
    let digitos = restante.substring(code.length-3,code.length);
    let longitud = convert1toInvers(digitos[0]) + "" +convert1toInvers(digitos[1]);
    let iteraciones = code.substring(0,1);
    let ite=  convertAto1(iteraciones)+"";
    let descrypt =  code.substring(0,parseInt(longitud)+1);
    descrypt = descrypt.substring(1,descrypt.length);
    let cola = code.substring(0,code.length-3);
    cola = cola.substring(parseInt(longitud)+1,cola.length);
    for(let i=0; i<ite; i++){
            descrypt = Buffer.from(descrypt, 'base64').toString();
    }
    let resu = descrypt+cola+ultimoCharacter;
    return Buffer.from(resu, 'base64').toString();
}

exports.crearRespuesta = (tipo, res, data, status) => {

    if(typeof tipo !== 'number') {
        throw new Error('Invalid input');
    }

    if(typeof status !== 'number') {
        throw new Error('Invalid input');
    }

    if(tipo == 1){
        return res.status(status).send({ ok : true, data : data });
    }else{
        return res.status(status).send({ ok : false, message : data});
    }
}

function convertAto1(num){
    if(!isNaN(num)){
        switch(num) {
            case 3: return "e";
                    break;
            case 4: return "A";
                    break;
            case 5: return "r";
                    break;
            case 6: return "M";
                    break;
            case 7: return "z";
                    break;
            case 8: return "L";
                    break;
            case 9: return "S";
                    break; 
        }
    }else{
        switch(num) {
            case "e": return 3;
                    break;
            case "A": return 4;
                    break;
            case "r": return 5;
                    break;
            case "M": return 6;
                    break;
            case "z": return 7;
                    break;
            case "L": return 8;
                    break;
            case "S": return 9;
                    break;
                    
        }
    }
}

function convert1toInvers(num){
    if(!isNaN(num)){
        switch(num) {
            case '0': return "z";
                    break;
            case '1': return "Y";
                    break;
            case '2': return "x";
                    break;
            case '3': return "W";
                    break;
            case '4': return "v";
                    break;
            case '5': return "U";
                    break;
            case '6': return "t";
                    break;
            case '7': return "S";
                    break;
            case '8': return "r";
                    break;
            case '9': return "Q";
                    break;
                    
        }
    }else{
        switch(num) {
            case "z": return 0;
                    break;
            case "Y": return 1;
                    break;
            case "x": return 2;
                    break;
            case "W": return 3;
                    break;
            case "v": return 4;
                    break;
            case "U": return 5;
                    break;
            case "t": return 6;
                    break;
            case "S": return 7;
                    break;
            case "r": return 8;
                    break;
            case "Q": return 9;
                    break;
        }
    }
}

function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
}

exports.subirFoto = async (data, nombre, usuario) => {
    const fecha = new Date();
    const Foto = require('../models/Foto');
    var path = "";
    var path_s = "";
    if(data.data != "" && data.extension != ""){
        path = "./public/Productos/"+nombre+"."+data.extension;
        path_s = "Productos/"+nombre+"."+data.extension;
        const file = Buffer.from(data.data, 'base64').toString('binary');
        fs.writeFile(path, file, "binary", function(err) {
            return { "ok" : false, "message" : "error al cargar la foto" }
        });
    }
    
    const foto = await Foto.create({
        url_foto : path_s,
        fecha_creacion : fecha,
        usuario_creacion : usuario,
        activo : 1
    });
    return { ok : true, data : foto.id_foto }

}

exports.getURLFoto = async (id_foto) => {
    const resp = await Foto.findAll({
        attributes : ['url_foto'],
        where: {
          id_foto: id_foto
        }
    });
    if(resp){
        if(resp[0].url_foto != ""){
            return process.env.URLBASE+resp[0].url_foto;
        }
    }
    return "";
}