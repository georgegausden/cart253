class UserBoat extends Boat{

  constructor(x,y){
    super(x,y);
    this.lives = 5;
    this.numCannons = 5;
    this.cannons = [];
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

  

  createCannon(){
    for (let i = 0; i<this.numCannons; i++){
      this.cannons.push(createCannonVariable());
    };
  }






}
