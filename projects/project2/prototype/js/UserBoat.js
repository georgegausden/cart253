class UserBoat extends Boat{

  constructor(x,y){
    super(x,y);
    this.lives = 5;
    this.numCannons = 5;
    this.cannons = [];
    this.moveDistance = 3;
    this.vx = 10;
    this.vy = 10;
    this.finalPositionX = undefined;
    this.finalPositionY = undefined;
    this.cannonRange = undefined;
    this.arrivedAtPort = false;
    this.chosenTile;
    this.state = 'atSea';

  }


  displayAim(){
    push();
    strokeWeight(5);
    stroke(255);
    drawingContext.setLineDash([5, 15]);
    let d = dist(this.x,this.y,mouseX,mouseY);
    if (d <= this.cannonRange){
      line(this.x,this.y,mouseX,mouseY);
    }
    pop();

  }

  move(){

    //create an animation to move the user from their tile to the one chosen
    //final position
    this.chosenTile = this.selectTile()
    this.finalPositionX = this.chosenTile.x;
    this.finalPositionY = this.chosenTile.y;

    //animate the movement of the ship, don't let the boat go through the land
    if (this.x < this.finalPositionX){
      this.x += this.vx
    }
    else if (this.x > this.finalPositionX){
      this.x -= this.vx
    }
    else if (this.y < this.finalPositionY){
      this.y += this.vy
    }
    else if (this.y > this.finalPositionY){
      this.y -= this.vy
    }
    else if (this.x === this.finalPositionX && this.y === this.finalPositionY){
      //reset the press mouse function
      mousePressedBoolean = false;
      userMoveDone = true;

      //check if we're on a port tile. If so, move to the ship docked function
      if (this.chosenTile.type === 'port'){
        //the ship is docked so now we need to display the port information
        this.state = 'shipDocked';
      }
    }

  }

  shoot(){
    shootDone = true;
  }

  showCannonRange(){
    //the user can only move one tile away from where they are currently
    fill(255,0,0,150);
    this.cannonRange = 2*grid[0].width;
    circle(this.x,this.y,2*this.cannonRange);
  }

  selectTile(){
    //let the user select a tile for where they want to move
    for (let i = 0; i<grid.length; i++){
      let tile = grid[i];
      let d = dist(mouseX,mouseY,tile.x, tile.y);
      if (d<=(1.4*tile.width/2) && mousePressedBoolean && tile.type === 'water'){
        //the user has chosen this element, now return the element
        return tile;
        mousePressedBoolean = false;
      }
      else if (d<=(1.4*tile.width/2) && mousePressedBoolean && tile.type === 'land'){
        //end the user's turn if they decide to go on land
        this.endTurn();
      }
      else if (d<=(1.4*tile.width/2) && mousePressedBoolean && tile.type === 'port'){
        //the boat is moving to a port, change the value to arriving at port and return the tile that we're headed towards
        this.arrivedAtPort = true;
        return tile;
      }
    }
  }

  endTurn(){
    userMoveDone = true;
    shootDone = true;
    mousePressedBoolean = true;
  }

  //resets all the values that need to be reset when the user moves from port to sea
  backToSea(){
    this.arrivedAtPort = false;
    this.shipDocked = false;
    this.state = 'atSea';
  }

}
