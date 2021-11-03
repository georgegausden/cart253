class UserBoat extends Boat{

  constructor(x,y){
    super(x,y);
    this.lives = 5;
    this.numCannons = 5;
    this.cannons = [];
    this.moveDistance = 3;
  }


  displayAim(){
    strokeWeight(5);
    stroke(255);
    drawingContext.setLineDash([5, 15]);
    line(this.x,this.y,mouseX,mouseY);

  }

  move(){

    //move the boat of the user
    this.x = selectTile().x;
    this.y = selectTile().y;

    //reset the press mouse function
    mousePressedBoolean = false;
    userMoveDone = true;
  }

  shoot(){
    shootDone = true;

  }

  showPossibleMoves(){
    //the user can only move one tile away from where they are currently
    fill(255,0,0,150);
    circle(this.x,this.y,this.moveDistance*grid[0].width);

  }






}
