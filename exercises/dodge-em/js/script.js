"use strict";

/**************************************************
Exercise: Dodge-em
George Gausden

A program where the user has to run away from cars. The user controls their space ship with the alien with the mouseX and mouseY positions.
There are police carships that chase the user and the user must avoid being caught.
**************************************************/
//set the variables and javascript objects
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
  ax: 0,
  ay: 0,
  acceleration: 0.3,
  maxSpeed: 4,
  image: undefined,

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
  acceleration: 0.8,
  maxSpeed: 4,
  image: undefined
}

//preload() loads up the images we're going to be using in the program
function preload() {
  //set the images for each vehicle as well as the city skyline
  user.image = loadImage('assets/images/usercar.png');
  city = loadImage('assets/images/city.png');
  policeCar1.image = loadImage('assets/images/policeship.png')
  policeCar2.image = loadImage('assets/images/policeship.png')
}
// setup()
//
// setup() creates the initial positions of the police ships as well as the canvas
function setup() {
  createCanvas(windowWidth, windowHeight);
  //set the policeCar1 position
  policeCar1.x = random(0, windowWidth);
  policeCar1.y = random(0, windowHeight);

  //set the policeCar2 position
  policeCar2.x = random(0, windowWidth);
  policeCar2.y = random(0, windowHeight);

  //get rid of the cursor
  noCursor();
}

// draw()
//
// draw() creates the program and all the movement from the different vehicles
function draw() {
  background(255);
  //draw the police cars
  //make the police car lights flash
  //create a random number between 0 and 1
  noStroke();
  let y = random(0,1);
  if (y < 0.5) {
    cityLight.r = 0;
    cityLight.b = 255;
  } else {
    cityLight.r = 255;
    cityLight.b = 0;
  }


  background(cityLight.r, cityLight.g, cityLight.b);

  //make the city skyline appear
  image(city, 0, 0, width, height);

  //draw the police cars with the images we imported
  image(policeCar1.image, policeCar1.x, policeCar1.y, policeCar1.width, policeCar1.height);
  image(policeCar1.image, policeCar2.x, policeCar2.y, policeCar2.width, policeCar2.height);

  //draw the user's car with the image we imported
  image(user.image, user.x, user.y, user.width, user.height);

  //make the mouse be the user's control of the cars
  //the x will control the y and the y will control the x to make it harder
  user.x = mouseY;
  user.y = mouseX;

  //make each police car follow the user's car to catch them with various if statements
  //for the x position of police car 1
  if (user.x < policeCar1.x) {
    policeCar1.ax = -policeCar1.acceleration;
  } else {
    policeCar1.ax = policeCar1.acceleration;
  }

  //for the y position of police car 1
  if (user.y < policeCar1.y) {
    policeCar1.ay = -policeCar1.acceleration;
  } else {
    policeCar1.ay = policeCar1.acceleration;
  }

  //set the x and y velocities based on the if statements we did just above
  policeCar1.vx = policeCar1.vx + policeCar1.ax;

  //constrain the speed of the police car so that it doesn't get too large
  policeCar1.vx = constrain(policeCar1.vx, -policeCar1.maxSpeed, policeCar1.maxSpeed);
  policeCar1.vy = policeCar1.vy + policeCar1.ay;
  policeCar1.vy = constrain(policeCar1.vy, -policeCar1.maxSpeed, policeCar1.maxSpeed);

  //make the position of the police car change with the velocities calculated above
  policeCar1.x = policeCar1.x + policeCar1.vx;
  policeCar1.y = policeCar1.y + policeCar1.vy;

  //exactly the same thing for the second police car
  if (user.x < policeCar2.x) {
    policeCar2.ax = -policeCar2.acceleration;
  } else {
    policeCar2.ax = policeCar2.acceleration;
  }

  if (user.y < policeCar2.y) {
    policeCar2.ay = -policeCar2.acceleration;
  } else {
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
  if (distanceUserPolice1 <= distanceCaught | distanceUserPolice2 <= distanceCaught) {
    noLoop();
  }
}
