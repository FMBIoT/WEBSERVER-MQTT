// Petición ajax get genérica

function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.addEventListener("load", function() {
        if (req.status >= 200 && req.status < 400) {

            callback(this.responseText);

        } else {
            console.error(req.status + " " + req.statusText);

        }
    });

    req.addEventListener("error", function() {
        console.error("Error de red");
    });
    req.send(null);
}