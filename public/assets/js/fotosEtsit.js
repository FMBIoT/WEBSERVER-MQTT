/* 
============================
    GET FOTOS ETSIT
============================

DESCRIPCION:
    Petición a nuestro localhost para obtención de imágenes cada cierto intervalo de tiempo.
*/



setInterval(() => {
    $.ajax({
        url: '/etsitFoto',
        success: function(respuesta) {
            miImagen(respuesta);
        },
        error: function() {
            console.log("No se ha podido obtener la información");
        }
    });
}, 6000);