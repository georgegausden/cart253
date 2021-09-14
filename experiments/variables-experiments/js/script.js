"use strict";

/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/
let backgroundShade = 0;

//java script object (sort of like a list)
let circle = {
  x: 0,
  y: 250,
  size: 200,
  speed: 2
};

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
  circle.x += circle.speed;
  ellipse(circle.x, circle.y,circle.size);
//see what values our variable has in the jvascript console
  console.log("circleX:" + circle.x)
  //another way to write it with dollar sign
  //console.log(`circleX: ${circle.x}`)
}
