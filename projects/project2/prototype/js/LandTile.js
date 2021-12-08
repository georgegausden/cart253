class LandTile extends Tile{
  constructor(x,y,r,g,b,transparency,type){
    super(x,y,r,g,b,transparency,type);
  }


  //displays the landtile on the canvas
  display(){
    imageMode(CENTER);
    image(landImage,this.x, this.y,  this.width, this.height);
  }
}
