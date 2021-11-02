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
let state = 'simulation';
let simulationState = 'userTurn';

//create the grid of the game
let grid = [];
let numColumns = 10;
let numRows = 10;

let cursorSize = 50;

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(600,600);

  //create the grid array elements
  for (let j = 0; j<numRows; j++){
   for (let i = 0; i<numColumns; i++){
     grid.push(createGridElements(width/numColumns*i,height/numRows*j,0,0,random(0,100), 255));
   }
  }


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
  animateGrid();
  user.display();
  enemy.display();

  //create the turn based system of the program
  if (simulationState === 'userTurn'){
    userTurn()
  }
  else if (simulationState === 'computerTurn'){
    computerTurn()
  };


}

function userTurn(){
  //show the cursor so the user can see where they're putting it
  push();
  fill(255,255,255,180);
  circle(mouseX,mouseY,cursorSize);
  pop();


  //let the user decide where to move their Boat

}

function computerTurn(){
  //let the computer decide where to move their boats

}

function end(){
  push();
  text("The End",width/2,height/2);
  pop();
}


function displayGrid(){
  for (let i = 0; i<grid.length; i++){
    noStroke();
    fill(grid[i].fillR, grid[i].fillG, grid[i].fillB, grid[i].transparency);
    rect(grid[i].x, grid[i].y,  grid[i].width, grid[i].height);
  };
}

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

console.log(grid)
