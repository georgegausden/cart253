/**
Behold! The Mona Lisa!
George Gausden

A program that attempts to reproduce the Mona Lisa by Leonardo DaVinci.

Plan:

x Create a reasonable sized createCanvas
x Fill the background with Leo's background color
x Add detail to the background
x Block out the basic shapes (face, body, hair, mountains...)


*/

"use strict";


/**
Description of setup
*/
function setup() {
  createCanvas(240,350);

  //the background
  background(144,191,122);

  //mona's hair
  fill(10,20,10);
  ellipse(100,87.5,100,120);

  //mona's face
  fill(222,182,93);
  noStroke();
  ellipse(120, 87.5, 60,80);

  //smile
  stroke(0);
  line(100,100,120,105);
  line(120,105,120,105);



}


/**
Description of draw()
*/
function draw() {

}
