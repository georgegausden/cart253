
function setup() {
  createCanvas(500,500);

}


function draw(){
  background(0);
  parallels(100,100,10,2,30);
  parallels(50,50,40,3,100);

}

function parallels(x,y,numLines, lineWidth, lineHeight){
  for(let i = 0; i<numLines; i++){
    noStroke();
    fill(255);
    rectMode(CENTER);
    rect(x,y,lineWidth,lineHeight);
    x+=10;
  }
}
