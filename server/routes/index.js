// =============================
//          INDEXACION 
// =============================


const express = require('express');
const app = express();

app.use(require('./ajaxReq'));
app.use(require('./frontend'));


module.exports = app;