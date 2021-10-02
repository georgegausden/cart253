let hello = {
  string: "مرحبا",
  x: 250,
  y: 250,
  vx: 1,
  vy: 1,
  size: 64
}

function setup(){
  createCanvas(500,500);
}
function draw(){
  background(127);
  hello.x+=hello.vx;
  hello.y+=hello.vy;
  hello.size += 3;
  textAlign(CENTER,CENTER);
  textSize(hello.size);
  fill(255,0,0);
  text(hello.string, hello.x,hello.y);

}
