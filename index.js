const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

//#region  BaseDatos
    const db = require("./config/db_connect");
    db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' +err))
//#endregion

//#region CROSS CONFIG
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Methods',
            'GET, POST, PUT, DELETE, OPTIONS'
        );
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Content-Type, Accept, X-Custom-Header, Authorization'
        );
        if (req.method === 'OPTIONS') {
            return res.status(200).end();
        }
        next();
    });
//#endregion

//#region ROUTES
    app.use('/api',require('./routes/routes'));
    app.use('/api/user',require('./routes/user.routes'));
    app.use('/api/product',require('./routes/products.routes'));
    app.use(express.static('public'));
//#endregion

app.listen(process.env.PORT || 3300, (error) => {
    if(error){
        console.log("Ha ocurrido un error :" + error);
    }else{
        console.log("Servidor corriendo en puerto 3300");
    }
});


module.exports = app;