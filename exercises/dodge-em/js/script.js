"use strict";

/**************************************************
Template p5 project
Pippin Barr

A program where the user has to run away from cars
**************************************************/
let user = {
  x: 0,
  y: 0,
  width: 75,
  height: 25,
  vx: undefined,
  vy: undefined,
  speed: undefined,
  ax:undefined ,
  ay: undefined,
  acceleration: undefined,
}

let policeCar1 = {
  x: 0,
  y: 0,
  width: 100,
  height: 50,
  vx: undefined,
  vy: undefined,
  speed: undefined,
  ax:undefined ,
  ay: undefined,
  acceleration: undefined,
}

let policeCar2 = {
  x: 0,
  y: 0,
  width: 100,
  height: 50,
  vx: undefined,
  vy: undefined,
  speed: undefined,
  ax: undefined,
  ay: undefined,
  acceleration: undefined,
}
//

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth,windowHeight);
  //set the policeCar1 position
  policeCar1.x = random(0,windowWidth);
  policeCar1.y = random(0,windowHeight);

  //set the policeCar2 position
  policeCar2.x = random(0,windowWidth);
  policeCar2.y = random(0,windowHeight);

  //get rid of the cursor
  noCursor();
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(255);
  //draw the police cars
  fill(255,0,0);
  rect(policeCar1.x, policeCar1.y, policeCar1.width, policeCar1.height);
  rect(policeCar2.x, policeCar2.y, policeCar2.width, policeCar2.height);

  //draw the user's car
  fill(0);
  rect(user.x, user.y, user.width, user.height);

  //make the mouse x and y be the user car's position
  user.x = mouseX;
  user.y = mouseY;

  //make each police car follow the user's car to catch them
  

}
