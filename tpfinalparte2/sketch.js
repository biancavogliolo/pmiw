//trabajo hecho por bianca vogliolo, comision 3
//46201410
//link al video explicativo: https://youtu.be/9jO6maHrBi0

let pantallaActual = 'instrucciones';
let jugador;
let obstaculos = [];
let tiempoRestante = 15;
let temporizador;
let imagenJugador;
let canvas;

function preload() {
    imagenJugador = loadImage('images/neoesquivandobalas.png');  // Cargar la imagen del jugador
}

function setup() {
    canvas = createCanvas(640, 480);
    canvas.parent("juego-container");
    jugador = new Jugador();
    // Crear los obstáculos
    for (let i = 0; i < 3; i++) {
        obstaculos.push(new Obstaculo());
    }
}

function draw() {
    background(0);

    if (pantallaActual === 'instrucciones') {
        mostrarInstrucciones();
    } else if (pantallaActual === 'juego') {
        mostrarJuego();
    } else if (pantallaActual === 'ganaste') {
        mostrarPantallaGanaste();
    } else if (pantallaActual === 'perdiste') {
        mostrarPantallaPerdiste();
    } else if (pantallaActual === 'creditos') {
        mostrarCreditos();
    }
}

function mostrarInstrucciones() {
    textSize(20);
    textAlign(CENTER);
    fill(255);
    text("Instrucciones del juego:", width / 2, height / 2 - 40);
    text("Evita los obstáculos y sobrevive 15 segundos.", width / 2, height / 2);
    text("Presiona la barra espaciadora para comenzar", width / 2, height / 2 + 40);
}

function mostrarJuego() {
    // Mostrar y mover al jugador
    jugador.mostrar();
    jugador.mover();

    // Mostrar y mover los obstáculos
    for (let i = 0; i < obstaculos.length; i++) {
        obstaculos[i].mostrar();
        obstaculos[i].mover();

        // Detectar colisiones con el jugador
        if (colision(jugador, obstaculos[i])) {
            pantallaActual = 'perdiste';
            clearInterval(temporizador);
        }
    }

    // Mostrar el temporizador
    textSize(16);
    fill(255);
    text(`Tiempo: ${tiempoRestante}`, width - 100, 30);

    // Actualizar el temporizador
    if (tiempoRestante <= 0) {
        pantallaActual = 'ganaste';
        clearInterval(temporizador);
    }
}

function mostrarPantallaGanaste() {
    background(0, 255, 0);
    fill(0);
    textSize(32);
    textAlign(CENTER);
    text("haz demostrado ser el elegido, felicidades Neo", width / 2, height / 2 - 40);
    textSize(20);
    text("Presiona 'R' para reiniciar o 'C' para ver los créditos", width / 2, height / 2 + 40);
}

function mostrarPantallaPerdiste() {
    background(255, 0, 0);
    fill(255);
    textSize(32);
    textAlign(CENTER);
    text("ups! no pudiste esquivar las balas,\n quiza no eras el elegido", width / 2, height / 2 - 40);
    textSize(20);
    text("Presiona 'R' para reiniciar o 'C' para ver los créditos", width / 2, height / 2 + 40);
}

function mostrarCreditos() {
    background(0);
    fill(255);
    textSize(32);
    textAlign(CENTER);
    text("gracias por jugar", width / 2, height / 2 - 40);
    textSize(20);
    text("Desarrollado por Bianca Vogliolo", width / 2, height / 2);
    text("Presiona 'R' para reiniciar el juego", width / 2, height / 2 + 40);
}

function keyPressed() {
    if (pantallaActual === 'instrucciones' && key === ' ') {
        pantallaActual = 'juego';
        // Iniciar el temporizador al comenzar el juego
        temporizador = setInterval(() => {
            tiempoRestante--;
        }, 1000);
    }
    
    // Reiniciar el juego si presionas 'R'
    if (key === 'R' || key === 'r') {
        reiniciarJuego();
    }

    // Ir a la pantalla de créditos si presionas 'C'
    if (key === 'C' || key === 'c') {
        pantallaActual = 'creditos';
    }
}

function reiniciarJuego() {
    tiempoRestante = 15;
    jugador = new Jugador();
    obstaculos = [];
    for (let i = 0; i < 3; i++) {
        obstaculos.push(new Obstaculo());
    }
    pantallaActual = 'instrucciones';
}

// Función de colisión
function colision(jugador, obstaculo) {
    // Revisar si el jugador toca el obstáculo, considerando el tamaño del jugador y el obstáculo
    let jugadorLeft = jugador.x;
    let jugadorRight = jugador.x + jugador.ancho;
    let jugadorTop = jugador.y;
    let jugadorBottom = jugador.y + jugador.alto;

    let obstaculoLeft = obstaculo.x;
    let obstaculoRight = obstaculo.x + obstaculo.tamano;
    let obstaculoTop = obstaculo.y;
    let obstaculoBottom = obstaculo.y + obstaculo.tamano;

    return !(jugadorRight < obstaculoLeft || jugadorLeft > obstaculoRight || jugadorBottom < obstaculoTop || jugadorTop > obstaculoBottom);
}

class Jugador {
    constructor() {
        this.x = width / 2;
        this.y = height - 120;  // Ajustar para que la imagen esté más cerca de la parte inferior
        this.tamano = 30;
        this.alto = 120;  // Aumentar el alto de la imagen
        this.ancho = (imagenJugador.width / imagenJugador.height) * this.alto;  // Mantener la proporción
    }

    mostrar() {
        image(imagenJugador, this.x, this.y, this.ancho, this.alto);
    }

    mover() {
        if (keyIsDown(LEFT_ARROW) && this.x > 0) {
            this.x -= 5;
        }
        if (keyIsDown(RIGHT_ARROW) && this.x < width - this.ancho) {
            this.x += 5;
        }
        if (keyIsDown(UP_ARROW) && this.y > 0) {
            this.y -= 5;
        }
        if (keyIsDown(DOWN_ARROW) && this.y < height - this.alto) {
            this.y += 5;
        }
    }
}

class Obstaculo {
    constructor() {
        this.x = random(width);
        this.y = 0;
        this.tamano = 20;
        this.velocidad = 3;
    }

    mostrar() {
        fill(255, 0, 0);
        rect(this.x, this.y, this.tamano, this.tamano);
    }

    mover() {
        this.y += this.velocidad;
        if (this.y > height) {
            this.y = 0;
            this.x = random(width);
        }
    }
}
















