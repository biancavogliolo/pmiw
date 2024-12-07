//trabajo hecho por bianca vogliolo, comision 3
//46201410
//link al video explicativo: https://youtu.be/9jO6maHrBi0

/*Ahora solo se declaran 3 funciones globales: una clase principal que contiene todo, el canvas y 
la imagen del jugador.*/
let principal;
let canvas;
let imagenJugador;

function preload() {
  /*Decile al profe que si no se cargaba la imagen con un preload no se mostraba en la clase juego,
  que trataste de cargarlo con una funcion de carga en la clase jugador pero no se veia la imagen
   y no sabias donde estaba el jugador.*/
  imagenJugador = loadImage("images/neoesquivandobalas.png");
}

function setup() {
  canvas = createCanvas(640, 480);
  canvas.parent("juego-container");
  //Se llama a una clase principal que va a contener todo, asi el setup se despeja
  principal = new Principal();
}

function draw() {
  //Se dibuja la clase Principal
  principal.mostrar();
}

function keyPressed() {
  //se llama a la funcion de teclas que esta dentro de la clase principal
  principal.teclas();
}
///////////////////   <- Estos son para separar clases, no son necesarios pero a mi me facilitan la lectura.
class Principal {
  constructor() {
    /*Cada estado se llama como un objeto nuevo (clase), la unica que cambio a groso modo es Juego, 
    el resto solo dibujan cosas.*/
    this.instrucciones = new mostrarInstrucciones();
    this.juego = new mostrarJuego();
    this.ganaste = new mostrarPantallaGanaste();
    this.perdiste = new mostrarPantallaPerdiste();
    this.creditos = new mostrarCreditos();
    this.pantallaActual = "instrucciones";
  }

  mostrar() {
    /*Todavia funciona x estados y cada estado llama algo diferente, solo q ahora llama a clases y no a
     funciones globales.*/
    if (this.pantallaActual === "instrucciones") {
      this.instrucciones.mostrar(); /*el .mostrar() es para que se vea lo que la clase dibuja, llama a la
       funcion de mostrar de la clase (en este caso) instrucciones.*/
    } else if (this.pantallaActual === "juego") {
      /*OJO el (this) de juego es para que principal entienda lo que juego le esta diciendo, en la clase 
      juego lo explico mejor*/
      this.juego.mostrar(this);
    } else if (this.pantallaActual === "ganaste") {
      this.ganaste.mostrar();
    } else if (this.pantallaActual === "perdiste") {
      this.perdiste.mostrar();
    } else if (this.pantallaActual === "creditos") {
      this.creditos.mostrar();
    }
  }

  teclas() {
    //Funcion de teclas de teclado, se llaman en function keyPressed.
    if (this.pantallaActual === "instrucciones" && key === " ") {
      this.pantallaActual = "juego";
    } else if (
      this.pantallaActual === "ganaste" ||
      this.pantallaActual === "perdiste" ||
      this.pantallaActual === "creditos"
    ) {
      if (key === "R" || key === "r") {
        this.juego.reiniciarJuego(); /*Pasa lo mismo que con el .mostrar(), llama a una funcion de reinicio
         que esta dentro de la clase juego.*/
        this.pantallaActual = "instrucciones";
      } else if (key === "C" || key === "c") {
        this.pantallaActual = "creditos";
      }
    }
  }
}
///////////////////
class mostrarInstrucciones {
  mostrar() {
    background(0);
    textSize(20);
    textAlign(CENTER);
    fill(255);
    text("Instrucciones del juego:", width / 2, height / 2 - 40);
    text(
      "Evita los obstáculos y sobrevive 15 segundos.",
      width / 2,
      height / 2
    );
    text(
      "Presiona la barra espaciadora para comenzar",
      width / 2,
      height / 2 + 40
    );
  }
}
///////////////////
class mostrarPantallaGanaste {
  mostrar() {
    background(0, 255, 0);
    fill(0);
    textSize(32);
    textAlign(CENTER);
    text(
      "Haz demostrado ser el elegido, \n felicidades Neo",
      width / 2,
      height / 2 - 40
    );
    textSize(20);
    text(
      "Presiona 'R' para reiniciar o 'C' para ver los créditos",
      width / 2,
      height / 2 + 40
    );
  }
}
///////////////////
class mostrarPantallaPerdiste {
  mostrar() {
    background(255, 0, 0);
    fill(255);
    textSize(32);
    textAlign(CENTER);
    text(
      "Ups! no pudiste esquivar las balas,\n quiza no eras el elegido",
      width / 2,
      height / 2 - 40
    );
    textSize(20);
    text(
      "Presiona 'R' para reiniciar o 'C' para ver los créditos",
      width / 2,
      height / 2 + 40
    );
  }
}
///////////////////
class mostrarCreditos {
  mostrar() {
    background(0);
    fill(255);
    textSize(32);
    textAlign(CENTER);
    text("Gracias por jugar", width / 2, height / 2 - 40);
    textSize(20);
    text("Desarrollado por Bianca Vogliolo", width / 2, height / 2);
    text("Presiona 'R' para reiniciar el juego", width / 2, height / 2 + 40);
  }
}
///////////////////
class mostrarJuego {
  constructor() {
    this.jugador = new Jugador();
    this.obstaculos = [];
    this.tiempoRestante = 15;

    for (let i = 0; i < 3; i++) {
      this.obstaculos.push(new Obstaculo());
    }
  }

  mostrar(pantalla) {
    /*OJO se escribe (pantalla) xq asi se comunica con principal, al escribir this.juego.mostrar(this) 
    en principal el this(este) se refiere a la clase principal. Dentro de esta clase pantalla se usa 
    para cambiar los estados de pantalla en principal. */
    background(150);
    this.jugador.mostrar();
    this.jugador.mover();

    for (let i = 0; i < 3; i++) {
      this.obstaculos[i].mostrar();
      this.obstaculos[i].mover();
      /*Llamado a la colicion con jugador, la funcion de colision ahora esta dentro del obstaculo y llama a 
      Jugador desde la clase Juego.*/
      this.obstaculos[i].colision(this.jugador);
    }

    //Dibuja tiempo
    textSize(16);
    fill(255);
    text("Tiempo:", width - 100, 30);
    text(this.tiempoRestante, width - 50, 30);

    // Descuenta tiempo
    if (pantalla.pantallaActual === "juego") {
      if (frameCount % 60 === 0 && this.tiempoRestante > 0) {
        // Divide los frames, cada 60 cuadros/frames (aprox 1 seg) resta 1 a tiempoRestante
        this.tiempoRestante--;
      }
    }

    // Condicion Perder
    if (this.jugador.vida <= 0) {
      pantalla.pantallaActual = "perdiste";
    } /*Para esto es q se llama a (pantalla) en el inicio de mostrar, pantalla va a ser (this) cuando se
    dibuje juego.mostrar en principal, entonces ahora la clase principal sabe que cuando juego dice  
    pantalla.pantallaActual = "perdiste" sabe que tiene que cambiar a estado perdiste solo cuando la vida
    del jugador sea 0.*/

    //Condicion Ganar, funciona similar a la clase perder.
    if (this.tiempoRestante <= 0) {
      pantalla.pantallaActual = "ganaste";
    }
  }

  reiniciarJuego() {
    /*Funcion de reinicio, son solo los valores de inicio del juego. Se llama en la funcion de teclas
    de principal y solo si se esta en cualquier otro estado y si se apreta R/r */
    this.jugador = new Jugador();
    this.obstaculos = [];
    this.tiempoRestante = 15;

    for (let i = 0; i < 3; i++) {
      this.obstaculos.push(new Obstaculo());
    }

    this.jugador.vida = 1; //Devuelve el contador de vidas de jugador a 1.
  }
}
///////////////////////////
class Jugador {
  constructor() {
    this.imagenJugador =
      imagenJugador; /*El preload del principio se lo vuelve a llamar acá, a pesar de ser
    global solo se usa en Jugador*/
    this.x = width / 2;
    this.y = height - 120;
    this.tamano = 30;
    this.alto = 120;
    this.ancho =
      (this.imagenJugador.width / this.imagenJugador.height) * this.alto; // Mantener la proporción

    this.vida = 1; // Unica vida del jugador.
  }

  mostrar() {
    image(this.imagenJugador, this.x, this.y, this.ancho, this.alto);
  }

  restarVida() {
    this.vida -= 1;
  } /*Funcion que si se la llama solo le resta 1 vida al jugador*/

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
///////////////////
class Obstaculo {
  constructor() {
    this.x = random(width - 20);
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

  //Detecta colision con jugador
  /*La colision funciona similar, si el area del jugador entra en contacto con el area del obstaculo 
  se llama a restarVida de la clase jugador, entonces el jugador pierde su unica vida y
  pierde (valga la redundandcia).*/
  colision(jugador) {
    if (
      jugador.x + jugador.ancho > this.x &&
      jugador.x < this.x + this.tamano &&
      jugador.y + jugador.alto > this.y &&
      jugador.y < this.y + this.tamano
    ) {
      jugador.restarVida();
    }
  }
}
