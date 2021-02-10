// final project oh man here we go boys

let theProjectiles = [];
let playerx;
let playery;
let squareSize = 50;
let playerdx = 7.5;

function setup() {
  let myCanvas = createCanvas(windowWidth*0.8, windowHeight*0.8);
  myCanvas.position(windowWidth*0.1, windowHeight*0.1);
  playerx = width/2;
  playery = height/2;
  window.setInterval(spawnProjectile, 1000);
}

function draw() {
  background(220);
  displayPlayer();
  movePlayer();
  for (i=theProjectiles.length-1; i>=0; i--) {
    if (theProjectiles[i].isDead) {
      theProjectiles.splice(i, 1);
    }
    else {
      theProjectiles[i].move();
      theProjectiles[i].display();
    }
  }
}

function displayPlayer() {
  fill("blue");
  square(playerx, playery, squareSize);
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
    this.isDead = false;
  }
  
  move() {
    if (this.y -= this.radius > 0) {
      this.y += this.dy;
    }
    else if (this.isAlive) {
      this.isAlive = false;
      this.isDead = true;
    }
  }

  display() {
    if (this.isAlive) {
      fill(this.theColor);
      ellipse(this.x, this.y, this.radius*2, this.radius*2);
    }
  }
}
