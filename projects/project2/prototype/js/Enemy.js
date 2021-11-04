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
  }


  move(){

    let r = int(random(0,grid.length));
    this.x = grid[r].x;
    this.y = grid[r].y;


  }

}
