"use strict";

/**************************************************
Project 1
George Gausden

Here is a description of this template p5 project.
**************************************************/
//create the javascript objects and the variables in the program

//setup the initial state as the title
let buttonElements = {
  r: 200,
  g: 200,
  b: 250,
  textR: 100,
  textG: 100,
  textB: 255
}

let score = 1;

let state = "title";

let lighten = 50;

let livesi = 5;
let lives = undefined;

let heart;

//how curved our buttons are
let buttonCurvature = 50;

let sounds = {
  explosion: undefined,
  click: undefined,
  levelUp: undefined,
  backgroundMusic: undefined,
}

//create the user character as a circle to start with
let user = {
  x: undefined,
  y: undefined,
  vx: 0,
  vy: 0,
  ax: 0.2,
  maxSpeed: 4,
  maxAcceleration: 3,
  size: 40,
  vi: 0,
  image: undefined
};
let backgroundWaves = undefined;

let cannonball = undefined;
//create an array for the objects
let objects = [];

let object;

let object2;

//preload our images and sounds for the program
function preload() {
  sounds.explosion = loadSound('assets/sounds/explosion.mov');
  sounds.click = loadSound('assets/sounds/click.mov');
  sounds.levelUp = loadSound('assets/sounds/levelUp.mov');
  sounds.backgroundMusic = loadSound('assets/sounds/backgroundMusic.mov');
  heart = loadImage('assets/images/heart.png');
  user.image = loadImage('assets/images/ship.png');
  cannonball = loadImage('assets/images/cannonball.png');
  backgroundWaves = loadImage('assets/images/waves.png');

}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(600, 600);
  user.x = width / 4;
  user.y = height / 2;


  for (let i = 0; i<100; i++){
    objects[i] = generateObjectVariable();
  }

  lives = livesi;
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(140, 200, 200);
  //setup the title, simulation and end states
  if (state === "title") {
    title();
  } else if (state === "instructions") {
    instructions();
  } else if (state === "simulation") {
    simulation();
  } else if (state === "lostLifeScreen") {
    lostLifeScreen();
  } else if (state === "end") {
    end();
  }
}

//create the title function
function title() {

  noStroke();

  let instructionsButton = createButtonVariable(width / 4, height / 2, 200, 100, "Instructions", 32);
  drawButton(instructionsButton);

  let playButton = createButtonVariable(3 * width / 4, height / 2, 200, 100, "Play", 32);
  drawButton(playButton);

  //write the greetings
  createText("Welcome to the game", width / 2, height / 2 - 200, 200, 100, 255, 32);

  //let the user click
  if (checkInButton(instructionsButton.x, instructionsButton.y, instructionsButton.width, instructionsButton.height)) {
    state = "instructions";
    sounds.click.play();
  } else if (checkInButton(playButton.x, playButton.y, playButton.width, playButton.height)) {
    state = "simulation";
    sounds.click.play();
  }
}

//create an instructions page for the user to understand the game
function instructions() {
  //createButtonVariable(x,y,width,height,fillR, fillG, fillB, text, textFillR, textFillG, textFillB, fontSize))
  let backToMenu = createButtonVariable(width / 2, (height / 2 + 200), 200, 100, "Back to menu", 25);
  drawButton(backToMenu);

  createText("To play, use 'A' and 'D'\n to move left and right\n and 'W' and 'S' to move up and down", width / 2, height / 2 - 150, 100, 100, 255, 32);


  if (checkInButton(backToMenu.x, backToMenu.y, backToMenu.width, backToMenu.height)) {
    sounds.click.play();
    state = "title";
  }
}

//create the simulation function
function simulation() {
  //create the UI of the simulation
  simulationInterface();
  //create the user in the game
  displayUser();
  //move the user in the game
  moveUser();
  //create an object that's randomly generated
  for (let key = 0; key<score; key++){
    createObject(objects[key]);
    moveObject(objects[key]);
    checkTouch(objects[key]);
    loseLife(objects[key]);
  }

  //regenerate the object if one of them leaves the canvas
  levelUp(objects[0]);


  //check if the user touches one of the objects


  //if check touch is true, lose one life for the user

  //check the amount of lives left for the user
  checkLives();

}

//create the endscreen function
function end() {

  let mainMenu = createButtonVariable(width / 2, (height / 2 - 100), 200, 100, "Main Menu", 32);
  drawButton(mainMenu);

  createText("This is the end", width / 2, height / 2 - 200, 100, 100, 255, 32);

  //reset the lives and the position of the objects
  if (checkInButton(mainMenu.x, mainMenu.y, mainMenu.width, mainMenu.height)) {
    sounds.click.play();
    resetGame();
    state = "title";
  }
}

function createText(textString, x, y, fillR, fillG, fillB, fontsize) {
  let writing = {
    text: textString,
    x: x,
    y: y,
    fill: {
      r: fillR,
      g: fillG,
      b: fillB
    },
    fontSize: fontsize
  }

  //display the end message at the top of the screen
  push();
  textSize(writing.fontSize);
  fill(writing.fill.r, writing.fill.g, writing.fill.b);
  textAlign(CENTER, CENTER);
  text(writing.text, writing.x, writing.y);
  pop();

}
//creates the user character
function displayUser() {
  push();
  fill(0);
  imageMode(CENTER);
  image(user.image, user.x, user.y, user.size, user.size);
  pop();
}

//moves the character
function moveUser() {
  //we want to make the user accelerate depending on the A and D and W and S characters of the keyboard
  user.x += user.vx;
  user.y += user.vy;

  //make the user accelerate depending on if they have the d or the a key pressed
  if (keyIsDown(68)) {
    user.vx += user.ax;
    //cap the speed so we're not going too fast
    user.vx = constrain(user.vx, -user.maxSpeed, user.maxSpeed);
  } else if (keyIsDown(65)) {
    user.vx -= user.ax;
    user.vx = constrain(user.vx, -user.maxSpeed, user.maxSpeed);
  } else if (keyIsDown(87)) {
    user.vy -= user.ax;
    user.vy = constrain(user.vy, -user.maxSpeed, user.maxSpeed);
  } else if (keyIsDown(83)) {
    user.vy += user.ax;
    user.vy = constrain(user.vy, -user.maxSpeed, user.maxSpeed);
  }

  userMoveConstraints();

}

//generate object variable
function generateObjectVariable(name) {
  let object = {
    xi: width,
    yi: random(0, height),
    x: width,
    y: random(0, height),
    vxi: -2,
    vx: -2,
    vy: 0,
    sizei: 20,
    size: 20,
  };
  return object;
}


//create an object we need to dodge
function createObject(objectName) {
  //generate the shape
  push();
  fill(0);
  image(cannonball,objectName.x, objectName.y, objectName.size, objectName.size);
  pop();

}

//a function to control the movement of the object
function moveObject(objectName) {
  //xPosition += vx;
  objectName.x += objectName.vx;

}

//check to see if the user touched one of the objects
function checkTouch(objectName) {
  //check that the user and the user and the object are touching or not
  //find the distance between the user and any object

  let d = dist(user.x, user.y, objectName.x, objectName.y);

  if (d <= (user.size / 2 + objectName.size / 2)) {
    return true;
  }else {
    return false;
    }
}

//checks the number of lives left for the user. If it's equal to 0, lose
function checkLives() {
  if (lives === 0) {
    state = "end";
  }
}

//makes the user lose a life if it's touching an object
function loseLife(objectName) {

  if (checkTouch(objectName)) {
    lives = lives - 1;
    //play the sound of explosion
    sounds.explosion.play();
    //reposition the user immediately and stop the movement
    resetUserPosition();
    state = "lostLifeScreen";
  }
}

//create a new state to display that we lost a life and either we can continue or end game
function lostLifeScreen() {
  //display the two options of continuing or ending
  let continuePlayingButton = createButtonVariable(width / 4, height / 2, 200, 100, "Continue Playing", 20);
  drawButton(continuePlayingButton);

  let endGameButton = createButtonVariable(3 * width / 4, height / 2, 200, 100, "End Game", 20);
  drawButton(endGameButton);

  //display the number of lives left for the user
  displayLives();

  //let the user pick one of the other
  if (checkInButton(continuePlayingButton.x, continuePlayingButton.y, continuePlayingButton.width, continuePlayingButton.height)) {
    sounds.click.play();
    resetObjetPositionInGame();

    state = "simulation";
  } else if (checkInButton(endGameButton.x, endGameButton.y, endGameButton.width, endGameButton.height)) {
    sounds.click.play();
    state = "end";
  }

}

//checks if mouse is clicking and in button, returns boolean value. Works for rectangles only for now
function checkInButton(xPosition, yPosition, shapeWidth, shapeHeight) {
  if ((mouseX >= xPosition - shapeWidth / 2) && (mouseX <= xPosition + shapeWidth / 2) && (mouseIsPressed) && (mouseY < yPosition + shapeHeight / 2) && (mouseY > yPosition - shapeHeight / 2)) {
    return true;
  } else {
    return false;
  }
}

//create a reset button and the background
function simulationInterface() {
  //create a reset button so the user can restart the game
  //funBackground();
  imageMode(CENTER);
  image(backgroundWaves, width/2, height/2, width, height);

  displayLives(width / 2 + 40, height / 2 - 250);
  //keep track of the user's score as the objects leave the canvas
  scoreDisplay();
  //display a restart button in case the user wants to restart the game
  restartButton();
}

//reset game function
function resetGame() {
  //reset lives and positions
  for (let key = 0; key<score; key++){
    objects[key].size = objects[key].sizei;
    objects[key].x = objects[key].xi;
    objects[key].y = objects[key].yi;
    objects[key].vx = objects[key].vxi;
  }
  score = 1;
  lives = livesi;
  state = "simulation";


}


//reset the position and velocity of the user
function resetUserPosition() {
  user.x = width / 4;
  user.y = height / 2;
  user.vx = 0;
  user.vy = 0;
}

//create a fun dynamic background
function funBackground() {
  //create different blocks randomly
  let seconds = second();

  if (seconds = 10) {
    //generate a square
    rectMode(CENTER);
    fill(random(0, 255), random(0, 255), random(0, 255));
    rect(random(0, width), random(0, height), random(50, 100));

  }
}

//check to see if mouse is hovering over a button. Returns boolean value
function isHovering(xPosition, yPosition, shapeWidth, shapeHeight) {
  if ((mouseX >= xPosition - shapeWidth / 2) && (mouseX <= xPosition + shapeWidth / 2) && (mouseY < yPosition + shapeHeight / 2) && (mouseY > yPosition - shapeHeight / 2)) {
    return true;
  } else {
    return false;
  }
}

//create a function to lighten the box
function lightenButton(xPosition, yPosition, shapeWidth, shapeHeight, fillR, fillG, fillB) {
  if (isHovering(xPosition, yPosition, shapeWidth, shapeHeight)) {
    fill(fillR + lighten, fillG + lighten, fillB + lighten);
  } else {
    fill(fillR, fillG, fillB);
  }
}

//display the hearts (lives)
function displayLives(xPosition, yPosition) {
  //display the number of lives in the top right corner
  let numberLives = lives;
  let spacing = 50;
  let numberOfHearts = lives;
  let yposition = height / 2 - 250;
  let xposition = width / 2 - 40
  let heartSize = 50;

  while (numberOfHearts > 0) {
    //keep count of how many lives are left as heart images
    imageMode(CENTER);
    image(heart, xposition + numberOfHearts * spacing, yposition, heartSize, heartSize);
    numberOfHearts -= 1;
  }

}

//function to create a button and place it on the canvas and make it lighten up when the user hovers over it
function createButtonVariable(x, y, width, height, text, fontSize) {
  let button = {
    x: x,
    y: y,
    width: width,
    height: height,
    fill: {
      r: buttonElements.r,
      g: buttonElements.g,
      b: buttonElements.b,
    },
    text: text,
    textFill: {
      r: buttonElements.textR,
      g: buttonElements.textG,
      b: buttonElements.textB
    },
    fontSize: fontSize,
    image: cannonball,
  }
  return button;
}

//draw the button on the screen
function drawButton(button) {
  push();
  fill(button.fill.r, button.fill.g, button.fill.b);
  rectMode(CENTER);
  lightenButton(button.x, button.y, button.width, button.height, button.fill.r, button.fill.g, button.fill.b);
  rect(button.x, button.y, button.width, button.height, buttonCurvature);
  pop();

  //be able to go back to the main menu
  push();
  textSize(button.fontSize);
  fill(button.textFill.r, button.textFill.g, button.textFill.b);
  textAlign(CENTER, CENTER);
  text(button.text, button.x, button.y);
  pop();
}

//function that restarts the objects in random locations
function levelUp(objectName) {
  if (objectName.x < 0) {
    sounds.levelUp.play();
    for (let key = 0; key<objects.length; key++){
      objects[key].x = width;
      objects[key].y = random(0,height);
      objects[key].vx -= 0.7;
      objects[key].size += 5;
    }

    //add a score of 1 since we dodged the object
    score += 1;

    }


}


//function that resets the position of the object
function resetObjetPositionInGame() {
  for (let key = 0; key<objects.length; key++){
    objects[key].x = objects[key].xi;
    objects[key].y = objects[key].yi;
  }

}

//keep track of the score
function scoreDisplay() {
  //create a text displaying the level in the top left corner
  createText("Level: " + score, width / 4, 50, 255, 255, 100, 30);
}

//reset the velocity and position of the object if we restart the game
function resetObjetAtEnd() {
  object.x = object.xi;
  object.y = object.yi;
  object.vx = object.vxi;
  object.size = object.sizei;

}

//create the background music for the game
function mousePressed() {
  if (!sounds.backgroundMusic.isPlaying()) {
    sounds.backgroundMusic.loop();
  }

}

//make a function so we don't get stuck to the side of the frame and don't leave the canvas
function userMoveConstraints() {
  user.x = constrain(user.x, 0, width);
  user.y = constrain(user.y, 0, height);

  //if user touches the edge, put their velocity back to 0 so that we don't just stick to the frame
  if (user.x === width) {
    user.x -= 1;
    user.vx = 0;
    user.vy = 0;
  } else if (user.x === 0) {
    user.x += 1;
    user.vx = 0;
    user.vy = 0;
  } else if (user.y === height) {
    user.y -= 1;
    user.vx = 0;
    user.vy = 0;
  } else if (user.y === 0) {
    user.y += 1;
    user.vx = 0;
    user.vy = 0;
  }
}

//create a restart button
function restartButton() {
  //create the restart button variable
  let restartButton = createButtonVariable(3 * width / 4, 125, 150, 50, "Restart", 30);
  //draw it on the screen
  drawButton(restartButton);

  if (checkInButton(restartButton.x, restartButton.y, restartButton.width, restartButton.height)) {
    sounds.click.play();
    resetGame();

  }
}

console.log(objects);
