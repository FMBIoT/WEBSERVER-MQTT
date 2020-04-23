/*
========================================
            CLIENTE MQTT
========================================

DESCRIPCION: 
    Cliente js encargado de la conexión con el broker y de la creación de las imágenes
    a partir del mensaje recibido.
*/


const mqtt = require('mqtt');

const fs = require('fs');

let caFile = fs.readFileSync("C:/Users/Francisco/Desktop/TFG/webserverTFG/mqtt/ca.crt");

let topic_list = ["ETSIT", "casaAlumno", "agora"];

// Declaración de las opciones de conexión

let options = {
    port: 8883,
    clientId: "FMBIoT",
    username: 'tfg',
    password: '46132',
    clean: true,
    ca: caFile, //Uso del certificado Ca para establecer la conexión mediante TLS
    rejectUnauthorized: false, //No se tiene en cuenta el nombre del dominio en el certificado TLS.

};

// Conexión al servidor

let client = mqtt.connect("mqtts://192.168.1.132", options);


//Suscripción a los topics

console.log("suscribiendose a los topics");

client.subscribe(topic_list, { qos: 1 }); //topic list


//Función llamada cuando se produce la conexión.

client.on("connect", function() {

    console.log("connected  " + client.connected);

})

//Obtención de los mensajes 

client.on('message', function(topic, message, packet) {

    let file_name = `${topic}.jpg`
    let url = 'C:/Users/Francisco/Desktop/TFG/webserverTFG/public/assets/img/'

    fs.writeFile(`${url}${file_name}`, message, function(err) {
        if (err) throw err;
        console.log('Saved!');
    });

});


//Obtención de los errores

client.on("error", function(error) {

    console.log("Can't connect" + error);

});