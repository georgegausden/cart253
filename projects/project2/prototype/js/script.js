"use strict";

/**************************************************
Project 2 Prototype
George Gausden

In this prototype I want to create the skeleton of the moving character and the user being able to control it
**************************************************/
//create the character class
let user;

let numEnemyBoats = 2;
let enemyBoats = [];
let randomSeedArray = [];
let numberOfPossibleComputerMoves = 1000;
let numberOfMovesPlayed = 0;
let enemyShootsFinished = 0;

//set the intial state of the game
let state = 'title';
let simulationState = 'userTurn';
let userMoveDone = false;
let shootDone = false;
let enemyTurnDone = false;

//sound effects in the game
let shipMoveSFX = undefined;
let cannonShootSFX = undefined;
let cannonSoundPlayed = false;
let explosionSFX = undefined;

//create the grid of the game
let grid = [];
let waterTiles = [];
let numColumns = 10;
let numRows = 10;
//amount of grass (0 to 1)
let amountOfGrass = 0.3;
let amountOfPorts = 0.2;

let mousePressedBoolean = false;
let boatHit = false;

//load the images in the game
let landImage = undefined;
let waterImage = undefined;
let waterLightImage = undefined;
let portImage = undefined;
let boatImageRight = undefined;
let boatImageLeft = undefined;
let boatDamaged1Left = undefined;
let boatDamaged2Left = undefined;
let portDisplayImages = [];
let portDisplayImage1 = undefined;
let portDisplayImage2 = undefined;
let portDisplayImage3 = undefined;
let portDisplayImage4 = undefined;
let portDisplayImage5 = undefined;
let backgroundWaves = undefined;
let pirateImage = undefined;
let palm1 = undefined;
let palm2 = undefined;
let palm3 = undefined;
let beach = undefined;
let boatDamaged1 = undefined;
let boatDamaged2 = undefined;

//create the cannons that the user can use in the game
let userCannons = [];
let numberOfUserCannons = 5;
let numberOfEnemyCannons = 100;

//load the music
let portMusic = undefined;

//load the fonts
let medievalFont = undefined;
let pirateFont = undefined;

//create the possible port names in the game
let portNames = ['Silvercreek Harbor', 'Stormbreaker Harbor', 'Whisperwind Port', 'the Harbor Of Outvern', 'Bursport Port', 'Shrewster Port', 'Penecier Harbor']

//preloads all the assets in the game (sounds, images and fonts)
function preload() {
  shipMoveSFX = loadSound('assets/sounds/shipMoveSFX.mov');
  cannonShootSFX = loadSound('assets/sounds/cannonShootSFX.mov');
  explosionSFX = loadSound('assets/sounds/explosion.mov');
  boatImageRight = loadImage('assets/images/ship.png');
  boatImageLeft = loadImage('assets/images/shipleft.png');
  landImage = loadImage('assets/images/landImage.jpg');
  waterImage = loadImage('assets/images/waterImage.jpg');
  waterLightImage = loadImage('assets/images/waterLightImage.jpg');
  portImage = loadImage('assets/images/portImage.jpg');
  portDisplayImage1 = loadImage('assets/images/portDisplayImage.jpeg');
  portDisplayImage2 = loadImage('assets/images/portDisplayImage2.jpg');
  portDisplayImage3 = loadImage('assets/images/portDisplayImage3.jpg');
  portDisplayImage4 = loadImage('assets/images/portDisplayImage4.jpg');
  portDisplayImage5 = loadImage('assets/images/portDisplayImage5.jpg');
  pirateImage = loadImage('assets/images/pirate.png');
  boatDamaged1 = loadImage('assets/images/boatdestroyed1.png');
  boatDamaged2 = loadImage('assets/images/boatdestroyed2.png');
  boatDamaged1Left = loadImage('assets/images/boatdestroyed1left.png');
  boatDamaged2Left = loadImage('assets/images/boatdestroyed2left.png');
  palm1 = loadImage('assets/images/palm1.png');
  palm2 = loadImage('assets/images/palm2.png');
  palm3 = loadImage('assets/images/palm3.png');
  beach = loadImage('assets/images/beach.jpg');
  medievalFont = loadFont('assets/fonts/OldLondon.ttf');
  pirateFont = loadFont('assets/fonts/PirateScroll.otf');
  portMusic = loadSound('assets/sounds/portMusic.mov');
}

// setup()
//
// Creates the canvas, the grid, the user boat and the enemy boats and an array of possible enemy moves
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

  //add the indices to the tiles
  for (let i = 0; i<grid.length; i++){
    let tile = grid[i];

    tile.addIndex(i);
  }

  //create the enemy boats
  for (let i = 0; i < numEnemyBoats; i++) {
    //place the enemy boat at a random water tile in the game initially
    let r = random(waterTiles);
    enemyBoats.push(new Enemy(grid[r].x, grid[r].y));
  };

  //create the enemy cannons
  for (let i = 0; i < enemyBoats.length; i++) {
    let enemy = enemyBoats[i];

    for (let j = 0; j<numberOfEnemyCannons; j++){
      let cannon = new Cannon(undefined,undefined,undefined,undefined);
      enemy.cannons.push(cannon);
    };
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
// sets the state of the game
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

//creates the title state of the game
function title() {
  //add the background images
  imageMode(CENTER);
  image(beach, width/2, height/2, width+500, height);
  image(palm1, width/2-200, height/2+200 - 125, 300, 200);
  image(palm2, width/2+50, height/2-50 - 125, 500, 400);
  image(palm3, width/2, height/2, width, height);
  image(pirateImage, width/2, height/2 - 100, 150, 100);

  noStroke();

  //write the greetings
  push();
  textAlign(CENTER);
  textSize(50);
  textFont(pirateFont);
  fill(255);
  text("Pirates: The Sequel", width / 2, height / 2 - 200);
  textSize(25);
  text("Press 'Enter' to start the game", width/2, height/2 + 100);
  pop();

  //if enter is pressed, move to simulation
  if (keyIsDown(13)) {
    state = 'simulation'
  };
}

//the simulation of the game
function simulation() {
  //display all the elements in the simulation
  displaySimulation();
  //create the turn based system of the program
  //the turns are defined by states ("user turn", and "computer turn")
  if (simulationState === 'userTurn') {
    userTurn();
  } else if (simulationState === 'computerTurn') {
    computerTurn();
  } else if (simulationState === 'end'){
    end();
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

  if (enemyBoats.length === 0){
    simulationState = 'end';
  };



  for (let i = 0; i<enemyBoats.length; i++){
    let enemy = enemyBoats[i];

    if (enemy.moveDone === false){
      enemy.move(i);
    }
    else if (enemy.moveDone === true && enemy.shootDone === false){
      if (!cannonShootSFX.isPlaying()){
        cannonShootSFX.play();
      }
      enemy.shoot(i);
    }
    else if (enemy.moveDone === true && enemy.shootDone === true && (enemyShootsFinished === enemyBoats.length)){
      //now it is the user's turn
      simulationState = "userTurn";
    }
  }

};

//display the end state of the program
function end() {
  background(0);
  push();
  textAlign(CENTER);
  textSize(50);
  textFont(pirateFont);
  fill(255);
  text("The End!", width / 2, height / 2 - 200);
  pop();
}

//if the mouse is released, the variable switches to true, this is used in multiple functions
function mouseReleased() {
  mousePressedBoolean = true;
}

//a function to put all the elements on the simulation (basically the interface)
function displaySimulation() {
  //display the tiles in the game
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

//this function is called when the user is at sea, includes all the possible actions (moving, shooting)
function userAtSea() {
  //user.hightlightTile();


  //let the user choose where they want to move initially
  //user.selectTile();

  //show where the user can move
  user.showCannonRange();
  user.displayAim();
  console.log(shootDone)

  //the sequence of actions that the user does, choose where to move, move, shoot cannon
  if (mousePressedBoolean === false){
    user.findTile();

  } else if (mousePressedBoolean === true && userMoveDone === false) {
    user.move();
  }
  //shoot the cannon
  else if (shootDone === false && mousePressedBoolean === true && user.cannonNumber <= numberOfUserCannons - 1) {
    if (cannonSoundPlayed === false){
      cannonShootSFX.play();
      cannonSoundPlayed = true;
    }
    user.shoot();
  }

  if (shootDone === true || user.cannonNumber > numberOfUserCannons) {
    //the computer's turn now since all the actions are done
    simulationState = 'computerTurn';
  }
}

//a function to select the dock the user chose
function userShipDocked() {
  user.chosenTile.shipDocked();
}

function checkTouch(object1x,object1y,object1size, object2){

  let d = dist(object1x, object1y, object2.x, object2.y);

  if (d < (object1size/2 + object2.size/2)){
    return true;
  }
}
