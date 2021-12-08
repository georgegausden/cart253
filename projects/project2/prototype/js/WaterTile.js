class WaterTile extends Tile {
  constructor(x,y,r,g,b,transparency,type){
    super(x,y,r,g,b,transparency,type);
    this.image = waterImage;
  }

  //displays the water tile on the canvas
  display(){
    imageMode(CENTER);
    image(this.image,this.x, this.y,  this.width, this.height);
  }


}
