let barkSFX;

function preload(){
  barkSFX = loadSound('assets/sounds/bark.wav')
}

function setup(){
  createCanvas(500,500);
}
function draw(){
  background(0);

}

//function mousePressed(){
//  barkSFX.play();
//}

function mousePressed(){
  tryMusic();
}

function keyPressed(){
  tryMusic();
}

function tryMusic(){
  if (!barkSFX.isPlaying()){
    barkSFX.loop();
  }
}
