//vogliolo bianca
//comision 3
//link al video de youtube: https://youtu.be/ij1AiYXx0nc

let d; // Variable para almacenar la imagen

// Variables para definir la cantidad de elementos y colores
let cant = 800;
let bgColor = 0;
let colorChange = false;
let rotationAngle = 0; // Ángulo de rotación

function preload() {
  // Cargamos la imagen desde la carpeta "libraries"
  d = loadImage("libraries/ilusion.png");
}

function setup() {
  // Establecemos el tamaño de la ventana
  createCanvas(800, 400);

  // Redimensionamos la imagen a 400x400 píxeles
  d.resize(400, 400);
}

function draw() {
  // Trasladamos el origen de coordenadas a (400, 0)
  translate(400, 0);

  // Establecemos el color de fondo
  background(bgColor);

  // Si el ratón está presionado
  if (mouseIsPressed) {
    colorChange = true;
    // Modificar el color de fondo con el mouse
    let mx = map(mouseX, 0, width, 0, 255);
    let my = map(mouseY, 0, height, 0, 255);
    bgColor = color(mx, 0, my);
    rotationAngle += 0.05; // Incrementar el ángulo de rotación
  } else {
    colorChange = false;
    bgColor = 0; // Vuelve el fondo a negro cuando no se presiona el mouse
    rotationAngle = 0; // Restablecer el ángulo de rotación
  }

  // Dibujamos rectángulos y rombos con estructuras repetitivas
  dibujarRectangulos();
  dibujarRombos();

  // Dibujamos un rectángulo blanco a la izquierda de la pantalla
  fill(255);
  rect(-400, 0, 400, 400);

  // Dibujamos la imagen en la posición (-400, 0)
  image(d, -400, 0, 400, 400);
}

// Función para dibujar rectángulos en filas alternas
function dibujarRectangulos() {
  for (let i = 0; i < 4; i++) {
    for (let x = (i % 2 === 0 ? 10 : -20); x < cant; x += 20) {
      fill(255); // Blanco
      rect(x, i * 100, 10, 100);
    }
  }
}

// Función para dibujar rombos
function dibujarRombos() {
  for (let x = -280; x < cant; x += 140) {
    for (let y = -280; y < cant; y += 140) {
      rombo(x, y, 70, 70);
    }
  }
  for (let x = -350; x < cant; x += 140) {
    for (let y = -210; y < cant; y += 140) {
      rombo(x, y, 70, 70);
    }
  }
}

// Función para dibujar un rombo
function rombo(x, y, a, l) {
  let tam = 70;
  let g = 10;
  push();
  rectMode(CENTER);
  translate(x, y); // Trasladamos el origen de coordenadas al centro del rombo
  rotate(radians(45) + rotationAngle); // Añadimos el ángulo de rotación
  fill(255); // Blanco para el rombo principal
  rect(0, 0, a, l);
  for (let i = -20; i <= 20; i += 10) {
    if (colorChange) {
      fill(i % 20 === 0 ? 0 : randomColor());
    } else {
      fill(i % 20 === 0 ? 0 : 255); // Blanco y negro
    }
    rect(0, i, tam, g);
  }
  pop();
}

// Función para generar un color aleatorio
function randomColor() {
  return color(random(255), random(255), random(255));
}

// Función para reiniciar el programa
function keyPressed() {
  if (key === 'r' || key === 'R') {
    bgColor = 0;
  }
}
