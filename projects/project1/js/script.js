"use strict";

/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/
//create the basic character
let character = {
  //create the initial position variables for the character
  xiposition: 50,
  //create the head (circle)
  headx: undefined,
  heady: undefined,
  headsize: 40,

  //create the body
  bodyx1: 0,
  bodyy1: 0,
  bodyx2: 0,
  bodyy2: 0,
  height: 100,

  //create the legs
  legheight: 20,
  hips: 20,

  //create the arms
  neckToArms: 40,
  armsToBody: 20,
  armLength: 20,

  //create the height he jumps at
  jumpingHeight: 10,
};

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);




  //set the position of the character's head
  character.headx = character.xiposition;
  character.heady = windowHeight/2 - character.height;
  //set the position of the character's body




}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);
  //set up the ground
  stroke(255);
  line(0,height/2,width,height/2);

  //set the jumpingHeight
  let jumpingHeight = 10;

  //if the character jumped, make sure they land again


  //draw the character's head
  circle(character.headx, character.heady, character.headsize);
  //draw the character's body
  stroke(255);
  line(character.headx, character.heady, character.headx, height/2-character.legheight);
  //draw the character's legs
  line(character.headx, height/2 - character.legheight, character.headx + character.hips, height/2 - jumpingHeight);
  line(character.headx, height/2 - character.legheight, character.headx - character.hips, height/2 - jumpingHeight);
  //draw the character's arms
  line(character.headx, character.heady + character.neckToArms, character.headx + character.armsToBody, character.heady + character.armLength);
  line(character.headx, character.heady + character.neckToArms, character.headx - character.armsToBody, character.heady + character.armLength);


  //make the character be able to jump
  if (mouseIsPressed === true) {
    //make sure we reinitialize it at the beginning again
    character.heady -= jumpingHeight
    character.legheight += jumpingHeight;
  };


}
