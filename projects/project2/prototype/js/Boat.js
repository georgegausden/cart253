class Boat {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.size = 50;
    this.fill = 255;
  }

  display(){
    push();
    fill(this.fill);
    circle(this.x,this.y,this.size);
    pop();

  }

  shootCannon(){
    //give the ability to shoot cannons for each boat

  }

}
