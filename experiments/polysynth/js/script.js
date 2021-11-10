"use strict";

let synth;
let notes = ['Ab3','Bb3','C3','Db3','Eb3','F4','F3','G3'];
let currentNote = 0;

function setup(){
  createCanvas(600,600);

  synth = new p5.PolySynth();

  userStartAudio();
}

function draw(){
  background(0);
}




function keyPressed(){
  //start ghost player
  setInterval(playNote,500);

}

function playNote(){
  let note = notes[currentNote];
  synth.play(note, 1, 0, 0.4);

  currentNote += 1;
  if (currentNote === notes.length){
    currentNote = 0;
  }
}
