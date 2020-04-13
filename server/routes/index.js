// =============================
//          INDEXACION 
// =============================


const express = require('express');
const app = express();


app.use(require('./ajaxreq'));
app.use(require('./front-end'));


module.exports = app;