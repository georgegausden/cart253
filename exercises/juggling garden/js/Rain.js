//rain object
class Rain {
  //construct raindrops
  constructor(x,y,size,colour){
    this.x = x;
    this.y = y;
    this.size =  size;
    this.colour = colour;
    this.rainFallRate = 10;
  }

  display(){
    //display the raindrops on the canvas
    push();
    noStroke();
    fill(0,0,this.colour);
    circle(this.x,this.y,this.size);
    pop();
  }

  //move the raindrops
  move(){
    this.x = this.x;
    this.y += this.rainFallRate;
  }

}
