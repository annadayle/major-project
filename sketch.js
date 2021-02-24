// final project oh man here we go boys

let theProjectiles = [];
let playerx;
let playery;
let playerWidSize = 50;
let playerHeiSize = 50;
let playerdx = 9.5;
let screen = 0;
let groundX;
let groundY;
let groundWidth;
let groundHeight;
let projImg;
let bgImg;
let titleScreen;
let score = 0;

function preload() {
  projImg = loadImage("assets/apple.png");
  bgImg = loadImage("assets/bg.png");
  titleScreen = loadImage("assets/titleScr.PNG");
}

function setup() {
  let myCanvas = createCanvas(windowWidth*0.8, windowHeight*0.8);
  myCanvas.position(windowWidth*0.1, windowHeight*0.1);
  playerx = width*0.8;
  playery = height*0.65;
  groundX = width*0.8;
  groundY = height*0.95;
  groundWidth = width*2;
  groundHeight = height/2;
  window.setInterval(spawnProjectile, 1500);
}

function draw() {
  if (screen === 0) {
    startScreen();
  }
  else {
  background(bgImg);
  displayGround();
  displayPlayer();
  displayScore();
  movePlayer();
  for (i=theProjectiles.length-1; i>=0; i--) {
    if (theProjectiles[i].isAlive) {
      theProjectiles[i].move();
      theProjectiles[i].display();
      theProjectiles[i].dead();
      if (collideRectRect(playerx, playery, playerWidSize, playerHeiSize, theProjectiles[i].x, theProjectiles[i].y, theProjectiles[i].radius, theProjectiles[i].radius)) {
        score = score + 1;
        theProjectiles[i].isAlive = false;
      }
    }
    else {
      theProjectiles.splice(i, 1);
    }
  }
  // collison window detection
  if (playerx < 0) {
    playerx = playerx + 15;
  }
  if (playerx > width) {
    playerx = playerx - 15;
  }
}
}

function startScreen() {
  background(titleScreen);
}

function mousePressed() {
  console.log(playerx, playery);
  if (screen === 0) {
    screen = screen + 1;
  }
}

function displayPlayer() {
  fill("blue");
  rect(playerx, playery, playerWidSize, playerHeiSize);
}

function displayGround() {
  rectMode(CENTER);
  noStroke();
  if (score <= 4) {
    fill("pink");
  }
  else if (score >= 5 && score < 10) {
    fill("green");
  }
  else if (score >= 10 && score < 15) {
    fill("orange");
  }
  else if (score === 15) {
    score = 0;
  }
  rect(groundX, groundY, groundWidth, groundHeight);
}

function displayScore() {
  textAlign(CENTER);
  fill("black");
  text("Score: " + score, width/12, height/12);
}

function movePlayer() {
  if (keyIsDown(LEFT_ARROW)) {
    playerx -= playerdx;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    playerx += playerdx;
  }
}

function spawnProjectile() {
  let someProjectile = new Projectile();
  theProjectiles.push(someProjectile);
}

class Projectile {
  constructor () {
    this.x = random(width);
    this.y = height - 800;
    this.dy = 5;
    this.radius = 60;
    this.isAlive = true;
  }
  
  move() {
    if (this.isAlive) {
      this.y += this.dy;
    }
  }

  display() {
    if (this.isAlive) {
      image(projImg, this.x, this.y, this.radius, this.radius);
    }
  }

  dead() {
    if (this.y + this.radius >= groundHeight*1.5) {
      this.isAlive = false;
    }
  }
}
