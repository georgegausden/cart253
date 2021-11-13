class Tile{
  constructor(x,y,r,g,b,transparency){
    this.x= x;
    this.y= y;
    this.width=width/numColumns;
    this.height=height/numRows;
    this.fillR= r;
    this.fillG= g;
    this.fillB= b;
    this.transparency= transparency;
  }

  display(){
    noStroke();
    fill(this.fillR, this.fillG, this.fillB, this.transparency);
    rectMode(CENTER);
    rect(this.x, this.y,  this.width, this.height);
    fill(255);
  }
}
