const express = require('express');

const app = express();
const hbs = require('hbs');
const path = require('path');
const { PythonShell } = require('python-Shell');
// new PythonShell('C:/Users/Francisco/Desktop/TFG/MQTT-PHYTON/cliente_mqtt.py');


require('../hbs/helpers');

const port = process.env.PORT || 3000;


// Habilitar la carpeta public

app.use(express.static(path.resolve(__dirname, '../public')));

app.use((req, res, next) => {
    res.setHeader('Expires', '-1');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});
//Express hbs

hbs.registerPartials(path.resolve(__dirname, '../views/parciales'));


app.set('view engine', 'hbs');


//Configuracion global de rutas

app.use(require('./routes/index'));



app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${port}`);
});