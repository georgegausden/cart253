let user = {
  x:0,
  y:0,
  size:100
};

let food: {
  x:250,
  y:300,
  size: 50,
  eaten: false
};

let food2: {
  x:350,
  y:300,
  size: 50,
  eaten: false
}

//function mousePressed(){
//  barkSFX.play();
//}

function mousePressed(){
  createCanvas(windowWidth, windHeight);
}

function keyPressed(){
  tryMusic();
}

function tryMusic(){
  if (!barkSFX.isPlaying()){
    barkSFX.loop();
  }
}
