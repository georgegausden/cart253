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
    //display the user on the screen as a circle
    push();
    fill(this.fill);
    circle(this.x,this.y,this.size);
    pop();

  }

}
