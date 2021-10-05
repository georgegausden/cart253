"use strict";

/**************************************************
Project 1
George Gausden

Here is a description of this template p5 project.
**************************************************/
//create the javascript objects and the variables in the program

//setup the initial state as the title
let state = "title";

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
  ax: 0.1,
  maxSpeed: 1,
  maxAcceleration: 3,
  size: 40,
};

let object = {
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
  object.x = width;
  object.y = height / 2;
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
  push();
  textSize(32);
  fill(100, 100, 255);
  textAlign(CENTER, CENTER);
  text("Welcome to GAMETITLE", width / 2, height / 2 - 200);
  pop();


  //would you like to play
  push();
  textSize(32);
  fill(100, 100, 255);
  textAlign(CENTER, CENTER);
  text("Instructions", width / 2, height / 2 - 200);
  pop();

  //play game
  push();
  textSize(32);
  fill(100, 100, 255);
  textAlign(CENTER, CENTER);
  text("Play", width / 2, height / 2 - 200);
  pop();
}

//create an instructions page for the user to understand the game
function instructions() {
  push();
  textSize(32);
  fill(100, 100, 255);
  textAlign(CENTER, CENTER);
  text("To play, use 'A' and 'D' to move left and right\n and 'W' and 'S' to move up and down", width / 2, height / 2);
  pop();
}

//create a way to move from the title function to the simulation function
function mousePressed() {
  if (state === "title") {
    state = "instructions";
  } else if (state === "instructions") {
    state = "simulation";
  }
}

//create the simulation function
function simulation() {
  //create the user in the game
  displayUser();
  //move the user in the game
  moveUser();
  //create a new object
  createObjectInfo();
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
  text("This is the end", width / 2, height / 2);
  pop();
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
    user.x = width / 4;
    user.y = height / 2;
    user.vx = 0;
    user.vy = 0;
    state = "lostLifeScreen";
  }
}

function createObjectInfo(){

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
