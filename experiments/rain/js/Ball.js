class Ball {

  constructor(x,y,vx){
    this.x = x;
    this.y = y;
    this.fill = {
      r: 255,
      g: 255,
      b: 255,
    };
    this.size = 100;
    this.ax = 0;
    this.ay = 0;
    this.vx = vx;
    this.vy = 0;
    this.gravity = 0.9;
    this.friction = 1;
    this.mass = 10;
    this.forceX = 0;
  }

  display(){
    push();
    fill(this.fill.r,this.fill.g,this.fill.b);
    circle(this.x,this.y,this.size);
    pop();
  }

  move(){
    this.x += this.vx;


    this.vx += this.ax;
    this.vy += this.ay;
  }

  checkGravity(){
    if (this.y <= height){
      this.ay = this.gravity;
    }
    else if (this.y >= height){
      this.ay = 0;
    }
  }

  wrap(){
    if (this.x-this.size/2 >= width){
      this.x = 0;
    }
    else if (this.x <= 0){
      this.x = width;
    }
  }

  bounceOffGround(){
    if (this.y+this.size/2 >= height){
      this.vy = -this.vy*this.friction;
    }
  }

  bounceOffObstacle(obstacle){
    if (this.x >= obstacle.x+obstacle.width/3){
      this.vx = -this.vx;
    }
    else if (this.x <= obstacle.x - obstacle.width/3){
      this.vx = -this.vx;
    }
    else if (this.y >= obstacle.y+obstacle.height/3){
      this.vy = -this.vy;
    }
    else if (this.y <= obstacle.y - obstacle.height/3){
      this.vy = -this.vy;
    }
  }

  checkGravityInBox(obstacle){

    if (this.y <= obstacle.y){

      this.ay = this.gravity;
    }
    else if (this.y >= obstacle.y-obstacle.height/2){
      console.log('ye')
      this.ay = 0;
    }
  }

  attraction(attractor){
    let d = dist(this.x,this.y,attractor.x,attractor.y);
    this.forceX = g*this.mass*attractor.mass/(d*d);
  }



}
