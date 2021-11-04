class Enemy extends Boat{

  constructor(x,y){
    super(x,y);
    this.size = 40;
    this.lives = 2;
    this.cannons = 1;
    this.positionFinalx = undefined;
    this.positionFinaly = undefined;
    this.vx = 1;
    this.vy = 1;
    this.randomArray = [];
    this.moveInArray = 0;

  }


  move(){
    let r = int(random(0,grid.length));
    this.randomArray.push(r);


    this.positionFinalx = grid[this.randomArray[this.moveInArray]].x;
    this.positionFinaly = grid[this.randomArray[this.moveInArray]].y;

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
      this.moveInArray += 1;
      //end the computer's turn and go back to the user's turn
      simulationState = 'userTurn';
    };


  }

}
