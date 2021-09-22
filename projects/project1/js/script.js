"use strict";

/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/
//create the basic character
let character = {
  //create the head (circle)
  headx: undefined,
  heady: undefined,
  headsize: 20,

  //create the body
  bodyx1: 0,
  bodyy1: 0,
  bodyx2: 0,
  bodyy2: 0,
  height: 100,
};

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  //set up the ground
  stroke(255);
  line(0,height/2,width,height/2);

  //set the position of the character
  character.headx = 0;
  character.heady = windowHeight/2 - character.height;


}

// draw()
//
// Description of draw() goes here.
function draw() {

  //draw the character's head
  
  circle(character.headx, character.heady, character.headsize);
}
