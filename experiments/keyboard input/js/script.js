let bg = 0;

function setup(){
  createCanvas(500,500);

}
function draw(){
  background(bg);

  if (keyIsDown(65)){
    rect(width/2,height/2,100,100);
  }

}

/**
function keyPressed(){
  if (keyCode === 38){
    bg += 10;
    bg = constrain(bg,0,255);
  }
  else if (keycode === 40){
    bg -= 0;
    bg = constrain(bg,0,255);
  }
}
*/
