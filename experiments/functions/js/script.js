let circle = {
  x:0,
  y: 250,
  size: 100,
  vx: 1,
  vy: 0
};

function setup() {
  createCanvas(500,500);

}

function draw() {
  background(0);
  //turn all of draw into just functions
  move();
  wrap();
  display();
}

function wrap(){
  if (circle.x > width) {
    reset();
  }
}

function mousePressed(){
  reset();
}

function reset(){
  circle.x = 0;
  circle.vx += 2;
  circle.vy -= 0.25;
  circle.size +=5;
}

function move(){
  circle.x +=circle.vx;
  circle.y += circle.vy
}

function display(){
  fill(255,0,0);
  ellipse(circle.x,circle.y,circle.size);

}
