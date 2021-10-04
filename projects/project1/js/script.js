"use strict";

/**************************************************
Project 1
George Gausden

Here is a description of this template p5 project.
**************************************************/
//create the javascript objects and the variables in the program

//setup the initial state as the title
let state = "title";

//create the user character as a circle to start with
let user = {
  x:undefined,
  y:undefined,
  vx: 0,
  vy: 0,
  ax: 0.1,
  maxSpeed: 1,
  maxAcceleration: 3,
  size: 40,
};

let object ={
  x:undefined,
  y:undefined,
  vx: -2,
  vy: 0,
  size: 20,
}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);
  user.x = width/4;
  user.y = height/2;
  object.x = width;
  object.y = height/2;
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(255);
  //setup the title, simulation and end states
  if (state === "title") {
    title();
  }
  else if (state === "instructions"){
    instructions();
  }
  else if (state === "simulation") {
    simulation();
  } else if (state === "end") {
    end();
  }
}

//create the title function
function title() {
  push();
  textSize(64);
  fill(100, 100, 255);
  textAlign(CENTER, CENTER);
  text("This is the title", width / 2, height / 2);
  pop();
}

//create an instructions page for the user to understand the game
function instructions(){
  push();
  textSize(64);
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
  //create an object that's randomly generated
  createObject();
  //check if the user touches one of the objects
  checkTouch();
}

//create the endscreen function
function end() {
  push();
  textSize(64);
  fill(100, 100, 255);
  textAlign(CENTER, CENTER);
  text("This is the end", width / 2, height / 2);
  pop();
}

//creates the user character
function displayUser(){
  push();
  fill(0);
  circle(user.x, user.y, user.size);
  pop();
}

//moves the character
function moveUser(){
  //we want to make the user accelerate depending on the A and D and W and S characters of the keyboard
  user.x += user.vx;
  user.y += user.vy;

  //make the user accelerate depending on if they have the d or the a key pressed
  if (keyIsDown(68)){
    user.vx += user.ax;
    //cap the speed so we're not going too fast
    constrain(user.vx, -user.maxSpeed, user.maxSpeed);
  }
  else if (keyIsDown(65)){
    user.vx -= user.ax;
    constrain(user.vx, -user.maxSpeed, user.maxSpeed);
  }
  else if (keyIsDown(87)){
    user.vy -= user.ax;
    constrain(user.vy, -user.maxSpeed, user.maxSpeed);
  }
  else if (keyIsDown(83)){
    user.vy += user.ax;
    constrain(user.vy, -user.maxSpeed, user.maxSpeed);
  }

  //constrain the movement so that we can't exit the frame
  constrain(user.x, 0, width);
  constrain(user.y, 0, height);
}

//create an object we need to dodge
function createObject(){
  //generate the shape
  push();
  fill(0);
  rect(object.x, object.y, object.size, object.size);
  pop();

  //make the object move towards the left as the game progresses
  object.x += object.vx;
}

//create a function to generate random objects constantly
function computerObjects(){
  let numberObjects;
}

//check to see if the user touched one of the objects
function checkTouch(){
  //check that the user and the user and the object are touching or not
  //find the distance between the user and any object
  let d = dist(user.x, user.y, object.x, object.y);

  //the distance where they touch is equal to one radius + half side length
  if (d <= (user.size/2 + object.size / 2)){
    push();
    textSize(64);
    fill(100, 100, 255);
    textAlign(CENTER, CENTER);
    text("they touch", width / 2, height / 2);
    pop();

  }
  else {
    return false
  }

}
