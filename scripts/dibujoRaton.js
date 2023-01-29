let elDibujo = document.getElementById("area_de_dibujo");
let papel = elDibujo.getContext("2d");

papel.fillStyle = "white";
papel.fillRect(0, 0, elDibujo.width, elDibujo.height);

var color = "black";
var grosor = 3;
let xant = 0, yant = 0, xact = 0, yact = 0;

const xreal = (clientX) => clientX - elDibujo.getBoundingClientRect().left;
const yreal = (clientY) => clientY - elDibujo.getBoundingClientRect().top;

let mousePulsado = false;

elDibujo.addEventListener("mousedown", dibujarRaton => {
    xant = xact;
    yant = yact;
    xact = xreal(dibujarRaton.clientX);
    yact = yreal(dibujarRaton.clientY);
    papel.beginPath();
    papel.fillStyle = color;
    papel.fillRect(xact, yact, grosor, grosor);
    papel.closePath();
    mousePulsado = true;
});

elDibujo.addEventListener("mousemove", (dibujarRaton) => {
    if (!mousePulsado) {
        return;
    }
    xant = xact;
    yant = yact;
    xact = xreal(dibujarRaton.clientX);
    yact = yreal(dibujarRaton.clientY);
    papel.beginPath();
    papel.strokeStyle = color;
    papel.lineWidth = grosor;
    papel.moveTo(xant, yant);
    papel.lineTo(xact, yact);
    papel.stroke();
    papel.closePath();
});

["mouseup", "mouseout"].forEach(evento => {
    elDibujo.addEventListener(evento, () => {
        mousePulsado = false;
    });
});

function defColor(c) {
    color = c;
};

function defGrosor(g) {
    grosor = g;
};

function descargar() {
    var filename = prompt("Guardar como...", "Nombre de archivo");
    if (elDibujo.msToBlob) {
        var blob = elDibujo.msToBlob();
        window.navigator.msSaveBlob(blob, filename + ".png")
    } else {
        link = document.getElementById("download");
        link.href = elDibujo.toDataURL("image/png");
        link.download = filename;
    }
}

function borrar() {
    papel.fillStyle = "white";
    papel.fillRect(0, 0, elDibujo.width, elDibujo.height);
}