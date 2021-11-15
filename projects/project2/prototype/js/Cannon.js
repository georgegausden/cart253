class Cannon {
  constructor(x,y){
    this.xi = x;
    this.yi = y;
    this.xf = undefined;
    this.yf = undefined;
    this.size = 50;
    this.vx = undefined;
    this.vy = undefined;

  }

  display(){
    push();
    fill(0);
    circle(this.x,this.y,this.size);
    pop();
  }

  move(){
    this.x += this.vx;
    this.y += this.vy;
  }

}
