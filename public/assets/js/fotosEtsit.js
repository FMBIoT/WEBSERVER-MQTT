// ============================
// GET FOTOS DE BACKEND
// ============================

//Petición a nuestro localhost para obtención de imágenes cada cierto intervalo de tiempo.
let primeraVez = true;


setInterval(() => {
    ajaxGet("/etsitFoto", function(respuesta) {

            let imgJSON = JSON.parse(respuesta);

            if (primeraVez == true) {

                let imgElt = document.createElement("img");

                imgElt.className = 'img-thumbnail';

                imgElt.src = imgJSON.url;

                document.getElementById("imagenes").appendChild(imgElt);

                primeraVez = false;

                oldChild = imgElt;

            } else {

                let imgElt = document.createElement("img");

                imgElt.className = 'img-thumbnail';

                imgElt.src = imgJSON.url;

                document.getElementById("imagenes").replaceChild(imgElt, oldChild);

                oldChild = imgElt;

            }

        }

    )
}, 6000);