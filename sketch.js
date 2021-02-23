// final project oh man here we go boys

let theProjectiles = [];
let playerx;
let playery;
let squareSize = 50;
let playerdx = 7.5;
let screen = 0;
let groundX;
let groundY;
let groundWidth;
let groundHeight;
let projImg;
let bgImg;

function preload() {
  projImg = loadImage("assets/apple.png");
  bgImg = loadImage("assets/bg.png");
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
  movePlayer();
  for (i=theProjectiles.length-1; i>=0; i--) {
    if (theProjectiles[i].isAlive) {
      theProjectiles[i].move();
      theProjectiles[i].display();
      theProjectiles[i].dead();
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
  background(150);
  fill(255);
  textAlign(CENTER);
  text("Some Platformer Thing", width/2, height/2);
  text("Click on the screen to start", width/2, height/2 + 30);
}

function mousePressed() {
  if (screen === 0) {
    screen = screen + 1;
  }
}

function displayPlayer() {
  fill("blue");
  rect(playerx, playery, squareSize, squareSize);
}

function displayGround() {
  rectMode(CENTER);
  fill("brown");
  rect(groundX, groundY, groundWidth, groundHeight);
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
    this.theColor = "red";
    this.radius = 20;
    this.isAlive = true;
  }
  
  move() {
    if (this.isAlive) {
      this.y += this.dy;
    }
  }

  display() {
    if (this.isAlive) {
      fill(this.theColor);
      ellipse(this.x, this.y, this.radius*2, this.radius*2);
    }
  }

  dead() {
    if (this.y + this.radius >= groundHeight*1.5) {
      this.isAlive = false;
    }
  }

}
