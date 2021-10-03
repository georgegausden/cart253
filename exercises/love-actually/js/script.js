"use strict";

/**************************************************
Exercise: Love, actually
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

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
  else if (state === "sofa"){
    sofa();
  }

}


function title(){
  push();
  textSize(64);
  fill(100,100,255);
  textAlign(CENTER,CENTER);
  text("Babes escaped!\nGo catch her!", width/2, height/2);
  pop();
}

function simulation(){
  move();
  checkOffscreen();
  checkOverlap();
  checkSofa();
  display();

}

function move(){
  //move the circles
  //let user control the circle 1 position with the arrow keys

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

function checkSofa(){
  //check to see if the cat is on the sofa
  //stroke(100);
  //if the cat touches this line, then we are in sofa state
  if (circle2.x >= 200 && circle2.x <= 425 && circle2.y >= 350 && circle2.y <= 390){
    state = "sofa";
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
  fill(0,0,255);
  textAlign(CENTER,CENTER);
  text("Babes escaped :(", width/2, height/2);
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

function sofa(){
  push();
  textSize(64);
  fill(0,0,255);
  textAlign(CENTER,CENTER);
  text("Babes is\n on the sofa!", width/2, height/2);
  pop();
}
