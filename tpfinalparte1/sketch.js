let currentScreen = 1;
let images = {};


function preload() {
    images[1] = loadImage("images/imagen1.png");
    images[2] = loadImage("images/imagen2.jpeg");
    images[3] = loadImage("images/imagen3.jpeg");
    images[4] = loadImage("images/imagen4.png");
    images[5] = loadImage("images/imagen5.jpeg");
    images[6] = loadImage("images/imagen6.jpeg");
    images[7] = loadImage("images/imagen7.jpeg");
    images[8] = loadImage("images/imagen8.jpg");
    images[9] = loadImage("images/imagen9(final1).png");
    images[10] = loadImage("images/imagen10.jpg");
    images[11] = loadImage("images/imagen11.jpg");
    images[12] = loadImage("images/imagen12.png");
    images[13] = loadImage("images/imagen13.jpg");
    images[14] = loadImage("images/imagen14.jpg");
    images[15] = loadImage("images/imagen15.jpg");
    images[16] = loadImage("images/imagen16.jpg");
    images[17] = loadImage("images/imagen17.jpg");
    images[18] = loadImage("images/imagen18.jpg");
    images[19] = loadImage("images/imagen19.jpg");
    images[20] = loadImage("images/imagen20.png");
}

function setup() {
    let canvas = createCanvas(640, 480);
    canvas.parent("canvas-container");
    displayScreen();

}

function displayScreen() {
    clear();
    background(0);

    // Mostrar la imagen en la esquina superior izquierda del canvas, si existe
    if (images[currentScreen]) {
        image(images[currentScreen], 0, 0, 640, 480);
    }

    // Mostrar fondo para el texto
    displayTextBackground();

    // Mostrar texto de la pantalla actual
    displayText();

    // Remover todos los botones anteriores
    removeElements();

    // Determinar qué botones mostrar
    if (currentScreen === 6 || currentScreen === 16) {
        createDecisionButtons();
    } else if (currentScreen === 9 || currentScreen === 18 || currentScreen === 20) {
        createEndButtons();
    } else if (currentScreen === 21) {
        createRestartButton();
    } else {
        createNextButton(getNextScreen(currentScreen));
    }
}

// Función para mostrar el fondo negro del texto sin cubrir los botones
function displayTextBackground() {
    fill(0, 150); // Color negro con transparencia
    noStroke();
    rect(20, 20, 600, 80, 10); // Rectángulo negro en la parte superior
}

// Función para mostrar el texto en la pantalla actual con una tipografía gruesa
function displayText() {
    fill(255); // Texto blanco
    textSize(16);
    textStyle(BOLD); // Estilo de texto en negrita
    textAlign(LEFT, TOP);
    textWrap(WORD);

    let textContent = ""; // Variable para el contenido del texto

    // Asignar el texto según la pantalla actual
    if (currentScreen === 1) {
        textContent = "Eres un programador de día y un hacker por las noches. Sabes que algo no anda bien, pero no logras entenderlo completamente.";
    } else if (currentScreen === 2) {
        textContent = "Pronto recibirás un mensaje y deberás tomar una decisión que puede cambiar el rumbo de tu vida. Elige bien.";
    } else if (currentScreen === 3) {
        textContent = "Sigue al conejo blanco... y descubrirás la verdad. Elige bien, porque tu vida nunca volverá a ser la misma.";
    } else if (currentScreen === 4) {
        textContent = "La Matrix es una prisión para tu mente. Tienes dos opciones, Neo. Puedes elegir saber la verdad o seguir viviendo la mentira.";
    } else if (currentScreen === 5) {
        textContent = "Bienvenido a tu despertar, Neo. Estás a punto de tomar la decisión más importante de tu vida. Cuidado.";
    } else if (currentScreen === 6) {
        textContent = "Toma la píldora azul y todo acabará. Despertarás en tu cama y seguirás creyendo lo que quieras. Toma la píldora roja, y te mostraré que tan profunda es la madriguera del conejo.";
    } else if (currentScreen === 7) {
        textContent = "Elegiste la píldora roja, esperamos que haya sido la decisión correcta...";
    } else if (currentScreen === 8) {
        textContent = "Elegiste la pastilla azul, esperamos que haya sido la decisión correcta...";
    } else if (currentScreen === 9) {
        textContent = "Despiertas en tu cama, creyendo que todo fue solo una fantasía. Tu vida sigue como antes, pero la inquietante sensación de que algo no está bien persiste en el fondo de tu mente...";
    } else if (currentScreen === 10) {
        textContent = "Bienvenido al mundo real, Neo. Ahora ves lo que realmente es la Matrix. Las máquinas nos han mantenido prisioneros... pero estamos luchando para liberar nuestras mentes.";
    } else if (currentScreen === 11) {
        textContent = "Dentro de la Matrix, las reglas pueden ser alteradas, incluso rotas. Pero no todos pueden hacerlo. Morfeo cree que eres el Elegido, pero tú todavía dudas.";
    } else if (currentScreen === 12) {
        textContent = "No todos creen en la lucha. Cypher está cansado de la guerra y ha hecho un trato con las máquinas. Tu equipo ha sido traicionado, y ahora los agentes están tras ustedes.";
    } else if (currentScreen === 13) {
        textContent = "Morfeo ha sido capturado. Los agentes lo torturan, buscando los secretos de la resistencia. ¿Te atreves a enfrentarlos?";
    } else if (currentScreen === 14) {
        textContent = "Morfeo arriesgó su vida por ti. Ahora, tú debes decidir si arriesgas la tuya por él. Pero sabes que los agentes son poderosos... ¿Puedes derrotarlos?";
    } else if (currentScreen === 15) {
        textContent = "Estás demostrando ser fiel a tu bando, pero.... será capaz de continuar así?";
    } else if (currentScreen === 16) {
        textContent = "Smith está frente a ti, una manifestación del poder de la Matrix. Si eres realmente el Elegido, esta es tu oportunidad para probarlo. Si no... este será tu fin." ; "debes elegir, peleas y demuestras tu lealtad o te retiras de la contienda?" ;
    } else if (currentScreen === 17) {
        textContent = "Te enfrentas a Smith y, en medio de la batalla, descubres tu verdadero poder. Las balas se detienen en el aire y finalmente destruyes a Smith. Ahora sabes que eres el Elegido.";
    } else if (currentScreen === 18) {
        textContent = "felicidades no solo mostraste ser el elegido sino que además salvaste a morfeo y mostraste tu lealtad, felicidades Neo.";
    } else if (currentScreen === 19) {
        textContent = "Eliges huir. Dejas a Morfeo en manos de los agentes, y la resistencia pierde a su líder. La guerra sigue, pero sin esperanza. Tal vez nunca fuiste el Elegido...";
    } else if (currentScreen === 20) {
        textContent = "haz demostrado una cobardía que jamás tendría el Elegido, el título te queda grande, adiós Neo.";
    } else if (currentScreen === 21) {
        textContent = "Este trabajo practico esta hecho por Bianca Teresa Vogliolo, de la comision 3. Inspirado en la pelicula Matrix 1";
    }

    // Mostrar el texto dentro del rectángulo negro
    text(textContent, 30, 30, 580, 60); // Coordenadas y tamaño de área de texto dentro del rectángulo
}

function getNextScreen(screen) {
    switch (screen) {
        case 1: return 2;
        case 2: return 3;
        case 3: return 4;
        case 4: return 5;
        case 5: return 6;
        case 7: return 10;
        case 8: return 9;
        case 9: return 11;
        case 10: return 11;
        case 11: return 12;
        case 12: return 13;
        case 13: return 14;
        case 14: return 15;
        case 15: return 16;
        case 17: return 18;
        case 19: return 20;
        default: return 1;
    }
}

function createNextButton(nextScreen) {
    let button = createButton("Siguiente");
    button.mousePressed(() => {
        currentScreen = nextScreen;
        displayScreen();
    });
    button.position(540, 440); // Posicionar el botón en la esquina inferior derecha del canvas
}

function createDecisionButtons() {
    let buttonLeft, buttonRight;

    if (currentScreen === 6) {
        buttonLeft = createButton("Azul");
        buttonLeft.mousePressed(() => {
            currentScreen = 8;
            displayScreen();
        });
        buttonLeft.position(100, 440); // Posición izquierda dentro de 640x480

        buttonRight = createButton("Rojo");
        buttonRight.mousePressed(() => {
            currentScreen = 7;
            displayScreen();
        });
        buttonRight.position(380, 440); // Posición derecha dentro de 640x480
    } else if (currentScreen === 16) {
        buttonLeft = createButton("Pelear");
        buttonLeft.mousePressed(() => {
            currentScreen = 17;
            displayScreen();
        });
        buttonLeft.position(100, 440);

        buttonRight = createButton("No Pelear");
        buttonRight.mousePressed(() => {
            currentScreen = 19;
            displayScreen();
        });
        buttonRight.position(380, 440);
    }
}

function createEndButtons() {
    let restartButton = createButton("Reiniciar");
    restartButton.mousePressed(() => {
        currentScreen = 1;
        displayScreen();
    });
    restartButton.position(200, 440); // Centrado dentro de 640x480

    let creditsButton = createButton("Créditos");
    creditsButton.mousePressed(() => {
        currentScreen = 21;
        displayScreen();
    });
    creditsButton.position(340, 440); // Centrado dentro de 640x480
}

function createRestartButton() {
    let restartButton = createButton("Reiniciar");
    restartButton.mousePressed(() => {
        currentScreen = 1;
        displayScreen();
    });
    restartButton.position(290, 440); // Centrado dentro de 640x480
}

















 






