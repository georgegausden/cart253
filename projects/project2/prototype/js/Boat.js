class Boat {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.size = 50;
    this.fill = 255;
  }

  display(){
    push();
    fill(this.fill,255,255,100);
    imageMode(CENTER);
    //image(boatImage,this.x,this.y,this.size,this.size);
    circle(this.x,this.y,this.size);
    pop();

  }

  shootCannon(){
    //give the ability to shoot cannons for each boat
    //we need to animate a circle moving towards the object
    let cannons = [];


  }


  
}
