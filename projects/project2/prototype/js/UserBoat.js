class UserBoat extends Boat{

  constructor(x,y){
    super(x,y);
    this.lives = 5;
    this.numCannons = 5;
    this.cannons = [];
    this.moveDistance = 3;
    this.vx = 10;
    this.vy = 10;
    this.positionFinalx = undefined;
    this.positionFinaly = undefined;

  }


  displayAim(){
    strokeWeight(5);
    stroke(255);
    drawingContext.setLineDash([5, 15]);
    line(this.x,this.y,mouseX,mouseY);

  }

  move(){

    //create an animation to move the user from their tile to the one chosen
    //final position

    this.positionFinalx = selectTile().x;
    this.positionFinaly = selectTile().y;

    //animate the movement of the ship
    if (this.x < this.positionFinalx){
      this.x += this.vx
    }
    else if (this.x > this.positionFinalx){
      this.x -= this.vx
    }
    else if (this.y < this.positionFinaly){
      this.y += this.vy
    }
    else if (this.y > this.positionFinaly){
      this.y -= this.vy
    }
    else if (this.x === this.positionFinalx && this.y === this.positionFinaly){
      //reset the press mouse function
      mousePressedBoolean = false;
      userMoveDone = true;
    }


  }

  shoot(){
    shootDone = true;

  }

  showPossibleMoves(){
    //the user can only move one tile away from where they are currently
    fill(255,0,0,150);
    circle(this.x,this.y,this.moveDistance*grid[0].width);

  }

  animateMovement(){

  }







}
