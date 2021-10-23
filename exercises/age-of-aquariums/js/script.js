/**
Age of Aquariums
George Gausden

In the Save The Fishies game, the user controls a fish and must save the fish from the infected red fish.
*/

"use strict";

//set up the arrays in the game

//this is the initial school size
let school = [];
let schoolSize = 100;
let distanceOfInfection = 0;

//create the array for infected fish
let infectedFish = [];
let initialInfected = 1;

//create the immune fish and the doctor (user) role
let immuneFish = [];
let doctorFish = undefined;
let initialImmune = 1;

//set the initial state as title
let state = "title";

//setup the images for when we win the game
let firework1 = undefined;
let firework2 = undefined;
let firework3 = undefined;
let firework4 = undefined;

let time = undefined;

/**
Preloads the images used in the end state
*/
function preload() {
  //load the images
  firework1 = loadImage('assets/images/firework1.gif');
  firework2 = loadImage('assets/images/firework2.gif');
  firework3 = loadImage('assets/images/firework3.gif');
  firework4 = loadImage('assets/images/firework4.gif');
}


/**
sets up the initial arrays and creates the doctor role for the user
*/
function setup() {
  createCanvas(600, 600);

  for (let i = 0; i < schoolSize; i++) {
    let fish = createFish(random(0, width), random(0, height), 0, 0, 255);
    school.push(fish);
  }

  for (let i = 0; i < initialInfected; i++) {
    let fish = createFish(random(0, width), random(0, height), 255, 0, 0);
    infectedFish.push(fish);
  }

  //the doctor fish is the one controlled by the user
  let doctorFish = createFish(random(0, width), random(0, height), 0, 255, 255);
  immuneFish.push(doctorFish);

}

//this function creates fish variables
function createFish(x, y, r, g, b) {
  let fish = {
    x: x,
    y: y,
    size: 20,
    vx: 0,
    vy: 0,
    speed: 3,
    r: r,
    g: g,
    b: b,
  };
  return fish;
}

/**
Draw() goes through the game states
*/
function draw() {
  background(255);

  if (state === "title") {
    title();
  } else if (state === "simulation") {
    simulation();
  } else if (state === "end") {
    end();
  }
}

//create the title page
function title() {

  if (keyIsPressed === true) {
    state = "simulation";
  }

  push();
  textAlign(CENTER, CENTER);
  textSize(60);
  text("SAVE THE FISHIES", width / 2, height / 2 - 100);
  pop();

  push();
  textAlign(CENTER, CENTER);
  textSize(40);
  text("Press any key to continue", width / 2, height / 2 + 100);
  pop();

  time = millis();

  //create a background moving
  push();
  noStroke();
  fill(0,0,255,100);
  circle(width/2,height/2-1/10*time, 50);
  circle(width/2-100,height-1/10*time, 100);
  circle(width/2-200,height-1/12*time, 50);
  circle(width/2+30,height+20-1/5*time, 200);
  circle(width/2-50,height-1/10*time, 200);
  circle(width/2-300,height+100-1/15*time, 50);
  circle(width/2+300,height+20-1/16*time, 70);
  pop();

}

//create the simulation page
function simulation() {
  for (let i = 0; i < school.length; i++) {
    moveFish(school[i]);
    displayFish(school[i]);
  };

  for (let i = 0; i < infectedFish.length; i++) {
    moveFish(infectedFish[i]);
    displayFish(infectedFish[i]);
  };

  for (let i = 1; i < immuneFish.length; i++) {
    moveFish(immuneFish[i]);
    displayFish(immuneFish[i]);
  };

  displayFish(immuneFish[0]);
  move_doctor_fish();

  //if the doctor fish touches a normal fish, it gets immune
  //the doctor fish is the immuneFish[0]

  for (let i = 0; i < school.length; i++) {
    if (checkTouch(immuneFish[0], school[i])) {
      //recolour the fish to immune
      school[i].r = 0;
      school[i].g = 255;
      school[i].b = 0;
      //put the regular fish into the immune ones
      immuneFish.push(school[i]);
      //remove the healthy fish from the school
      school.splice(i, 1);
    }
  };

  //check if the infected fish comes into contact with a normal fish
  //go through each array
  //checkTouch();
  for (let i = 0; i < school.length - 1; i++) {
    for (let j = 0; j < infectedFish.length; j++) {
      if (school.length > 0) {
        if (checkTouch(infectedFish[j], school[i])) {
          //recolour the fish to infected
          school[i].r = 255;
          school[i].g = 0;
          school[i].b = 0;
          //put the healthy fish into the infected one
          infectedFish.push(school[i]);
          //remove the healthy fish from the array of school
          school.splice(i, 1);
        }
      }
    }
  };

  //check to see if there are any normal fish left. If not, end the game
  if (school.length === 0) {
    state = "end";
  };
}

//create the end page
function end() {
  //display the number of infected and immune fish

  if (infectedFish.length > immuneFish.length) {
    push();
    textAlign(CENTER, CENTER);
    textSize(60);
    background(0);
    fill(255);
    text("You Lose!", width / 2, height / 2 - 100);
    textSize(40);
    text("Infected: " + infectedFish.length, width / 2, height / 2);
    text("Immune: " + immuneFish.length, width / 2, height / 2 + 100);
    pop();
  } else if (infectedFish.length <= immuneFish.length) {
    push();
    textAlign(CENTER, CENTER);
    textSize(60);
    text("You Won!", width / 2, height / 2 - 100);
    textSize(40);
    text("Infected: " + infectedFish.length, width / 2, height / 2);
    text("Immune: " + immuneFish.length, width / 2, height / 2 + 100);
    pop();

    //display the fireworks images
    imageMode(CENTER);
    image(firework1, width / 2 - 200, height / 2, 300, 300);
    image(firework2, width / 2 + 300, height / 2 - 100, 300, 300);
    image(firework3, width / 2, height / 2 + 100, 300, 300);
    image(firework4, width / 2 - 200, height / 2, 300, 300);
  }

}

//a function to move each fish randomly through the game
function moveFish(fish) {
  let change = random(0, 1);
  if (change < 0.05) {
    fish.vx = random(-fish.speed, fish.speed);
    fish.vy = random(-fish.speed, fish.speed);
  }

  fish.x += fish.vx;
  fish.y += fish.vy;

  fish.x = constrain(fish.x, 0, width);
  fish.y = constrain(fish.y, 0, height);
}

//a function to display each type of fish
function displayFish(fish) {
  push();
  fill(fish.r, fish.g, fish.b);
  noStroke();
  ellipse(fish.x, fish.y, fish.size);
  pop();
}

//a function that checks if two fish have touched
function checkTouch(fish1, fish2) {

  let d = dist(fish1.x, fish1.y, fish2.x, fish2.y);

  if (d <= (fish1.size / 2 + fish2.size / 2 + distanceOfInfection)) {
    return true;
  }
}

//a function that allows the user to control the movement of the doctor fish
function move_doctor_fish() {
  immuneFish[0].x = mouseX;
  immuneFish[0].y = mouseY;
}
