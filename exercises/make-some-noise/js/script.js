"use strict";

/**************************************************
Make Some Noise
George Gausden

A program that plays music based on primitive physics.
**************************************************/

// The balls
let balls = [];
let numberOfBalls = 5;

//the sliders for the user to control
let speedSlider, sizeSlider;

//set the initial state of the program
let state = 'title';

//keep track if one of the balls touches the side of the screen
let touchSideBoolean = false;

// setup()
//
// Creates the canvas, the sliders and the balls in the game
function setup() {
  createCanvas(600, 600);

  //create the sliders in the program
  speedSlider = createSlider(0.99, 1.01, 1, 0);
  sizeSlider = createSlider(20, 100, 50, 0);

  //generate the balls in the simulation
  for (let i = 0; i < numberOfBalls; i++) {
    let ball = new Ball(random(0, width), height, random(-2, 0));
    balls.push(ball);
  }

  userStartAudio();
}

// draw()
//
// Determines which state we're in
function draw() {

  if (state === 'title') {
    title();
  } else if (state === 'simulation') {
    simulation();
  }
}

//creates the title screen of the game
function title() {

  background(255);

  push();
  textAlign(CENTER, CENTER);
  textSize(60);
  text("Make Some Noise!", width / 2, height / 2 - 100);
  pop();

  push();
  textAlign(CENTER, CENTER);
  textSize(40);
  text("Click to continue", width / 2, height / 2 + 100);
  pop();

  let time = millis();

  //create a background moving
  push();
  noStroke();
  fill(200, 200, 255, 100);
  circle(width / 2, height / 2 - 1 / 10 * time, 50);
  circle(width / 2 - 100, height - 1 / 10 * time, 100);
  circle(width / 2 - 200, height - 1 / 12 * time, 50);
  circle(width / 2 + 30, height + 20 - 1 / 5 * time, 200);
  circle(width / 2 - 50, height - 1 / 10 * time, 200);
  circle(width / 2 - 300, height + 100 - 1 / 15 * time, 50);
  circle(width / 2 + 300, height + 20 - 1 / 16 * time, 70);
  pop();
}

//switches the state from title to simulation
function mousePressed() {
  if (state === 'title') {
    state = 'simulation'
  };
}

//colours the background, displays and moves the balls
function simulation() {
  //make the background reflect the speed of the ball
  //if the ball is moving slowly represent it with blue, faster with red
  colourBackground();

  //display the slider on the screen
  push();
  textSize(15);
  textAlign(CENTER);
  fill(255);
  text('Speed', 170, 42);
  text('Size', 170, 72);
  speedSlider.position(10, 30);
  sizeSlider.position(10, 60);
  pop();

  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    ball.move();
    ball.changeSpeed();
    ball.wrap();
    ball.display();
  }

  //allow the user to change the speed of the balls as they move
}

//this function displays the background colour, it's based on the average speed of all the balls
function colourBackground() {
  let averageSpeed = 0;
  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    //get the magnitude of the speed of each ball
    //the magnitude is sqrt(vx^2+vy^2)
    let magnitudeVelocity = sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
    averageSpeed += magnitudeVelocity;
  }

  averageSpeed = averageSpeed / balls.length;

  //now colour the background based on that
  background(averageSpeed * 5, 0, 255 / averageSpeed);
}
