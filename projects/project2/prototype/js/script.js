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
let simulationState = 'userTurn';

let cursorSize = 50;

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
  noCursor();
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
  textAlign(CENTER);
  text("Title Page",width/2,height/2);
  pop();

  if (keyIsDown(13)){
    state = 'simulation'
  };
}

function simulation(){
  //create the turn based system of the program
  if (simulationState === 'userTurn'){
    userTurn()
  }
  else if (simulationState === 'computerTurn'){
    computerTurn()
  };

  //disply the boats of the user and the ennemies
  user.display();
  enemy.display();

}

function userTurn(){
  //show the cursor so the user can see where they're putting it
  push();
  fill(255,255,255,180);
  circle(mouseX,mouseY,cursorSize);
  pop();

  let userPositionSet = false;

  //let the user decide where to move their Boat
  if (mouseClicked()){
    user.x = mouseX;
    user.y = mouseY;
  }
  else{
    userPositionSet = false;
  }

}

function computerTurn(){
  //let the computer decide where to move their boats

}

function end(){
  push();
  text("The End",width/2,height/2);
  pop();
}

function mouseClicked(){
  if (userPositionSet === false){
    userPositionSet = true
    return true
  }
  else{
    return false
  };
}
