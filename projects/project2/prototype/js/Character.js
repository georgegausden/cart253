class Character {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.vx = 2;
    this.vy = 2;
    this.ax = 0.1;
    this.ay = 0.1;
    this.size = 100;
    this.fill = 255;
  }

  move(){
    //make the user move depending on what key they press
    if (keyIsDown(68)){
      this.x += this.vx
      this.vx += this.ax
    }
    else if (keyIsDown(65)){
      this.x -= this.vx
      this.vx += this.ax
    }
    //add friction so the user doesn't accelerate forever
    else{
      this.vx -= this.ax
    };

    this.vx = constrain(this.vx, 0, 5);
  }

  display(){
    //display the user on the screen as a circle
    push();
    fill(this.fill);
    circle(this.x,this.y,this.size);
    pop();

  }

}
