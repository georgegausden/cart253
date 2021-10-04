"use strict";

/**************************************************
Project 1
George Gausden

Here is a description of this template p5 project.
**************************************************/

// setup()
//
// Description of setup() goes here.
function setup() {

}

// draw()
//
// Description of draw() goes here.
function draw() {
  //setup the title, simulation and end states
  if (state = "title"){
    title();
  }
  else if (state = "simulation"){
    simulation();
  }
  else if (state = "end"){
    end();
  }
}
