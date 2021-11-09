"use strict";

/**************************************************
Project 2 Prototype
George Gausden

In this prototype I want to create the skeleton of the moving character and the user being able to control it
**************************************************/
//create the character class
let user;

let numEnemyBoats = 30;
let enemyBoats = [];
let randomSeedArray = [];
let numberOfPossibleComputerMoves = 500;
let numberOfMovesPlayed = 0;

//set the intial state of the game
let state = 'simulation';
let simulationState = 'userTurn';
let userMoveDone = false;
let shootDone = false;

//sound effects in the game
let shipMoveSFX = undefined;
let cannonShootSFX = undefined;

//create the grid of the game
let grid = [];
let numColumns = 10;
let numRows = 10;

let cursorSize = 20;

let mousePressedBoolean = false;

let boatImage = undefined;

function preload() {
  shipMoveSFX = loadSound('assets/sounds/shipMoveSFX.mov');
  cannonShootSFX = loadSound('assets/sounds/cannonShootSFX.mov');
  boatImage = loadImage('assets/images/ship.png');
}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(700,700);

  //create the grid array elements
  for (let j = 0; j<numRows; j++){
   for (let i = 0; i<numColumns; i++){
     grid.push(createGridElements(width/numColumns*i+width/(2*numColumns),height/numRows*j+height/(2*numRows),0,0,random(0,100), 255));
   }
  }


  //create the user's boat
  user = new UserBoat(grid[0].x,grid[0].y);
  //enemy boat
  for (let i = 0; i<numEnemyBoats; i++){
    //place the enemy boat at a random tile in the game
    let r = int(random(0,grid.length));
    enemyBoats.push(new Enemy(grid[r].x, grid[r].y));
  };

  for (let i = 0; i<numberOfPossibleComputerMoves; i++){
    //generate a random seed for the computer to use later in its moves
    let r = int(random(0,grid.length));
    //push that number into the random seed array
    randomSeedArray.push(r);

  };


}

// draw()
//
// Description of draw() goes here.
function draw() {
  noCursor();
  background(255);

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
  //disply the boats of the user and the ennemies
  displayGrid();
  //animateGrid();
  selectTile();

  user.display();

  for (let i = 0; i<enemyBoats.length; i++){
    enemyBoats[i].display();
  }

  //create the turn based system of the program
  if (simulationState === 'userTurn'){
    userTurn()
  }
  else if (simulationState === 'computerTurn'){
    computerTurn()
  };


}

//this function is the user's round of the game
function userTurn(){
  //show the cursor so the user can see where they're putting it
  push();
  fill(255,255,255,180);
  circle(mouseX,mouseY,cursorSize);
  pop();

  //tell the user to choose a tile to move their boat
  push();
  fill(255);
  textAlign(CENTER);
  text("Choose where to move your boat", width/2, height/2);
  pop();

  //store the variable where they move their boat
  //show the places the user can move to (one tile away from the user currently)
  user.showCannonRange();

  if (mousePressedBoolean === true && userMoveDone === false){
    user.move();
  }
  else if (userMoveDone === true && shootDone === false && mousePressedBoolean === false){
    user.displayAim();
  }
  //shoot the cannon
  else if (userMoveDone === true && shootDone === false && mousePressedBoolean === true){
    cannonShootSFX.play();
    user.shoot();
  }
  else if (userMoveDone === true && shootDone == true && mousePressedBoolean === true){
    //the computer's turn now
    simulationState = 'computerTurn';
  }
}

//this function is the computer's turn in the game
function computerTurn(){
  //let the computer decide where to move their boats
  //for now the movement will be random
  for (let i = 0; i<enemyBoats.length; i++){
    let enemy = enemyBoats[i];

    enemy.move(i);
  }

};


//display the end state of the program
function end(){
  push();
  text("The End",width/2,height/2);
  pop();
}

//this function displays the grid on the screen as individual tiles with colour
function displayGrid(){
  for (let i = 0; i<grid.length; i++){
    noStroke();
    fill(grid[i].fillR, grid[i].fillG, grid[i].fillB, grid[i].transparency);
    rectMode(CENTER);
    rect(grid[i].x, grid[i].y,  grid[i].width, grid[i].height);
    fill(255);
    textAlign(CENTER);
    text(i,grid[i].x,grid[i].y);
  };
}

//this function creates the different tiles as variables 1
function createGridElements(x,y,r,g,b,transparency){
  let gridSection = {
    x: x,
    y: y,
    width:width/numColumns,
    height:height/numRows,
    fillR: r,
    fillG: g,
    fillB: b,
    transparency: transparency
  };

  return gridSection;

}

function animateGrid(){
  let time = millis();
  if (time >= 100){
    for (let i = 0; i<grid.length; i++){
      let element = int(random(0,grid.length));
      let threshold = random(0,1);
      if (threshold <= 0.001){
        grid[element].fillR = random(0,50);
        grid[element].fillG = random(0,50);
        grid[element].fillB = random(100,255);

       }
     }
  }
}

//create a function to check if the mouse is touching a tile in the grid. Returns the tile element from the grid array
function selectTile(){

  for (let i = 0; i<grid.length; i++){
    let d = dist(mouseX,mouseY,grid[i].x, grid[i].y);
    if (d<=(1.4*grid[i].width/2) && mousePressedBoolean){
      //the user has chosen this element, now return the element
      return grid[i]
      mousePressedBoolean = false
    };
  };

}

function mouseReleased(){
  mousePressedBoolean = true;
}
