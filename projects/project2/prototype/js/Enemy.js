class Enemy extends Boat{

  constructor(x,y){
    super(x,y);
    this.size = 40;
    this.lives = 2;
    this.cannons = 1;
    this.positionFinalx = undefined;
    this.positionFinaly = undefined;
    this.vx = 2;
    this.vy = 2;

  }


  move(i){



    this.positionFinalx = grid[randomSeedArray[numberOfMovesPlayed+i]].x;
    this.positionFinaly = grid[randomSeedArray[numberOfMovesPlayed+i]].y;


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

      userMoveDone = false;
      shootDone = false;
      mousePressedBoolean = false;
      numberOfMovesPlayed += 1;
      //end the computer's turn and go back to the user's turn
      simulationState = 'userTurn';
    };


  }

}
