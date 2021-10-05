"use strict";

/**************************************************
Project 1
George Gausden

Here is a description of this template p5 project.
**************************************************/
//create the javascript objects and the variables in the program

//setup the initial state as the title
let state = "title";

let lighten = 20;

let lives = 4;

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
  gameInterface();
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
  push();
  textSize(32);
  fill(100, 100, 255);
  textAlign(CENTER, CENTER);
  text("Welcome to GAMETITLE", width / 2, height / 2 - 200);
  pop();

  //create the options of either playing or clicking the instructions page
  push();
  //make the boxes light up if the mouse is hovering over
  lightenButton(width/4, height/2, 200, 100, 200, 200, 250);
  rectMode(CENTER);
  rect(width/4, height/2, 200,100,20);
  pop();
  push();
  lightenButton(3*width/4, height/2, 200, 100, 200, 200, 250);
  rect(3*width/4,height/2,200,100,20);
  pop();


  //would you like to play
  push();
  textSize(32);
  fill(100,100,255);
  textAlign(CENTER, CENTER);
  text("Instructions", width / 4, height / 2);
  pop();

  //play game
  push();
  textSize(32);
  fill(100, 100, 255);
  textAlign(CENTER, CENTER);
  text("Play", 3*width / 4, height / 2);
  pop();

  //let the user click
  if (checkInButton(width/4, height/2, 200, 100)){
    state = "instructions";
    sounds.click.play();
  }
  else if (checkInButton(3*width/4, height/2, 200,100)){
    state = "simulation";
    sounds.click.play();
  }
}

//create an instructions page for the user to understand the game
function instructions() {
  push();
  textSize(32);
  fill(100, 100, 255);
  textAlign(CENTER, CENTER);
  text("To play, use 'A' and 'D'\n to move left and right\n and 'W' and 'S' to move up and down", width / 2, height / 2 - 150);
  pop();

  push();
  fill(200,200,250);
  rectMode(CENTER);
  rect(width/2, height/2, 200,100,20);
  pop();

  //be able to go back to the main menu
  push();
  textSize(30);
  fill(100, 100, 255);
  textAlign(CENTER, CENTER);
  text("Back to menu", width / 2, height / 2);
  pop();

  if (checkInButton(width/2, height/2, 200, 100)){
    sounds.click.play();
    state = "title";
  }
}

//create the simulation function
function simulation() {
  //create the UI of the simulation
  gameInterface();
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
  push();
  textSize(32);
  fill(100, 100, 255);
  textAlign(CENTER, CENTER);
  text("This is the end", width / 2, height / 2-200);
  pop();

  //create box
  push();
  fill(200,200,250);
  rectMode(CENTER);
  rect(width/2, height/2, 200,100,20);
  pop();

  //let the user restart the game if they want to
  //if they click the box, restart game and reset Lives
  push();
  textSize(32);
  fill(100, 100, 255);
  textAlign(CENTER, CENTER);
  text("Main menu", width / 2, height / 2);
  pop();

  //reset the lives and the position of the objects
  if (checkInButton(width/2, height/2, 200, 100)){
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
  push();
  rectMode(CENTER);
  fill(200,100,100);
  strokeWeight(10);
  rect(width/4, height/2, 200,100,20);
  rect(3*width/4,height/2,200,100,20);
  pop();

  //continue playing option
  push();
  textSize(20);
  fill(100, 100, 255);
  textAlign(CENTER, CENTER);
  text("Continue Playing", width / 4, height / 2);
  pop();

  //end game option
  push();
  textSize(20);
  fill(100, 100, 255);
  textAlign(CENTER, CENTER);
  text("End Game", 3*width / 4, height / 2);
  pop();

  //display the number of lives left for the user
  push();
  textSize(20);
  fill(100, 100, 255);
  textAlign(CENTER, CENTER);
  text("Lives left: "+lives, width / 2, height / 2-100);
  pop();

  //let the user pick one of the other
  if (checkInButton(width/4, height/2, 200, 100)){
    sounds.click.play();
    resetObjetPosition();
    state = "simulation";
  }
  else if (checkInButton(3*width/4, height/2, 200, 100)){
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
function gameInterface(){
  //create a reset button so the user can restart the game
  funBackground();
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
