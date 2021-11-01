"use strict";

/**************************************************
Project 2 Prototype
Pippin Barr

In this prototype I want to create the skeleton of the moving character and the user being able to control it
**************************************************/
//create the character class
let user;
let enemy;
//set the intial state of the game
let state = 'title';

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(600,600);

  //create the user's boat
  user = new Boat(width/2,height/2);
  //enemy boat
  enemy = new Enemy(width/3, height/8);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  //the three possible states of the game are title(), simulation() and end()
  if (state === 'title'){
    title();
  }
  else if (state === 'simulation'){
    simulation();
  }
  else if (state === 'end'){
    end();
  }
}

//create the states for the game
function title(){
  background(255);

  push();
  textSize(50);
  text("Title Page",width/2,height/2);
  pop();

  if (keyIsDown(13)){
    state = 'simulation'
  };
}

function simulation(){
  //make the user display
  user.display();
  user.move();
  enemy.display();
  enemy.move();
}

function end(){
  push();
  text("The End",width/2,height/2);
  pop();
}
