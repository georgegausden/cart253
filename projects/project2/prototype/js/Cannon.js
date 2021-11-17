class Cannon {
  constructor(x,y,xf,yf){
    this.xi = x;
    this.yi = y;
    this.xf = xf;
    this.yf = yf;
    this.size = 20;
    this.vx = undefined;
    this.vy = undefined;
    this.time = 10;
    this.calculated = false;

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

    if (this.calculated === false){
      this.calculateVelocityVectors();
      this.calculated = true;
    }

    this.move();

    if (this.xi > width || this.xi < 0 || this.yi > height || this.yi < 0){
      //let the program know the user has shot the cannon and that the animation is over, so reset all the boolean variables
      this.calculated = false;
      user.cannonAnimated = false;
      user.cannonNumber += 1;
      cannonSoundPlayed = false;
      shootDone = true;
    }

    


  }

}
