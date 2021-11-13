"use strict";

/**************************************************
Make Some Noise
George Gausden

A program that plays music based on primitive physics.
**************************************************/

// The balls
let balls = [];
let numberOfBalls = 5;


//set the initial state of the program
let state = 'title';


//keep track if one of the balls touches the side of the screen
let touchSideBoolean = false;


// setup()
//
// Just creates the canvas.
function setup() {
  createCanvas(600,600);

  //generate the balls in the simulation
  for (let i = 0; i<numberOfBalls; i++){
    let ball = new Ball(random(0,width), height, random(-2,0));
    balls.push(ball);
  }

  userStartAudio();
}

// draw()
//
// Description of draw() goes here.
function draw() {

  if (state === 'title'){
    title();
  }
  else if (state === 'simulation'){
    simulation();
  }
}

function title(){

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
  fill(200,200,255,100);
  circle(width/2,height/2-1/10*time, 50);
  circle(width/2-100,height-1/10*time, 100);
  circle(width/2-200,height-1/12*time, 50);
  circle(width/2+30,height+20-1/5*time, 200);
  circle(width/2-50,height-1/10*time, 200);
  circle(width/2-300,height+100-1/15*time, 50);
  circle(width/2+300,height+20-1/16*time, 70);
  pop();
}

function mousePressed(){
  if (state === 'title'){
    state = 'simulation'
  };
}

function simulation(){
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
    ball.display();
  }
}
