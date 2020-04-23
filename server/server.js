/* ===================================
              SERVIDOR WEB
   ===================================
 
 DESCRIPCION:
  Archivo js donde se lleva a cabo el proceso de lanzar el servidor web 
  y todas sus funciones complementarias.

  */

const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');

require('../hbs/helpers');

require('../mqtt/mqtt');

const port = process.env.PORT || 3000;


// Habilitar la carpeta public

app.use(express.static(path.resolve(__dirname, '../public')));


//Express hbs

hbs.registerPartials(path.resolve(__dirname, '../views/parciales'));


app.set('view engine', 'hbs');


//Configuracion global de rutas

app.use(require('./routes/index'));


// Escuchar peticiones al servidor web

app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${port}`);
});