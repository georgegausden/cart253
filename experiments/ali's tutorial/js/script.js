let maxY = 0;
let delta = -1;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  stroke(255);
  noFill();

  for (let i = 2; i > 0; i += -0.025) {
    bezier(0,0,width/3,maxY/i,2*width/3,maxY/i,width,0);
  }

  maxY += delta;
  if (maxY > height * 2 || maxY < 0) {
    delta = -delta;
  }
}
