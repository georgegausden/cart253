"use strict";

/**************************************************
Musical Toy
Pippin Barr

A program that plays music based on primitive physics.
**************************************************/

// The balls
let balls = [];

// F-minor
let notes = [`F3`,`G3`,`Ab4`,`Bb4`,`C4`,`Db4`,`Eb4`,`F4`];


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
    ball.bounce();
    ball.display();
    ball.bounceOffEachother();
  }

  //check if the balls touch. If they do, change scale

}

function mousePressed() {
  createBall(mouseX,mouseY);
}

function keyPressed(){
  if (keyIsDown(68)){
    createBall(mouseX,mouseY);
  }
}

function createBall(x,y) {
  let note = random(notes);
  let ball = new Ball(x,y,note);
  balls.push(ball);
}

//function to check if two objects touch
function checkTouch(object1,object2){
  let d = dist(object1.x,object1.y,object2.x,object2.y);

  if (d <= (object1.size/2+object2.size/2)){
    return true
  };
}
