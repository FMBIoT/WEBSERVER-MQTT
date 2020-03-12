const http = require('http');


http.createServer((req, resp) => {

        resp.writeHead(200, { 'Content-Type': 'application/json' });

        let salida = {
            nombre: 'paco',
            edad: 32,
            url: req.url
        }
        resp.write(JSON.stringify(salida));
        // resp.write('Hola mundo');
        resp.end();

    })
    .listen(8080);

console.log('Escuchando el puerto 8080');