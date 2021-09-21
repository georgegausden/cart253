"use strict";

/**************************************************
Drawing Experiments
George Gausden

Experimenting with p5's drawing and colour functions

Currently draws shapes
**************************************************/

// setup()
//
// Draws shapes

function setup() {

  createCanvas(500,500);

  background(255,127,0);

  //fill applies to all the shapes after it, the fourth value is the transparency 0-100 (most transparent)
  stroke(0,255,0);
  fill(127,0,200, 50);

  //rectmode(center) makes us draw x and y in center instead of corner
  //this works for other shapes too ellipseMode(CENTER)...
  rectMode(CENTER);
  rect(250,250,100,100);

  fill(128,10,10,100)
  rect(250,250,50,50);

  ellipse(250,250,100,100);
}

// draw()
//
// Does nothing
function draw() {

}
