// ==============================
//      FUNCION CREAR IMAGEN
// ==============================


let primeraVez = true;


function miImagen(respuesta) {

    if (primeraVez == true) {

        let imgElt = document.createElement("img");

        imgElt.className = 'img-thumbnail';

        imgElt.src = respuesta.url;

        document.getElementById("imagenes").appendChild(imgElt);

        primeraVez = false;

        oldChild = imgElt;

    } else {

        let imgElt = document.createElement("img");

        imgElt.className = 'img-thumbnail';

        imgElt.src = respuesta.url;

        document.getElementById("imagenes").replaceChild(imgElt, oldChild);

        oldChild = imgElt;

    }

}