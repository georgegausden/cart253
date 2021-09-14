"use strict";

/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/
let backgroundShade = 0;
let circleX = 0;
let circleY = 250;
let circleSize = 200;
let circleSpeed = 2;
let circleAcceleration = 0.25;

// setup()
//6
// Description of setup() goes here.
function setup() {
  createCanvas(500,500);

}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(backgroundShade);
  circleX += circleSpeed;
  circleSpeed + circleAcceleration;
  ellipse(circleX, circleY,circleSize);
}
