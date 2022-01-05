class ObstacleInterior{

  constructor(x,y,width,height,curvature,widthMultiplier,heightMultiplier){
    this.x=x;
    this.y=y;
    this.vx = 0.5;
    this.vy = 0.5;
    this.width = width;
    this.height = height;
    this.fill = {
      r: 0,
      g: 0,
      b: 255,
      a: 50,
    }
    this.curvature = curvature;
    this.widthMultiplier = widthMultiplier;
    this.heightMultiplier = heightMultiplier;

  }

  display(){
    //set width and height
    push();
    strokeWeight(0.2);
    stroke(this.fill.r,this.fill.g,this.fill.b);
    fill(this.fill.r,this.fill.g,this.fill.b,this.fill.a);
    rectMode(CENTER);
    rect(this.x,this.y,this.width*this.widthMultiplier,this.height*this.heightMultiplier,this.curvature);
    pop();
  }

  move(obstacle){

    if (this.widthMultiplier > this.heightMultiplier){
      this.y += this.vy
    }
    else if (this.heightMultiplier > this.widthMultiplier){
      this.x += this.vx;
    }


    if (this.x >= obstacle.x+obstacle.width*this.widthMultiplier/3){
      this.vx = -this.vx;
    }
    else if (this.x <= obstacle.x - obstacle.width*this.widthMultiplier/3){
      this.vx = -this.vx;
    }
    else if (this.y >= obstacle.y+obstacle.height*this.heightMultiplier/3){
      this.vy = -this.vy;
    }
    else if (this.y <= obstacle.y - obstacle.height*this.heightMultiplier/3){
      this.vy = -this.vy;
    }



  }



}
