"use strict";

let planet = {
  x:-100,
  y:-100,
  size:50,
  angle:0,
}

let moon = {
  x: 200,
  y: 0,
  size: 25,
  angle: 0,
}

function setup(){
  createCanvas(500,500,WEBGL);

}

function draw(){
  background(0);

  push();
  translate(planet.x,planet.y);
  rotateY(radians(planet.angle));
  box(planet.size);
  pop();

  push();
  translate(moon.x, moon.y);
  rotateY(radians(moon.angle));
  ellipse(moon.x,moon.y);
  pop();

  planet.angle+=1;
  planet.size +=0.1 ;
}
