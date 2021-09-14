"use strict";

/**************************************************
Activity 2: Draw an alien
George Gausden

Drawing an alien program
**************************************************/

// setup()
//
// Draw the whole alien
function setup() {
  createCanvas(640,480);
  //make the background pink
  background(255,100,100);

  noStroke();

  fill(127);
  //body of the alien
  ellipse(320,480,300,200);
  //head of the alien
  fill(90);
  ellipse(320,240,250,400);
  //draw the eyes
  fill(0);
  ellipse(250,240,80,250);
  ellipse(390,240,80,250);
  //draw the nostrils
  fill(0);
  ellipse(300,350,10,10);
  ellipse(340,350,10,10);
  //draw the mouth
  stroke(200,0,0);
  strokeWeight(5);
  rectMode(CENTER);
  rect(320,390,100,25);







}

// draw()
//
// Description of draw() goes here.
function draw() {

}
