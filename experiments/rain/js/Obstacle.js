class Obstacle{

  constructor(x,y,width,height){
    this.x=x;
    this.y=y;
    this.width = width;
    this.height = height;
    this.fill = {
      r: 255,
      g: 255,
      b: 255,
      a: 50,
    }
    this.curvature = 10;
  }

  display(){
    //set width and height
    push();
    strokeWeight(1);
    stroke('#6BB382');
    fill(107,179,130,180);
    rectMode(CENTER);
    rect(this.x,this.y,this.width,this.height,this.curvature);
    pop();
  }

  createInterior(){

  }

}
