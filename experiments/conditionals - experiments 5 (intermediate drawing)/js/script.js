let angle = 0;
let rectScale = 0;

function setup() {
  background(255);
  createCanvas(windowWidth,windowHeight);

}
//push and pop to set styles (fill, stroke)...
//translate moves the origin where the shapes are drawn

function draw() {


  //spush();
  //fill(255,0,0);
  //stroke(0,255,255);
  //strokeWeight(10);
  //rect(100,100,100,100);
  //pop();

  //push();
  //fill(255,0,0);
  //rect(0,0,100,100);
  //pop();
//
  //push();
  //translate(200,100);
  //fill(0,255,0);
  //rect(0,0,100,100);
  //pop();

  //push();
  //translate(0,200);
  //fill(0,0,255);
  //rect(0,0,100,100);
  //pop();
  //push();
  //fill(0,0,255);
  //rect(300,100,100,100);
  //pop();

  push();
  noFill();
  stroke(100,0,0);
  strokeWeight(0.1);
  rectMode(CENTER);

  translate(width/2,height/2);
  scale(rectScale);
  rotate(angle);
  rect(0,0,400,400);
  pop();
  angle+= 1;
  rectScale += 0.0005;

}
