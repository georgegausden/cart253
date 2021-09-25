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
  vx: 0,
  vy: 0,
  speed: 0,
  ax:0 ,
  ay: 0,
  acceleration: 0.1,
  maxSpeed: 4,
}

let policeCar2 = {
  x: 0,
  y: 0,
  width: 100,
  height: 50,
  vx: 0,
  vy: 0,
  speed: 0,
  ax: 0,
  ay: 0,
  acceleration: 0.2,
  maxSpeed: 4,
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
  if (user.x < policeCar1.x){
    policeCar1.ax = -policeCar1.acceleration;
  }
  else{
    policeCar1.ax = policeCar1.acceleration;
  }

  if (user.y < policeCar1.y){
    policeCar1.ay = -policeCar1.acceleration;
  }
  else{
    policeCar1.ay = policeCar1.acceleration;
  }

  //same thing for the second police car
  policeCar1.vx = policeCar1.vx + policeCar1.ax;
  policeCar1.vx = constrain(policeCar1.vx, -policeCar1.maxSpeed, policeCar1.maxSpeed);
  policeCar1.vy = policeCar1.vy + policeCar1.ay;
  policeCar1.vy = constrain(policeCar1.vy, -policeCar1.maxSpeed, policeCar1.maxSpeed);

  policeCar1.x = policeCar1.x + policeCar1.vx;
  policeCar1.y = policeCar1.y + policeCar1.vy;

  if (user.x < policeCar2.x){
    policeCar2.ax = -policeCar2.acceleration;
  }
  else{
    policeCar2.ax = policeCar2.acceleration;
  }

  if (user.y < policeCar2.y){
    policeCar2.ay = -policeCar2.acceleration;
  }
  else{
    policeCar2.ay = policeCar2.acceleration;
  }

  policeCar2.vx = policeCar2.vx + policeCar2.ax;
  policeCar2.vx = constrain(policeCar2.vx, -policeCar2.maxSpeed, policeCar2.maxSpeed);
  policeCar2.vy = policeCar2.vy + policeCar2.ay;
  policeCar2.vy = constrain(policeCar2.vy, -policeCar2.maxSpeed, policeCar2.maxSpeed);

  policeCar2.x = policeCar2.x + policeCar2.vx;
  policeCar2.y = policeCar2.y + policeCar2.vy;


}
