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
  vx: undefined,
  ax: undefined,
  maxAcceleration: 3,
  size: 40,
}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);
  user.x = windowWidth/4;
  user.y = windowHeight/2;
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);
  //setup the title, simulation and end states
  if (state === "title") {
    title();
  } else if (state === "simulation") {
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

//create a way to move from the title function to the simulation function
function mousePressed() {
  if (state === "title") {
    state = "simulation";
  } else if (state === "simulation") {
    state = "end";
  }
}

//create the simulation function
function simulation() {
  //create the user in the game
  displayUser();
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
  circle(user.x, user.y, user.size);
}
