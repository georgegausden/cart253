"use strict";

/**************************************************
Project 1
George Gausden

Here is a description of this template p5 project.
**************************************************/
//create the javascript objects and the variables in the program

//setup the initial state as the title
let state = "title";

let lighten = 50;

let lives = 4;

let heart;

//how curved our buttons are
let buttonCurvature = 50;

let sounds = {
  explosion: undefined,
  click: undefined,
}

//create the user character as a circle to start with
let user = {
  x: undefined,
  y: undefined,
  vx: 0,
  vy: 0,
  ax: 0.2,
  maxSpeed: 1,
  maxAcceleration: 3,
  size: 40,
};

let object = {
  xi: undefined,
  yi: undefined,
  x: undefined,
  y: undefined,
  vx: -2,
  vy: 0,
  size: 20,
}

//preload our images and sounds for the program
function preload(){
  sounds.explosion = loadSound('assets/sounds/explosion.mov');
  sounds.click = loadSound('assets/sounds/click.mov');
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
  rectMode(CENTER);
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
  createObject();
  //generate more than one object randomly
  createObject();
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
    constrain(user.vx, -user.maxSpeed, user.maxSpeed);
  } else if (keyIsDown(65)) {
    user.vx -= user.ax;
    constrain(user.vx, -user.maxSpeed, user.maxSpeed);
  } else if (keyIsDown(87)) {
    user.vy -= user.ax;
    constrain(user.vy, -user.maxSpeed, user.maxSpeed);
  } else if (keyIsDown(83)) {
    user.vy += user.ax;
    constrain(user.vy, -user.maxSpeed, user.maxSpeed);
  }

  //constrain the movement so that we can't exit the frame
  constrain(user.x, 0, width);
  constrain(user.y, 0, height);
}

//create an object we need to dodge
function createObject() {
  //generate the shape
  push();
  fill(0);
  rect(object.x, object.y, object.size, object.size);
  pop();

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
  rectMode(CENTER);
  noStroke();

  push();
  lightenButton(continuePlayingButton.x, continuePlayingButton.y, continuePlayingButton.width, continuePlayingButton.height, continuePlayingButton.fill.r, continuePlayingButton.fill.g, continuePlayingButton.fill.b);
  rect(continuePlayingButton.x, continuePlayingButton.y, continuePlayingButton.width,continuePlayingButton.height,buttonCurvature);
  pop();

  push();
  lightenButton(endGameButton.x, endGameButton.y, endGameButton.width, endGameButton.height, endGameButton.fill.r, endGameButton.fill.g, endGameButton.fill.b);
  rect(endGameButton.x,endGameButton.y,endGameButton.width,endGameButton.height,buttonCurvature);
  pop();

  //continue playing option
  push();
  textSize(20);
  fill(100, 100, 255);
  textAlign(CENTER, CENTER);
  text("Continue Playing", continuePlayingButton.x, continuePlayingButton.y);
  pop();

  //end game option
  push();
  textSize(20);
  fill(100, 100, 255);
  textAlign(CENTER, CENTER);
  text("End Game", endGameButton.x, endGameButton.y);
  pop();

  //display the number of lives left for the user
  push();
  textSize(20);
  fill(100, 100, 255);
  textAlign(CENTER, CENTER);
  text("Lives left: "+lives, width / 2, height / 2-100);
  pop();

  //let the user pick one of the other
  if (checkInButton(continuePlayingButton.x, continuePlayingButton.y, continuePlayingButton.width, continuePlayingButton.height)){
    sounds.click.play();
    resetObjetPosition();
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
  funBackground();
  displayLives();
}

//reset game function
function resetGame(){
  //reset lives and positions
  resetObjetPosition();
  lives = 4;
  state = "simulation";
}

//reset the position of the object to block
function resetObjetPosition(){
  object.x = object.xi;
  object.y = object.yi;
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
function displayLives(){
  //display the number of lives in the top right corner
  let numberLives = lives;
  let spacing = 50;

  for (numberLives; numberLives > 0; numberLives -= 1){
    push();
    textSize(30);
    fill(0);
    textAlign(CENTER, CENTER);
    text(numberLives, width/2, height/2);
    pop();
    imageMode(CENTER);
    image(heart, width/2+spacing, height/2, 50, 50);
  }

}
