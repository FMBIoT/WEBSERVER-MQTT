# SERVIDOR WEB-MQTT(NODE)

Este proyecto fin de grado se basa en un servidor web encargado de la recepción y visualización de las imágenes obtenidas mediante el protocolo MQTT. Los mensajes recibidos por el cliente MQTT.js son las imágenes obtenidas por medio de varios ESP32 equipados con una cámara y conectados a un broker mediante TLS.
## Comenzando 🚀

Para realizar una copia de este proyecto basta con la descarga del zip o clonando el repositorio

```
$ git clone https://github.com/FMBIoT/WEBSERVER-MQTT.git
```


### Pre-requisitos 📋

Para poder llevar a cabo el funcionamiento del servidor es necesario tener instalado Node.js, el cual se puede descargar en este enlace, donde unicamente hay que elegir el sistema operativo que queramos.

```
https://nodejs.org/es/download/
```



## Ejecutando las pruebas ⚙️

Para poder probar el programa se debe abrir una ventana del CLI y introducir

```
node server/server
```

Finalmente podremos visualizar la aplicación web escribiendo en nuestro navegador

```
http://localhost:3000/
```

## Construido con 🛠️


* [Node](https://nodejs.org/en/docs/) - El entorno de programación usado
* [Handlebars](https://handlebarsjs.com/) - El template engine usado
* [Express](https://expressjs.com/) - El framework web usado


## Autores ✒️

* **Francisco Mahedero Biot** - *Trabajo Fin de grado* - [FMBIoT](https://github.com/FMBIoT)


<!-- ## Agradecimientos 🎁

* Gracias a todas las personas que me han ayudado para finalizar este trabajo❤️ -->

