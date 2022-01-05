class Attractor{
  constructor(x,y,mass,size){
    this.x = x;
    this.y = y;
    this.mass = mass;
    this.size = size;
  }

  display(){
    push();
    fill(255);
    circle(this.x,this.y,this.size);
    pop();
  }
}
