"use strict";

/**************************************************
Exercise: Love, actually
George Gausden

Here is a description of this template p5 project.
**************************************************/

//set the javascript objects and variables

let timeMilli = undefined;

let livingRoom = undefined;

let circle1 = {
  x:undefined,
  y:250,
  size:150,
  vx:0,
  vy:0,
  speed:3,
  image: undefined
}

let circle2 = {
  x:undefined,
  y:250,
  size:100,
  vx:0,
  vy:0,
  speed:0,
  image: undefined
}

//set the initial state of the program

let state = "title"; // can be: title, simulation, caught, escaped, sofa
// setup()
//
// setup() creates the canvas and the user and cat
function setup() {
  createCanvas(500,500);
  setupCircles();
}

//preload() sets the images we're using in the program
function preload(){
  circle1.image = loadImage('assets/images/user.png');
  circle2.image = loadImage('assets/images/cat.png');
  livingRoom = loadImage('assets/images/livingRoom.png');

}
// draw()
//
// draw() runs the program, including all the different possible states of the program
function draw() {

  setupBackground();

  //the different states of the program which depend on the movement of the user and the cat
  if (state === "title"){
    title();
  }
  else if (state === "simulation"){
    simulation();
  }
  else if (state === "caught"){
    caught();
  }
  else if (state === "escaped"){
    escaped();
  }
  else if (state === "sofa"){
    sofa();
  }

}

//title() sets the title of the program and the goal of the game
function title(){
  push();
  textSize(64);
  fill(100,100,255);
  textAlign(CENTER,CENTER);
  text("Babes escaped!\nGo catch her!", width/2, height/2);
  pop();
}

//simulation() makes the program interactive, checks the position of the cat and sets the speeds and positions of each character
function simulation(){
  move();
  checkOffscreen();
  checkOverlap();
  checkSofa();
  display();

}

//move() alters the x and y position as well as velocities of each character
function move(){
  //move the circles
  //let user control the user position with the arrow keys

  if (keyIsDown(37)){
    circle1.vx = circle1.speed;
    circle1.x -= circle1.vx;
  }
  else if (keyIsDown(39)){
    circle1.vx = circle1.speed;
    circle1.x += circle1.vx;
  }
  else if (keyIsDown(38)){
    circle1.vy = circle1.speed;
    circle1.y -= circle1.vy;
  }
  else if (keyIsDown(40)){
    circle1.vy = circle1.speed;
    circle1.y += circle1.vy;
  }

  //make the cat run away from the user

  circle2.x += circle1.vx/2;
  circle2.y += circle1.vy/2;
}

//checkOffscreen() checks to see if the cat has escaped the scene
function checkOffscreen(){
  //check if the cat has gone off the screen
  if (circle2.x<0||circle2.x>width||circle2.y<0||circle2.y>height){
    //the cat escaped state
    state = "escaped";
  }

}

//checkOverlap() checks to see if the user has caught the cat
function checkOverlap(){
  //check if the characters overlap
  let d = dist(circle1.x,circle1.y,circle2.x,circle2.y)
  if (d<circle1.size/2+circle2.size/2){
    //caught ending
    state = "caught";
  }

}

//checkSofa() checks to see if the cat has landed on the sofa
function checkSofa(){
  //check to see if the cat is on the sofa
  //stroke(100);
  //if the cat touches this line, then we are in sofa state
  if (circle2.x >= 200 && circle2.x <= 425 && circle2.y >= 350 && circle2.y <= 390){
    state = "sofa";
  }
}

//display() displays the characters with their images
function display(){
  //display the characters (the cat and the user)
  image(circle1.image,circle1.x,circle1.y,circle1.size, circle1.size);
  image(circle2.image, circle2.x,circle2.y,circle2.size, circle2.size);
}

//setupCircles() sets the initial positions of the characters
function setupCircles(){
  //position circles from one another
  circle1.x = width/3;
  circle2.x = 2* width/3;
  //setup sppeds in random directions

  circle1.vy = random(-circle1.speed, circle1.speed);
  circle2.vy = random(-circle2.speed, circle2.speed);
}

//mousePressed() changes the initial state so that the simulation starts when the user presses the mouse
function mousePressed(){
  if (state === "title"){
    state = "simulation";
  }
}

//caught() ends the program when the cat is caught and displays the info
function caught(){
  push();
  textSize(64);
  fill(255,150,150);
  textAlign(CENTER,CENTER);
  text("You found babes!", width/2, height/2);
  pop();
}

//escaped() displays the state of the cat when it's caught
function escaped(){
  push();
  textSize(64);
  fill(0,0,255);
  textAlign(CENTER,CENTER);
  text("Babes escaped :(", width/2, height/2);
  pop();
}

//changeBackground() changes the colour of the background as the program progresses
function changeBackground(){
  //make the background color change as time progresses
  timeMilli = millis();
  let heartRacing = 0.1;
  heartRacing += timeMilli/100000;

  let bg = {
    //as time progresses make the red get faster and faster like a heart racing
    r: sin(heartRacing*(radians(timeMilli)))*1000,
    g: 0,
    b: 0,
  };

  background(bg.r,bg.g,bg.b);

}

//createLivingRoom() sets the background image of the living room
function createLivingRoom(){
  //set the living room up
  imageMode(CENTER);
  image(livingRoom, width/2, height/2, width, height);
}

//setupBackground() sets the full background with the colour as well
function setupBackground(){
  changeBackground();
  createLivingRoom();
}

//sofa() is the state where the cat is resting on the sofa, this function displays that info and ends the program
function sofa(){
  push();
  textSize(64);
  fill(0,0,255);
  textAlign(CENTER,CENTER);
  text("Babes is\n on the sofa!", width/2, height/2);
  pop();
}
