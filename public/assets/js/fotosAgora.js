/* 
============================
    GET FOTOS AGORA
============================

DESCRIPCION:
    Petición a nuestro localhost para obtención de imágenes cada cierto intervalo de tiempo.
*/

setInterval(() => {
    $.ajax({
        url: '/agoraFoto',
        success: function(respuesta) {
            miImagen(respuesta);
        },
        error: function() {
            console.log("No se ha podido obtener la información");
        }
    });
}, 6000);