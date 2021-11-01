class Character {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.vx = 2;
    this.vy = 2;
    this.size = 10;
    this.fill = 255;
  }

  move(){
    //make the user move depending on what key they press
    if (keyIsDown(68)){
      this.x += this.vx
    }
    else if (keyIsDown(65)){
      this.x -= this.vx
    }
    else if (keyIsDown(87)){
      this.y -= this.vy
    }
    else if (keyIsDown(83)){
      this.y += this.vy
    };
  }

  display(){
    //display the user on the screen as a circle
    push();
    fill(this.fill);
    circle(this.x,this.y,this.size);
    pop();
  }
  
}
