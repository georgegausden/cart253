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
  size: 100,
  speed: 2,
  fill: 255
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
  //make circle stick to edge
  circle.x = constrain(circle.x,0,width);
  //put limits on the value of the fill as the circle moves
  circle.fill = map(circle.x, 0, width, 0, 255);
  fill(circle.fill);
  ellipse(circle.x, circle.y,circle.size);


//see what values our variable has in the jvascript console

  //another way to write it with dollar sign
  //console.log(`circleX: ${circle.x}`)


}
