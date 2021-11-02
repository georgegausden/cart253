class UserBoat extends Boat{

  constructor(x,y){
    super(x,y);
    this.lives = 5;
    this.cannons = 5;
  }


  displayAim(){
    strokeWeight(10);
    stroke(255);
    line(this.x,this.y,mouseX,mouseY);

  }

  move(){
    //move the boat of the user
    this.x = selectTile().x;
    this.y = selectTile().y;
    mousePressedBoolean = false;
    userMoveDone = true;
  }

  shoot(){
    shootDone = true;
    mousePressedBoolean = false;

  }



}
