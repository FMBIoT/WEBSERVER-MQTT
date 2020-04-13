// ==========================
//      PETICIONES AJAX
// ==========================


const express = require('express');
const app = express();
const fs = require('fs');

// GET IMÁGENES ETSIT
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

app.get('/agoraFoto', (req, res) => {

    fs.stat('./public/assets/img/agora.jpg', function(err) {

        if (!err) {
            return res.send(

                {

                    url: './assets/img/agora.jpg'

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




module.exports = app;