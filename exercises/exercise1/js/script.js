"use strict";

/**************************************************
Exercise 1: I like to move it!
George Gausden

This project creates an artwork that is interactive with a mouse
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
  fill:(255)
};

let triangle1 = {
  x1: 500/4,
  y1: 2/3*500,
  x2: 500/2,
  y2: 500/3,
  x3: 500*3/4,
  y3: 2/3*500,
  fill:(255)
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

  //set up the background color and make it change over time
  background(backgroundColor.r,backgroundColor.g,backgroundColor.b);
  backgroundColor.r += 1;
  backgroundColor.g += 1;
  //limit the color so it doesn't get too ugly
  backgroundColor.r = constrain(backgroundColor.r, 0, 100);
  backgroundColor.g = constrain(backgroundColor.g, 0, 70);


  //add the first circle to the program
  fill(circle1.fill);
  circle(circle1.x,circle1.y,circle1.size);
  circle1.x += circle1.speed;
  //make the first circle's size change depending on the x position of the mouse
  circle1.size = mouseX;
  //map the values of the size so that it goes to the edge at a good size not too big
  circle1.size = map(mouseX,0,500,10,200);

  //add the second circle to the program
  fill(circle2.fill);
  circle(circle2.x,circle2.y,circle2.size);
  circle2.y += circle2.speed;

  //add the triangle to the program
  fill(triangle1.fill);
  triangle(triangle1.x1,triangle1.y1,triangle1.x2,triangle1.y2,triangle1.x3,triangle1.y3);
  //make the color of the triangle change depending on the y position of the mouse
  triangle1.fill = mouseY
  //make sure the color is within the bounds of the createCanvas
  triangle1.fill = map(mouseY, 0, 500, 0, 255);







}
