// final project oh man here we go boys

let playerx;
let playery;
let squareSize = 50;
let speed = 7.5;

function setup() {
  let myCanvas = createCanvas(windowWidth*0.8, windowHeight*0.8);
  myCanvas.position(windowWidth*0.1, windowHeight*0.1);
  playerx = width/2;
  playery = height/2;
}

function draw() {
  background(220);
  displayPlayer();
  movePlayer();
}

function displayPlayer() {
  fill("blue");
  square(playerx, playery, squareSize);
}

function movePlayer() {
  if (keyIsDown(LEFT_ARROW)) {
    playerx -= speed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    playerx += speed;
  }
}


