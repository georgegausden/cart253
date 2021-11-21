"use strict";

/**************************************************
Project 2 Prototype
George Gausden

In this prototype I want to create the skeleton of the moving character and the user being able to control it
**************************************************/
//create the character class
let user;

let numEnemyBoats = 10;
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
let cannonSoundPlayed = false;

//create the grid of the game
let grid = [];
let waterTiles = [];
let numColumns = 10;
let numRows = 10;
//amount of grass (0 to 1)
let amountOfGrass = 0.3;
let amountOfPorts = 0.2;

let cursorSize = 20;

let mousePressedBoolean = false;

//load the images in the game
let landImage = undefined;
let waterImage = undefined;
let portImage = undefined;
let boatImage = undefined;
let portDisplayImages = [];
let portDisplayImage1 = undefined;
let portDisplayImage2 = undefined;
let portDisplayImage3 = undefined;
let portDisplayImage4 = undefined;
let portDisplayImage5 = undefined;

//create the cannons that the user can use in the game
let userCannons = [];
let numberOfUserCannons = 5;

//load the music
let portMusic = undefined;

//load the fonts
let medievalFont = undefined;

//create the possible port names in the game
let portNames = ['Silvercreek Harbor', 'Stormbreaker Harbor', 'Whisperwind Port', 'the Harbor Of Outvern', 'Bursport Port', 'Shrewster Port', 'Penecier Harbor']

function preload() {
  shipMoveSFX = loadSound('assets/sounds/shipMoveSFX.mov');
  cannonShootSFX = loadSound('assets/sounds/cannonShootSFX.mov');
  boatImage = loadImage('assets/images/ship.png');
  landImage = loadImage('assets/images/landImage.jpg');
  waterImage = loadImage('assets/images/waterImage.jpg');
  portImage = loadImage('assets/images/portImage.jpg');
  portDisplayImage1 = loadImage('assets/images/portDisplayImage.jpeg');
  portDisplayImage2 = loadImage('assets/images/portDisplayImage2.jpg');
  portDisplayImage3 = loadImage('assets/images/portDisplayImage3.jpg');
  portDisplayImage4 = loadImage('assets/images/portDisplayImage4.jpg');
  portDisplayImage5 = loadImage('assets/images/portDisplayImage5.jpg');
  medievalFont = loadFont('assets/fonts/OldLondon.ttf');
  portMusic = loadSound('assets/sounds/portMusic.mov');
}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(600, 600);

  //add all the port images into the array of port images
  portDisplayImages.push(portDisplayImage1);
  portDisplayImages.push(portDisplayImage2);
  portDisplayImages.push(portDisplayImage3);
  portDisplayImages.push(portDisplayImage4);
  portDisplayImages.push(portDisplayImage5);

  //create the grid elements (the individual tiles)
  for (let j = 0; j < numRows; j++) {
    for (let i = 0; i < numColumns; i++) {
      let r = random(0, 1);
      if (r < amountOfGrass) {
        let r2 = random(0, 1);
        if (r2 < amountOfPorts) {
          grid.push(new PortTile(width / numColumns * i + width / (2 * numColumns), height / numRows * j + height / (2 * numRows), 0, 0, random(0, 100), 255, 'port', random(portNames), random(portDisplayImages)));
        } else {
          grid.push(new LandTile(width / numColumns * i + width / (2 * numColumns), height / numRows * j + height / (2 * numRows), 0, 0, random(0, 100), 255, 'land'));
        }
      } else {
        grid.push(new WaterTile(width / numColumns * i + width / (2 * numColumns), height / numRows * j + height / (2 * numRows), 0, 0, random(0, 100), 255, 'water'));
      }
    }
  }

  //create the user's boat
  user = new UserBoat(grid[0].x, grid[0].y);

  //create the user's cannons
  for (let i = 0; i < numberOfUserCannons; i++) {
    let cannon = new Cannon(undefined,undefined,undefined,undefined);
    user.cannons.push(cannon);
  };

  //define all the water tiles
  for (let i = 0; i < grid.length; i++) {
    let tile = grid[i];
    //create a list of the possible tiles the computer can move to
    if (tile.type === 'water') {
      waterTiles.push(i);
    }
  };

  //create the enemy boats
  for (let i = 0; i < numEnemyBoats; i++) {
    //place the enemy boat at a random water tile in the game initially
    let r = random(waterTiles);
    enemyBoats.push(new Enemy(grid[r].x, grid[r].y));
  };

  //create the possible moves for the computer
  for (let i = 0; i < numberOfPossibleComputerMoves; i++) {
    //generate a random seed for the computer to use later in its moves
    //check to see that the position is water and not land first
    let r = random(waterTiles);
    //push that number into the random seed array
    randomSeedArray.push(r);
  }
}

// draw()
//
// Description of draw() goes here.
function draw() {
  //the three possible states of the game are title(), simulation() and end()
  if (state === 'title') {
    title();
  } else if (state === 'simulation') {
    simulation();
  } else if (state === 'end') {
    end();
  }
}

//create the states for the game
function title() {
  background(255);

  push();
  textSize(50);
  textAlign(CENTER);
  text("Title Page", width / 2, height / 2);
  pop();

  if (keyIsDown(13)) {
    state = 'simulation'
  };
}

function simulation() {
  //display all the elements in the simulation
  displaySimulation();
  //create the turn based system of the program
  if (simulationState === 'userTurn') {
    userTurn()
  } else if (simulationState === 'computerTurn') {
    computerTurn()
  };

}

//this function is the user's round of the game
function userTurn() {
  //check to see whether the user is at sea, or is docked at a port
  if (user.state === "atSea") {
    userAtSea();
  } else if (user.state === "shipDocked") {
    userShipDocked();
  }
}

//this function is the computer's turn in the game
function computerTurn() {
  //let the computer decide where to move their boats
  //for now the movement will be random
  for (let i = 0; i < enemyBoats.length; i++) {
    let enemy = enemyBoats[i];

    enemy.move(i);
  }

};

//display the end state of the program
function end() {
  push();
  text("The End", width / 2, height / 2);
  pop();
}


function mouseReleased() {
  mousePressedBoolean = true;
}

//a function to put all the elements on the simulation
function displaySimulation() {
  //display the boats of the user and the ennemies
  for (let i = 0; i < grid.length; i++) {
    let tile = grid[i];
    tile.display();
  }
  //display the user in the simulation
  user.display();
  //display the computer player in the simulation
  for (let i = 0; i < enemyBoats.length; i++) {
    enemyBoats[i].display();
  }
}

function userAtSea() {
  //let the user choose where they want to move initially
  user.selectTile();

  //show where the user can move
  //user.showCannonRange();

  if (mousePressedBoolean === true && userMoveDone === false) {
    user.move();
  } else if (userMoveDone === true && shootDone === false && mousePressedBoolean === false && user.cannonNumber <= numberOfUserCannons -  1) {
    user.displayAim();
  }
  //shoot the cannon
  else if (shootDone === false && mousePressedBoolean === true && user.cannonNumber <= numberOfUserCannons - 1) {
    if (cannonSoundPlayed === false){
      cannonShootSFX.play();
      cannonSoundPlayed = true;
    }
    user.shoot();
  } else if (shootDone === true || user.cannonNumber > numberOfUserCannons) {
    //the computer's turn now
    simulationState = 'computerTurn';
  }
}

function userShipDocked() {
  user.chosenTile.shipDocked();
}
