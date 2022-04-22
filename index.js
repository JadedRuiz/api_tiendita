const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use('/api',require('./routes/rutas'));

app.listen(process.env.PORT || 3300, (error) => {
    if(error){
        console.log("Ha ocurrido un error :" + error);
    }else{
        console.log("Servidor corriendo en puerto 3300");
    }
});

module.exports = app;