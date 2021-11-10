"use strict";

let oscillator;
let sound, sound3;
let t = 0;


function setup(){
  createCanvas(600,600);
  userStartAudio();

  oscillator = new p5.Oscillator(440,'sine');
  oscillator.amp(0.1);
  sound = new p5.Oscillator(880,'sin');
  sound.amp(0.1);
  sound3 = new p5.Oscillator(660,'sin');
  sound3.amp(0.1);
}

function draw(){
  background(0);




  push();
  textSize(32);
  textAlign(LEFT,CENTER);
  fill(255);
  text(newFreq + "Hz",100,height/2);
  pop();



}

function mousePressed(){
  oscillator.start();
  sound.start();
  sound3.start();
}

function mouseReleased(){
  oscillator.stop();
  sound.stop();
  sound3.stop();
}
