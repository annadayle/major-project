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
let playImg;
let basketImg;
let groundImg;
let titleScreen;
let score = 0;
let playButtonX;
let playButtonY;
let pixelFont;
let lives = 3;

function preload() {
  projImg = loadImage("assets/apple.png");
  bgImg = loadImage("assets/newBg.png");
  titleScreen = loadImage("assets/titleScr.PNG");
  playImg = loadImage("assets/playbutton.png");
  basketImg = loadImage("assets/basket.PNG");
  groundImg = loadImage("assets/grass.PNG");
  pixelFont = loadFont("assets/pixelText.ttf");
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
  playButtonX = width*0.75;
  playButtonY = height*0.25;
  window.setInterval(spawnProjectile, 1500);
}

function draw() {
  if (screen === 0) {
    startScreen();
    displayPlayButton();
  }
  else if (screen === 1 && score < 20 && lives != 0){
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
else if (screen === 1 && score === 20) {
  background(bgImg);
  displayWin();
  displayPlayButton();
}

else if (screen === 1 && lives === 0) {
  background(bgImg);
  displayLoose();
  displayPlayButton();
}
}

function startScreen() {
  background(titleScreen);
}

function mousePressed() {
  console.log(playerx, playery);
  if (screen === 0 && mouseX > playButtonX && mouseX < playButtonX * 250 && mouseY > playButtonY && mouseY < playButtonY * 100) {
    screen = screen + 1;
  }
  else if (screen === 1 && score === 20 && mouseX > playButtonX && mouseX < playButtonX * 250 && mouseY > playButtonY && mouseY < playButtonY * 100) {
    score = 0;
    lives = 3;
  }
  else if (screen === 1 && score < 20 && lives === 0 && mouseX > playButtonX && mouseX < playButtonX * 250 && mouseY > playButtonY && mouseY < playButtonY * 100) {
    score = 0;
    lives = 3;
  }
}

function displayPlayButton() {
  image(playImg, playButtonX, playButtonY, 250, 100);
}

function displayPlayer() {
  fill("blue");
  image(basketImg, playerx, playery, playerWidSize, playerHeiSize);
}

function displayGround() {
  rectMode(CENTER);
  noStroke();
  fill("orange");
  rect(groundX, groundY, groundWidth, groundHeight);
}

function displayScore() {
  textFont(pixelFont);
  textAlign(CENTER);
  fill("white");
  text("Score: " + score, width/12, height/12);
  text("Lives: " + lives, width/12, height/9);
  text("Use right and left arrow keys to move", width/5, height/6);
}

function movePlayer() {
 if (score < 20) {
  if (keyIsDown(LEFT_ARROW)) {
    playerx -= playerdx;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    playerx += playerdx;
  }
  if (keyIsDown(UP_ARROW)) { //cheat code, lets you get 20 apples (aka the winning score) automatically by pressing the up arrow
    score = 20;
  }
}
}

function displayWin() {
  textFont(pixelFont);
  textAlign(CENTER);
  fill("white");
  text("You won! Click to play again", width/7, height/9);
}

function displayLoose() {
  textFont(pixelFont);
  textAlign(CENTER);
  fill("white");
  text("You lost, click to play again", width/7, height/9);
}

function spawnProjectile() {
if (score < 20){ 
  let someProjectile = new Projectile();
  theProjectiles.push(someProjectile);
}
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
      lives = lives - 1;
      this.isAlive = false;
    }
  }
}
