class PortTile extends LandTile{
  constructor(x,y,r,g,b,transparency,type){
    super(x,y,r,g,b,transparency,type);
  }

  display(){
    imageMode(CENTER);
    image(portImage,this.x, this.y,  this.width, this.height);
  }

//this function displays the port information and options they can choose from
  shipDocked(){
    
    background(255,0,0);
  }
}
