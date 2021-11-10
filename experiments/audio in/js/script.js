"use strict";

let mic;

let ghost = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  image: undefined
}

function preload(){
  ghost.image = loadImage('assets/images/clown.png');
}

function setup(){
  createCanvas(600,600);

  ghost.x = width/2;
  ghost.y = height/2;

  mic = new p5.AudioIn();
  mic.start();
}

function draw(){
  background(0);

  let level = mic.getLevel();

  ghost.x += random(-1,1);
  ghost.y += random(-1,1);

  if (level > 0.6){
    ghost.vx = 20;
  }

  ghost.x += ghost.vx;
  ghost.y += ghost.vy;

  push();
  imageMode(CENTER);
  tint(255,50);
  image(ghost.image, ghost.x,ghost.y);
  pop();


}
