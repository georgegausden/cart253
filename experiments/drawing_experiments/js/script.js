"use strict";

/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

// setup()
//
// Description of setup() goes here.
function setup() {

  createCanvas(500,500);

  background(100,200,200);

  //rectmode(center) makes us draw x and y in center instead of corner
  //this works for other shapes too ellipseMode(CENTER)...
  rectMode(CENTER);
  rect(250,250,100,100);
  rect(250,250,50,50);

  ellipse(250,250,100,100);
}

// draw()
//
// Description of draw() goes here.
function draw() {

}
