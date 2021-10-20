/**
Age of Aquariums
George Gausden

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let school = [];
let schoolSize = 100;
let distanceOfInfection = 0;

//create the array for infected fish
let infectedFish = [];
let initialInfected = 1;

let immuneFish = [];
let doctorFish = undefined;
let initialImmune = 1;


//create a virus that's introduced into the simulation

/**
Description of preload
*/
function preload() {

}


/**
Description of setup
*/
function setup() {
  createCanvas(600,600);


  for (let i = 0; i<schoolSize; i++){
    let fish = createFish(random(0,width), random(0,height));
    school.push(fish);
  }

  for (let i = 0; i<initialInfected; i++){
    let fish = createFish(random(0,width), random(0,height));
    infectedFish.push(fish);
  }

  let doctorFish = createFish(random(0,width), random(0,height));
  immuneFish.push(doctorFish);


}

function createFish(x,y){
  let fish = {
    x: x,
    y: y,
    size: 20,
    vx: 0,
    vy: 0,
    speed: 2
  };
  return fish;
}

/**
Description of draw()
*/
function draw() {
  background(255);

  for (let i = 0; i < school.length; i++){
    moveFish(school[i]);
    displayFish(school[i]);
  }


  for (let i = 0; i < infectedFish.length; i++){
    moveFish(infectedFish[i]);
    displayInfectedFish(infectedFish[i]);
  }

  for (let i = 1; i < immuneFish.length; i++){
    displayImmuneFish(immuneFish[i]);
  }

  displayDoctorFish(immuneFish[0]);
  move_doctor_fish();


  //check if the infected fish comes into contact with a normal fish
  //checkTouch();



  for (let i = 0; i < school.length -1; i++){
    for (let j = 0; j < infectedFish.length; j++){
      if (school.length > 0){
        if (checkTouch(infectedFish[j], school[i])){
            //put the healthy fish into the infected one
          infectedFish.push(school[i]);
            //remove the healthy fish from the array of school
          school.splice(i,1);

          console.log(infectedFish);
          console.log(school);

        }
      }
    }
  }



}

function displayInfectedFish(fish){
  push();
  fill(255,0,0);
  noStroke();
  ellipse(fish.x,fish.y,fish.size);
  pop();
}

function displayImmuneFish(fish){
  push();
  fill(0,255,0);
  noStroke();
  ellipse(fish.x,fish.y,fish.size);
  pop();
}

function displayDoctorFish(fish){
  push();
  fill(0,255,255);
  noStroke();
  ellipse(fish.x,fish.y,fish.size);
  pop();
}

function moveFish(fish){
  let change = random(0,1);
  if (change < 0.05){
    fish.vx = random(-fish.speed, fish.speed);
    fish.vy = random(-fish.speed, fish.speed);
  }

  fish.x += fish.vx;
  fish.y += fish.vy;

  fish.x = constrain(fish.x, 0, width);
  fish.y = constrain(fish.y, 0, height);
}


function displayFish(fish){
  push();
  fill(0,0,255);
  noStroke();
  ellipse(fish.x,fish.y,fish.size);
  pop();
}

function checkTouch(fish1, fish2){

  let d = dist(fish1.x, fish1.y, fish2.x, fish2.y);

  if (d <= (fish1.size/2 + fish2.size/2 + distanceOfInfection)){
    return true;
  }

}

function move_immune_fish(){

}

function move_doctor_fish(){
  immuneFish[0].x = mouseX;
  immuneFish[0].y = mouseY;
}

//give immunity to the fish
function give_immunity(healthyArray){

}
