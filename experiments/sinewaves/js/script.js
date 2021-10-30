
let circles = [];
let numberCircles = 100;
let time = 0;

function setup(){
  createCanvas(500,500);
  background(255);
  noStroke();

  for (let i = 0; i<numberCircles; i++){
    circles.push(createCircle(random(0,width), random(0,height), random(-1,1), random(2,3), 5, 0));
  }

}

function draw(){

  push();

  for (let i = 0; i<numberCircles; i++){
    fill(circles[i].fill);
    moveCircle2(circles[i]);
    circle(circles[i].x, circles[i].y, circles[i].size);


  }
  pop();
  time++;

}

function moveCircle2(mycircle){
  mycircle.x = 200*sin(time*time)*sin(time)+width/2;
  mycircle.y = 200*sin(time*time)*cos(time)+height/2;
}


function moveCircle(mycircle){
  mycircle.x += mycircle.vx;
  mycircle.y += mycircle.vy;

  let randomnumber = random(0,1);

  if (randomnumber < 0.5){
    mycircle.vx += 0.05;
    mycircle.vy += 0.05;
  }
  else{
    mycircle.vx -= 0.05;
    mycircle.vy -= 0.05;
  }

}

function createCircle(x,y,vx,vy,size,fill){
  let mycircle = {
    x: x,
    y: y,
    vx: vx,
    vy: vy,
    size: size,
    fill: fill,
  }
  return mycircle;
}
