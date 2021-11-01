"use strict";

/**************************************************
Project 2 Prototype
Pippin Barr

In this prototype I want to create the skeleton of the moving character and the user being able to control it
**************************************************/
//create the character class
let user;
// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(600,600);

  //create the character
  user = new Character(width/2,height/2);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  //make the user display
  user.display();
  user.move();


}
