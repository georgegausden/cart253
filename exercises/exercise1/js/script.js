"use strict";

/**************************************************
Exercise 1: I like to move it!
George Gausden

Here is a description of this template p5 project.
**************************************************/


/**************************************************
Include three shapes
Include movement
Include size changes
Include color changes
Use map() and constrain()
Respond to the mouse position using mouseX and mouseY
**************************************************/

//create JavaScript Objects for the different parameters we're going to change in draw()
let backgroundColor = {
  r:0,
  g:0,
  b:0
};

let circle1 = {
  x:0,
  y:250,
  size:100,
  speed:1,
  fill:(255)
};

let circle2 = {
  x:500,
  y:250,
  size:50,
  speed:0.5,
  fill:(0,200,0)
};

let triangle1 = {
  x1:100,
  y1:250,
  x2:200,
  y2:300,
  x3:400,
  y3:400,
  fill:(120,20,30)
};

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(500,500);


}

// draw()
//
// Description of draw() goes here.
function draw() {
  noStroke();
  background(0);

  //add the first circle to the program
  fill(circle1.fill);
  circle(circle1.x,circle1.y,circle1.size);
  circle1.x += circle1.speed;





}
