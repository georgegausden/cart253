class Boat {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.size = 50;
    this.fill = 255;
  }

  move(){

  }

  display(){
    push();
    fill(this.fill);
    circle(this.x,this.y,this.size);
    pop();

  }

}
