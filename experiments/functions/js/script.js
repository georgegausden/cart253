"use strict";

/**

*multiple images (happy face/scary face)
*for loops (discomfort with, why are they instant?)
*delaying code
*pushing and popping


*/

let normalFace = undefined;
let scaredFace = undefined;

let face = {
  x: 250,
  y:250,
  terrorThreshold: 20
}

function preload() {
  normalFace = loadImage('assets/images/clown.png');
  scaredFace = loadImage('assets/images/scaredface.png');
}

function setup() {
  createCanvas(500,500);


}


function draw() {
  background(0);

  imageMode(CENTER);
  //looking left
  translate(width / 2, height / 2);
  if (mouseX < width/2){
    scale(-1,1);
    image(scaredFace, 0, 0, 300, 300);

  }
  else{
    scale(1,1);
    image(scaredFace, 0, 0, 300, 300);
  }

  let d = dist(mouseX, mouseY, face.x, face.y);
  

}
