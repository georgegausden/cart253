"use strict";

/**************************************************
Project 1
George Gausden

Here is a description of this template p5 project.
**************************************************/
//create the javascript objects and the variables in the program

//setup the initial state as the title

let score = 0;

let state = "title";

let lighten = 50;

let livesi = 5;
let lives = undefined;

let heart;

//how curved our buttons are
let buttonCurvature = 50;

let sounds = {
  explosion: undefined,
  click: undefined,
  levelUp: undefined,
  backgroundMusic: undefined,
}

//create the user character as a circle to start with
let user = {
  x: undefined,
  y: undefined,
  vx: 0,
  vy: 0,
  ax: 0.2,
  maxSpeed: 4,
  maxAcceleration: 3,
  size: 40,
  vi: 0,
};

let object = {
  xi: undefined,
  yi: undefined,
  x: undefined,
  y: undefined,
  vxi: -2,
  vx: undefined,
  vy: 0,
  sizei: 20,
  size: undefined,
}

//preload our images and sounds for the program
function preload(){
  sounds.explosion = loadSound('assets/sounds/explosion.mov');
  sounds.click = loadSound('assets/sounds/click.mov');
  sounds.levelUp = loadSound('assets/sounds/levelUp.mov');
  sounds.backgroundMusic = loadSound('assets/sounds/backgroundMusic.mov');
  heart = loadImage('assets/images/heart.png');

}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(600, 600);
  user.x = width / 4;
  user.y = height / 2;
  object.xi = width;
  object.yi = height / 2;
  object.x = object.xi;
  object.y = object.yi;
  object.vx = object.vxi;
  object.size = object.sizei;
  lives = livesi;
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(140,200,200);
  //setup the title, simulation and end states
  if (state === "title") {
    title();
  } else if (state === "instructions") {
    instructions();
  } else if (state === "simulation") {
    simulation();
  }
  else if (state === "lostLifeScreen"){
    lostLifeScreen();
  }
  else if (state === "end") {
    end();
  }
}

//create the title function
function title() {

  noStroke();

  let instructionsButton = {
    text: "Instructions",
    x: width/4,
    y: height/2,
    width: 200,
    height: 100,
    fill: {
      r: 200,
      g: 200,
      b: 250,
    }

  }
  let playButton = {
    text: "Play",
    x: 3*width/4,
    y: height/2,
    width: 200,
    height: 100,
    fill: {
      r: 200,
      g: 200,
      b: 250,
    }
  }

  let gameTitle = {
    text: "Welcome to the game",
    x: width/2,
    y: height/2 - 200,
    fill: {
      r:200,
      g:100,
      b:255
    }
  }
  rectMode(CENTER);

  push();
  textSize(32);
  fill(gameTitle.fill.r, gameTitle.fill.g, gameTitle.fill.b);
  textAlign(CENTER, CENTER);
  text(gameTitle.text, gameTitle.x, gameTitle.y);
  pop();

  //create the options of either playing or clicking the instructions page
  push();
  //make the boxes light up if the mouse is hovering over
  lightenButton(instructionsButton.x, instructionsButton.y, instructionsButton.width, instructionsButton.height, instructionsButton.fill.r, instructionsButton.fill.g, instructionsButton.fill.b);
  rect(instructionsButton.x, instructionsButton.y, instructionsButton.width,instructionsButton.height,buttonCurvature);
  pop();

  push();
  lightenButton(playButton.x, playButton.y, playButton.width, playButton.height, playButton.fill.r, playButton.fill.g, playButton.fill.b);
  rect(playButton.x,playButton.y,playButton.width,playButton.height,buttonCurvature);
  pop();


  //would you like to play
  push();
  textSize(32);
  fill(100,100,255);
  textAlign(CENTER, CENTER);
  text("Instructions", instructionsButton.x, instructionsButton.y);
  pop();

  //play game
  push();
  textSize(32);
  fill(100, 100, 255);
  textAlign(CENTER, CENTER);
  text("Play", playButton.x, playButton.y);
  pop();

  //let the user click
  if (checkInButton(instructionsButton.x, instructionsButton.y, instructionsButton.width, instructionsButton.height)){
    state = "instructions";
    sounds.click.play();
  }
  else if (checkInButton(playButton.x, playButton.y, playButton.width,playButton.height)){
    state = "simulation";
    sounds.click.play();
  }
}

//create an instructions page for the user to understand the game
function instructions() {
  let backToMenu = {
    x: width/2,
    y: height/2+200,
    width: 200,
    height: 100,
    fill: {
      r: 200,
      g: 200,
      b: 250,
    }
  }

  let instructionsText = {
    text: "To play, use 'A' and 'D'\n to move left and right\n and 'W' and 'S' to move up and down",
    x: width/2,
    y: height/2 -150,
    fill: {
      r: 100,
      g: 100,
      b: 255
    },
    fontSize: 32
  }

  let backToMenuText = {
    text: "Back to menu",
    x: backToMenu.x,
    y: backToMenu.y,
    fill: {
      r: 100,
      g: 100,
      b: 255
    },
    fontSize: 25
  }

  push();
  textSize(instructionsText.fontSize);
  fill(instructionsText.fill.r, instructionsText.fill.g, instructionsText.fill.b);
  textAlign(CENTER, CENTER);
  text(instructionsText.text, instructionsText.x, instructionsText.y);
  pop();

  push();
  fill(backToMenu.fill.r,backToMenu.fill.g,backToMenu.fill.b);
  rectMode(CENTER);
  lightenButton(backToMenu.x, backToMenu.y, backToMenu.width, backToMenu.height, backToMenu.fill.r, backToMenu.fill.g, backToMenu.fill.b);
  rect(backToMenu.x, backToMenu.y, backToMenu.width, backToMenu.height,buttonCurvature);
  pop();

  //be able to go back to the main menu
  push();
  textSize(backToMenuText.fontSize);
  fill(backToMenuText.fill.r, backToMenuText.fill.g, backToMenuText.fill.b);
  textAlign(CENTER, CENTER);
  text(backToMenuText.text, backToMenuText.x, backToMenuText.y);
  pop();

  if (checkInButton(backToMenu.x, backToMenu.y, backToMenu.width, backToMenu.height)){
    sounds.click.play();
    state = "title";
  }
}

//create the simulation function
function simulation() {
  //create the UI of the simulation
  simulationInterface();
  //create the user in the game
  displayUser();
  //move the user in the game
  moveUser();
  //create an object that's randomly generated
  createObject(object.x, object.y, object.size);
  //move the object
  moveObject(object.x, object.vx);
  //regenerate the object if it leaves the canvas
  levelUp(object.x);
  //generate new random objects

  //check if the user touches one of the objects
  checkTouch();
  //if check touch is true, lose one life for the user
  loseLife();
  //check the amount of lives left for the user
  checkLives();
}

//create the endscreen function
function end() {

  let mainMenu = {
    x:width/2,
    y: height/2-100,
    width: 200,
    height: 100,
    fill: {
      r:200,
      g: 200,
      b: 250
    }
  }

  let endText = {
    text: "This is the end",
    x: width/2,
    y: height/2 -200,
    fill: {
      r: 100,
      g: 100,
      b: 255
    },
    fontSize: 32
  }

  let mainMenuText = {
    text: "Main menu",
    x: mainMenu.x,
    y: mainMenu.y,
    fill: {
      r: 100,
      g: 100,
      b: 255
    },
    fontSize: 32
  }

  //display the end message at the top of the screen
  push();
  textSize(endText.fontSize);
  fill(endText.fill.r, endText.fill.g, endText.fill.b);
  textAlign(CENTER, CENTER);
  text(endText.text, endText.x, endText.y);
  pop();

  //create box
  push();
  rectMode(CENTER);
  lightenButton(mainMenu.x, mainMenu.y, mainMenu.width, mainMenu.height, mainMenu.fill.r,mainMenu.fill.g,mainMenu.fill.b);
  rect(mainMenu.x, mainMenu.y, mainMenu.width,mainMenu.height,buttonCurvature);
  pop();

  //let the user restart the game if they want to
  //if they click the box, restart game and reset Lives
  //display the main menu text
  push();
  textSize(mainMenuText.fontSize);
  fill(mainMenuText.fill.r, mainMenuText.fill.g, mainMenuText.fill.b);
  textAlign(CENTER, CENTER);
  text(mainMenuText.text, mainMenuText.x, mainMenuText.y);
  pop();

  //reset the lives and the position of the objects
  if (checkInButton(mainMenu.x, mainMenu.y, mainMenu.width, mainMenu.height)){
    sounds.click.play();
    resetGame();
    state = "title";
  }
}

//creates the user character
function displayUser() {
  push();
  fill(0);
  circle(user.x, user.y, user.size);
  pop();
}

//moves the character
function moveUser() {
  //we want to make the user accelerate depending on the A and D and W and S characters of the keyboard
  user.x += user.vx;
  user.y += user.vy;

  //make the user accelerate depending on if they have the d or the a key pressed
  if (keyIsDown(68)) {
    user.vx += user.ax;
    //cap the speed so we're not going too fast
    user.vx = constrain(user.vx, -user.maxSpeed, user.maxSpeed);
  } else if (keyIsDown(65)) {
    user.vx -= user.ax;
    user.vx = constrain(user.vx, -user.maxSpeed, user.maxSpeed);
  } else if (keyIsDown(87)) {
    user.vy -= user.ax;
    user.vy = constrain(user.vy, -user.maxSpeed, user.maxSpeed);
  } else if (keyIsDown(83)) {
    user.vy += user.ax;
    user.vy = constrain(user.vy, -user.maxSpeed, user.maxSpeed);
  }

  userMoveConstraints();

}

//create an object we need to dodge
function createObject(xPosition, yPosition, size) {
  //generate the shape
  push();
  fill(0);
  rect(xPosition, yPosition, size, size);
  pop();

}


//a function to control the movement of the object
function moveObject(xPosition, vx){
  push();
  textSize(30);
  fill(0);
  textAlign(CENTER, CENTER);
  text("move", width/2, height/2);
  pop();
  //xPosition += vx;
  object.x += object.vx;

}

//check to see if the user touched one of the objects
function checkTouch() {
  //check that the user and the user and the object are touching or not
  //find the distance between the user and any object
  let d = dist(user.x, user.y, object.x, object.y);

  //the distance where they touch is equal to one radius + half side length
  if (d <= (user.size / 2 + object.size / 2)) {
    return true
  } else {
    return false
  }

}

//checks the number of lives left for the user. If it's equal to 0, lose
function checkLives() {
  if (lives === 0) {
    state = "end";
  }
}

//makes the user lose a life if it's touching an object
function loseLife() {

  if (checkTouch()) {
    lives = lives - 1;
    //play the sound of explosion
    sounds.explosion.play();
    //reposition the user immediately and stop the movement
    resetUserPosition();
    state = "lostLifeScreen";
  }
}

//create a new state to display that we lost a life and either we can continue or end game
function lostLifeScreen(){
  //display the two options of continuing or ending
  let continuePlayingButton = {
    x: width/4,
    y: height/2,
    width: 200,
    height: 100,
    fill: {
      r: 200,
      g: 100,
      b: 100,
    }
  }

  let endGameButton = {
    x: 3*width/4,
    y: height/2,
    width: 200,
    height: 100,
    fill: {
      r: 200,
      g: 100,
      b: 100,
    }
  }

  let continuePlayingText = {
    text: "Continue Playing",
    x: continuePlayingButton.x,
    y: continuePlayingButton.y,
    fill: {
      r: 100,
      g: 100,
      b: 255
    },
    fontSize: 20
  }

  let endGameText = {
    text: "End Game",
    x: endGameButton.x,
    y: endGameButton.y,
    fill: {
      r: 100,
      g: 100,
      b: 255
    },
    fontSize: 20
  }

  let livesLeftText = {
    text: "Lives left: "+lives,
    x: width / 2,
    y: height / 2-100,
    fill: {
      r: 100,
      g: 100,
      b: 255
    },
    fontSize: 20
  }

  rectMode(CENTER);
  noStroke();

  //lighten the buttons when the user hovers their mouse over them
  push();
  lightenButton(continuePlayingButton.x, continuePlayingButton.y, continuePlayingButton.width, continuePlayingButton.height, continuePlayingButton.fill.r, continuePlayingButton.fill.g, continuePlayingButton.fill.b);
  rect(continuePlayingButton.x, continuePlayingButton.y, continuePlayingButton.width,continuePlayingButton.height,buttonCurvature);
  pop();

  push();
  lightenButton(endGameButton.x, endGameButton.y, endGameButton.width, endGameButton.height, endGameButton.fill.r, endGameButton.fill.g, endGameButton.fill.b);
  rect(endGameButton.x,endGameButton.y,endGameButton.width,endGameButton.height,buttonCurvature);
  pop();

  //continue playing option text
  push();
  textSize(continuePlayingText.fontSize);
  fill(continuePlayingText.fill.r, continuePlayingText.fill.g, continuePlayingText.fill.b);
  textAlign(CENTER, CENTER);
  text(continuePlayingText.text, continuePlayingText.x, continuePlayingText.y);
  pop();

  //end game option
  push();
  textSize(endGameText.fontSize);
  fill(endGameText.fill.r, endGameText.fill.g, endGameText.fill.b);
  textAlign(CENTER, CENTER);
  text(endGameText.text, endGameText.x, endGameText.y);
  pop();

  //display the number of lives left for the user
  displayLives();

  //let the user pick one of the other
  if (checkInButton(continuePlayingButton.x, continuePlayingButton.y, continuePlayingButton.width, continuePlayingButton.height)){
    sounds.click.play();
    resetObjetPositionInGame();
    state = "simulation";
  }
  else if (checkInButton(endGameButton.x, endGameButton.y, endGameButton.width, endGameButton.height)){
    sounds.click.play();
    state = "end";
  }

}

//checks if mouse is clicking and in button, returns boolean value. Works for rectangles only for now
function checkInButton(xPosition, yPosition, shapeWidth,shapeHeight){
  if ((mouseX >= xPosition-shapeWidth/2) && (mouseX <= xPosition + shapeWidth/2) && (mouseIsPressed) && (mouseY < yPosition + shapeHeight/2) && (mouseY > yPosition -shapeHeight/2)){
    return true;
  }
  else{
    return false;
  }
}

//create a reset button and the background
function simulationInterface(){
  //create a reset button so the user can restart the game
  //funBackground();
  displayLives(width/2+40, height/2-250);
  //keep track of the user's score as the objects leave the canvas
  scoreDisplay();
  restartButton();
}

//reset game function
function resetGame(){
  //reset lives and positions
  resetObjetAtEnd();
  score = 0;
  lives = livesi;
  state = "simulation";


}

//reset the position and velocity of the user
function resetUserPosition(){
  user.x = width / 4;
  user.y = height / 2;
  user.vx = 0;
  user.vy = 0;
}

//create a fun dynamic background
function funBackground(){
  //create different blocks randomly
  let seconds = second();

  if (seconds = 10){
    //generate a square
    rectMode(CENTER);
    fill(random(0,255),random(0,255),random(0,255));
    rect(random(0,width), random(0,height), random(50,100));

  }
}

//check to see if mouse is hovering over a button. Returns boolean value
function isHovering(xPosition, yPosition, shapeWidth, shapeHeight){
  if ((mouseX >= xPosition-shapeWidth/2) && (mouseX <= xPosition + shapeWidth/2) && (mouseY < yPosition + shapeHeight/2) && (mouseY > yPosition -shapeHeight/2)){
    return true;
  }
  else{
    return false;
  }
}

//create a function to lighten the box
function lightenButton(xPosition, yPosition, shapeWidth, shapeHeight, fillR, fillG, fillB){
  if (isHovering(xPosition, yPosition, shapeWidth, shapeHeight)){
    fill(fillR+lighten, fillG+lighten, fillB+lighten);
  }
  else{
    fill(fillR, fillG, fillB);
  }
}

//display the hearts (lives)
function displayLives(xPosition, yPosition){
  //display the number of lives in the top right corner
  let numberLives = lives;
  let spacing = 50;
  let numberOfHearts = lives;
  let yposition = height/2-250;
  let xposition = width/2 - 40
  let heartSize = 50;

  while (numberOfHearts > 0){
    //keep count of how many lives are left as heart images
    imageMode(CENTER);
    image(heart, xposition+numberOfHearts*spacing, yposition, heartSize, heartSize);
    numberOfHearts -= 1;
  }

}

//function to create a button and place it on the canvas and make it lighten up when the user hovers over it
function createButton(xPosition, yPosition, shapeWidth, shapeHeight, fillR, fillG, fillB){
  //create the options of either playing or clicking the instructions page
  push();
  rectMode(CENTER);
  lightenButton(xPosition, yPosition, shapeWidth, shapeHeight, fillR, fillG, fillB);
  rect(xPosition, yPosition, shapeWidth,shapeHeight,buttonCurvature);
  pop();
}

//function that restarts the objects in random locations
function levelUp(xPosition){
  if (xPosition < 0) {
    sounds.levelUp.play();
    object.x = width;
    object.y = random(0, height);
    //increase speed if the object left the canvas
    object.vx -= 1;
    //add a score of 1 since we dodged the object
    score += 1;
    //increase the size of the object a bit
    object.size += 10;
    //add a new object to the game
    for (let scoreCount = score; scoreCount<0; scoreCount--){
      createObject();
    }
  }
}

//function that resets the position of the object
function resetObjetPositionInGame(){
  object.x = object.xi;
  object.y = random(0, height);
}

//keep track of the score
function scoreDisplay(){
  //write the score in the top left corner of the canvas
  let scoreText = {
    score: score,
    text: "Level: "+score,
    fontSize: 30,
    fill: {
      r: 255,
      g: 255,
      b: 100,
    },
    x:width/4,
    y:50,
  }
  push();
  textSize(scoreText.fontSize);
  fill(scoreText.fill.r, scoreText.fill.g, scoreText.fill.b);
  textAlign(CENTER, CENTER);
  text(scoreText.text, scoreText.x, scoreText.y);
  pop();
}

//reset the velocity and position of the object if we restart the game
function resetObjetAtEnd(){
  object.x = object.xi;
  object.y = object.yi;
  object.vx = object.vxi;
  object.size = object.sizei;

}

//create the background music for the game
function mousePressed(){
  if (!sounds.backgroundMusic.isPlaying()){
    sounds.backgroundMusic.loop();
  }

}

//make a function so we don't get stuck to the side of the frame and don't leave the canvas
function userMoveConstraints(){
  user.x = constrain(user.x, 0, width);
  user.y = constrain(user.y, 0, height);

  //if user touches the edge, put their velocity back to 0 so that we don't just stick to the frame
  if (user.x === width){
    user.x -= 1;
    user.vx = 0;
    user.vy = 0;
  }
  else if (user.x === 0){
    user.x +=1;
    user.vx = 0;
    user.vy = 0;
  }
  else if (user.y === height){
    user.y -= 1;
    user.vx = 0;
    user.vy = 0;
  }
  else if (user.y === 0){
    user.y += 1;
    user.vx = 0;
    user.vy = 0;
  }
}

//create a restart button
function restartButton(){
  let restartButton = {
    x: 3*width/4,
    y: 125,
    width: 150,
    height: 50,
    fill: {
      r:200,
      g: 200,
      b: 250
    },
    fontSize: 30,
    textFill: {
      r: 250,
      g: 250,
      b: 200
    },
    text: "Restart"
  }


  push();
  rectMode(CENTER);
  lightenButton(restartButton.x, restartButton.y, restartButton.width, restartButton.height, restartButton.fill.r,restartButton.fill.g,restartButton.fill.b);
  rect(restartButton.x, restartButton.y, restartButton.width,restartButton.height,buttonCurvature);
  pop();

  push();
  textSize(restartButton.fontSize);
  fill(restartButton.textFill.r, restartButton.textFill.g, restartButton.textFill.b);
  textAlign(CENTER, CENTER);
  text(restartButton.text, restartButton.x, restartButton.y);
  pop();

  if (checkInButton(restartButton.x, restartButton.y, restartButton.width, restartButton.height)){
    sounds.click.play();
    resetGame();

  }
}
