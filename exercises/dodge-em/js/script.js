"use strict";

/**************************************************
Template p5 project
George Gausden

A program where the user has to run away from cars
**************************************************/
let city;

let distanceCaught = 20;

let cityLight = {
  r: 0,
  g: 0,
  b: 0,
}

let user = {
  x: 0,
  y: 0,
  width: 75,
  height: 75,
  vx: undefined,
  vy: undefined,
  speed: undefined,
  ax:undefined ,
  ay: undefined,
  acceleration: undefined,
  image: undefined
}

let policeCar1 = {
  x: 0,
  y: 0,
  width: 75,
  height: 75,
  vx: 0,
  vy: 0,
  speed: 0,
  ax:0 ,
  ay: 0,
  acceleration: 0.1,
  maxSpeed: 4,
  fill: {
    r:255,
    g:0,
    b:0
  },
  image: undefined
}

let policeCar2 = {
  x: 0,
  y: 0,
  width: 75,
  height: 75,
  vx: 0,
  vy: 0,
  speed: 0,
  ax: 0,
  ay: 0,
  acceleration: 0.2,
  maxSpeed: 4,
  fill: {
    r:0,
    g:0,
    b:255,
  },
  image:undefined
}
//
function preload(){
  user.image = loadImage('assets/images/usercar.png');
  city = loadImage('assets/images/city.png');
  policeCar1.image = loadImage('assets/images/policeship.png')
  policeCar2.image = loadImage('assets/images/policeship.png')
}
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
  //make the background color flash between red and blue like police lights
  let y = random(0,1);
  if (y < 0.5) {
    cityLight.r = 0;
    cityLight.b = 255;
  }
  else {
    cityLight.r = 255;
    cityLight.b = 0;
  }

  background(cityLight.r,cityLight.g,cityLight.b);
  //make the city skyline appear

  image(city, 0, 0, width, height);
  //draw the police cars
  //make the police car lights flash
  //create a random number between 0 and 1

  fill(policeCar1.fill.r, policeCar1.fill.g, policeCar1.fill.b);

  image(policeCar1.image, policeCar1.x, policeCar1.y, policeCar1.width, policeCar1.height);
  image(policeCar1.image, policeCar2.x, policeCar2.y, policeCar2.width, policeCar2.height);



  //draw the user's car
  fill(0);
  image(user.image, user.x, user.y, user.width, user.height);

  //add a background of a city


  //make the mouse be the user's control of the cars
  //the x will control the y and the y will control the x to make it harder
  user.x = mouseX + 9;
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


  policeCar1.vx = policeCar1.vx + policeCar1.ax;
  policeCar1.vx = constrain(policeCar1.vx, -policeCar1.maxSpeed, policeCar1.maxSpeed);
  policeCar1.vy = policeCar1.vy + policeCar1.ay;
  policeCar1.vy = constrain(policeCar1.vy, -policeCar1.maxSpeed, policeCar1.maxSpeed);

  policeCar1.x = policeCar1.x + policeCar1.vx;
  policeCar1.y = policeCar1.y + policeCar1.vy;

  //same thing for the second police car
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


  //if the police catch you, lose the game
  //find the distance between the police and your ship
  let distanceUserPolice1;
  let distanceUserPolice2;

  distanceUserPolice1 = dist(user.x, user.y, policeCar1.x, policeCar1.y);
  distanceUserPolice2 = dist(user.x, user.y, policeCar2.x, policeCar2.y);

  //if the distance between the user and the police is smaller than distance to be caught at, stop the program
  if (distanceUserPolice1 <= distanceCaught | distanceUserPolice2 <= distanceCaught){
    noLoop();
  }



}
