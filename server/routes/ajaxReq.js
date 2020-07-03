/* 
==========================
    PETICIONES AJAX
==========================
 
 DESCRIPCION:
  Peticiones desde el frontend al backend para llevar a cabo el proceso 
  de refrescar la imagen cada cierto tiempo predeterminado.

  */


const express = require('express');
const app = express();
const fs = require('fs');

// GET IMÁGENES ETSIT
// Si existe la imagen se envia un json con la url versionada para evitar el caché, si no existe se envia la imagen de notFound.

app.get('/etsitFoto', (req, res) => {


    fs.stat('./public/assets/img/ETSIT.jpg', function(err) {

        if (!err) {

            res.json(

                {

                    url: './assets/img/ETSIT.jpg?' + (new Date()).getTime()

                }

            );

        } else if (err.code === 'ENOENT') {
            return res.send(

                {

                    url: './assets/img/notFound.jpg'

                }

            );
        }
    });


});


// GET IMÁGENES CASA DEL ALUMNO

app.get('/casaAlumFoto', (req, res) => {


    fs.stat('./public/assets/img/casaAlumno.jpg', function(err) {

        if (!err) {
            return res.send(

                {

                    url: './assets/img/casaAlumno.jpg?' + (new Date()).getTime()

                }

            );

        } else if (err.code === 'ENOENT') {
            return res.send(

                {

                    url: './assets/img/notFound.jpg?' + (new Date()).getTime()

                }

            );
        }
    });


});

// GET IMÁGENES AGORA

app.get('/agoraFoto', (req, res) => {

    fs.stat('./public/assets/img/agora.jpg', function(err) {

        if (!err) {
            return res.send(

                {

                    url: './assets/img/agora.jpg?' + (new Date()).getTime()

                }

            );

        } else if (err.code === 'ENOENT') {
            return res.send(

                {

                    url: './assets/img/notFound.jpg'

                }

            );
        }
    });


});


//Exportar modulo app

module.exports = app;
