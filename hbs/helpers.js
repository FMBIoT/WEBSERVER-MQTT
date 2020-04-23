const hbs = require('hbs');

//helper para obtener el año de forma automática

hbs.registerHelper('getAnio', () => {
    return new Date().getFullYear();
});