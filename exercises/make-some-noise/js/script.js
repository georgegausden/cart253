"use strict";

/**************************************************
Make Some Noise
George Gausden

A program that plays music based on primitive physics.
**************************************************/

// The balls
let balls = [];
let numberOfBalls = 10;

// F-minor
let notes = [];


//keep track if one of the balls touches the side of the screen
let touchSideBoolean = false;

//get a ghost image
let ghostImage = undefined;

function preload(){
  ghostImage = loadImage('assets/images/ghost.png');
}

// setup()
//
// Just creates the canvas.
function setup() {
  createCanvas(600,600);

  //generate the balls in the simulation
  for (let i = 0; i<numberOfBalls; i++){
    let ball = new Ball(random(0,width), height);
    balls.push(ball);
  }

  userStartAudio();
}

// draw()
//
// Description of draw() goes here.
function draw() {

  if (touchSideBoolean){
    background(170);
  }
  else{
    background(250);
  }

  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    ball.move();
    ball.wrap();
    ball.bounce();
    ball.display();
  }


}

function mousePressed() {
  createBall(mouseX,mouseY);
}


function createBall(x,y) {
  let note = random(notes);
  let ball = new Ball(x,y,note);
  balls.push(ball);
}
