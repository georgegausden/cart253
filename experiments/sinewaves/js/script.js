
let circles = [];
let numberCircles = 100;
let time = 0;

function setup(){
  createCanvas(600,600);



  for (let i = 0; i<numberCircles; i++){
    circles.push(createCircle(random(0,width), 0, random(-0.5,0.5), random(0,0.5), 1, 0));
  }



}

function draw(){



  for (let i = 0; i<numberCircles; i++){
    stroke(0,0,0);
    moveCircle(circles[i]);
    circle(circles[i].x, circles[i].y, circles[i].size);
    wrap(circles[i]);

  }

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
    mycircle.vx += 0.01;
    mycircle.vy += 0.01;
  }
  else{
    mycircle.vx -= 0.01;
    mycircle.vy -= 0.01;
  }

}

function wrap(mycircle){
  if (mycircle.x > width){
    mycircle.x -= width;
  }
  else if (mycircle.x <= width){
    mycircle.x += width;
  }
  else if (mycircle.y > height){
    mycircle.y -= height;
  }
  else if (mycircle.y < height){
    mycircle.y += height;
  };
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
