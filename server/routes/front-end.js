// ==========================
//         FRONT-END
// ==========================


const express = require('express');
const app = express();


// GET HOME


app.get('/', (req, res) => {

    return res.render('home', {
        nombre: "paco",
    });

});



//   GET PÁGINA DE LA ETSIT


app.get('/Etsit', (req, res) => {

    return res.render('ETSIT');

});



//   GET PÁGINA DE LA CASA DEL ALUMNO

app.get('/casaAlum', (req, res) => {

    return res.render('CASAALUM');

});



//   GET PÁGINA DE LA CASA DEL AGORA

app.get('/Agora', (req, res) => {

    return res.render('AGORA');

});




module.exports = app;