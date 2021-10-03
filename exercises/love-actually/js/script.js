"use strict";

/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let timeMilli = undefined;

let livingRoom = undefined;

let circle1 = {
  x:undefined,
  y:250,
  size:150,
  vx:3,
  vy:3,
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

let state = "title"; // can be:title, simulation, love, sadness
// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(500,500);
  setupCircles();
}

function preload(){
  circle1.image = loadImage('assets/images/user.png');
  circle2.image = loadImage('assets/images/cat.png');
  livingRoom = loadImage('assets/images/livingRoom.png');

}
// draw()
//
// Description of draw() goes here.
function draw() {

  setupBackground();

  if (state === "title"){
    title();
  }
  else if (state === "simulation"){
    simulation();
  }
  else if (state === "love"){
    love();
  }
  else if (state === "sadness"){
    sadness();
  }

}


function title(){
  push();
  textSize(64);
  fill(200,100,100);
  textAlign(CENTER,CENTER);
  text("Babes escaped!\nGo find her!", width/2, height/2);
  pop();
}

function simulation(){
  move();
  checkOffscreen();
  checkOverlap();
  display();

}

function move(){
  //move the circles
  //let user control the circle 1 position with the arrow keys

  if (keyIsDown(37)){
    circle1.x -= circle1.vx;
  }
  else if (keyIsDown(39)){
    circle1.x += circle1.vx;
  }
  else if (keyIsDown(38)){
    circle1.y -= circle1.vy;
  }
  else if (keyIsDown(40)){
    circle1.y += circle1.vy;
  }

  //make the other circle pop up in random places on the screen

  circle2.x+=circle2.vx;
  circle2.y+=circle2.vy;
}

function checkOffscreen(){
  //check if theyve gone off screen
  if (circle1.x<0||circle1.x>width||circle1.y<0||circle1.y>height||circle2.x<0||circle2.x>width||circle2.y<0||circle2.y>height){
    //sad ending
    state = "sadness";
  }

}

function checkOverlap(){
  //check if the circles overlap
  let d = dist(circle1.x,circle1.y,circle2.x,circle2.y)
  if (d<circle1.size/2+circle2.size/2){
    //love ending
    state = "love";
  }

}

function display(){
  //display the characters (the cat and the user)
  image(circle1.image,circle1.x,circle1.y,circle1.size, circle1.size);
  image(circle2.image, circle2.x,circle2.y,circle2.size, circle2.size);
}

function setupCircles(){
  //position circles from one another
  circle1.x = width/3;
  circle2.x = 2* width/3;
  //setup sppeds in random directions

  circle1.vy = random(-circle1.speed, circle1.speed);
  circle2.vy = random(-circle2.speed, circle2.speed);
}

function mousePressed(){
  if (state === "title"){
    state = "simulation";
  }
}

function love(){
  push();
  textSize(64);
  fill(255,150,150);
  textAlign(CENTER,CENTER);
  text("You found babes!", width/2, height/2);
  pop();
}

function sadness(){
  push();
  textSize(64);
  fill(255,150,150);
  textAlign(CENTER,CENTER);
  text("Babes is gone :(", width/2, height/2);
  pop();
}

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

function createLivingRoom(){
  //set the living room up
  imageMode(CENTER);
  image(livingRoom, width/2, height/2, width, height);
}

function setupBackground(){
  changeBackground();
  createLivingRoom();
}
