class Cannon {
  constructor(){
    this.xi = undefined;
    this.yi = undefined;
    this.xf = mouseX;
    this.yf = mouseY;
    this.size = 50;
    this.vx = undefined;
    this.vy = undefined;
    this.time = 5;

  }

  display(){
    push();
    fill(0);
    circle(this.xi,this.yi,this.size);
    pop();
  }

  move(){
    this.xi += this.vx;
    this.yi += this.vy;
  }

  calculateVelocityVectors(){
    this.vx = (this.xf - this.xi)/this.time;
    this.vy = (this.yf - this.yi)/this.time;
  }

  //launch contains all the elements to shoot the cannon on the screen, basically a function that encapsulates everything
  launch(){
    this.display();
    this.calculateVelocityVectors();
    if(this.xi > 0 || this.xi < width){
      this.move();
    }
    else{
      //let the program know the user has shot the cannon
      shootDone = true;
    }

  }

}
