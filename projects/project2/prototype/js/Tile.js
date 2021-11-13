class Tile{
  constructor(x,y,r,g,b,transparency,type){
    this.x= x;
    this.y= y;
    this.width=width/numColumns;
    this.height=height/numRows;
    this.fillR= r;
    this.fillG= g;
    this.fillB= b;
    this.transparency= transparency;
    this.type = type;
  }

  display(){
    stroke(255,255,255,200);
    strokeWeight(0.1);

    if (this.type === 'land'){
      this.fillR = 0;
      this.fillG = 200;
      this.fillB = 0;
    }

    fill(this.fillR, this.fillG, this.fillB, this.transparency)
    rectMode(CENTER);
    rect(this.x, this.y,  this.width, this.height);
    fill(255);
  }

}
