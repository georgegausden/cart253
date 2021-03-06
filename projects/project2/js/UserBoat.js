class UserBoat extends Boat {

  constructor(x, y) {
    super(x, y);
    this.lives = 5;
    this.numCannons = 5;
    this.cannons = [];
    this.moveDistance = 3;
    this.vx = 2;
    this.vy = 2;
    this.finalPositionX = undefined;
    this.finalPositionY = undefined;
    this.cannonRange = undefined;
    this.arrivedAtPort = false;
    this.chosenTile;
    this.state = 'atSea';
    this.cannonAnimated = false;
    this.Cannonxf = undefined;
    this.Cannonyf = undefined;
    this.cannons = [];
    this.cannonNumber = 0;
    this.CurrentTile = undefined;
    this.adjacentTiles = [];
    this.tileLeftIndex = undefined;
    this.tileRightIndex = undefined;
    this.tileUpIndex = undefined;
    this.tileDownIndex = undefined;
    this.currentTileIndex = undefined;
    this.size = 50;
    this.image = boatImageRight;
    this.tileSelected = false;
    this.treasure = 0;

  }

  //displays the user's image on the canvas
  display() {
    push();
    imageMode(CENTER);
    image(this.image, this.x, this.y, this.size, this.size);
    //circle(this.x,this.y,this.size);
    pop();

  }

  //displays a dotted line that helps the user guide their cannon
  displayAim() {
    push();
    strokeWeight(5);
    stroke(255);
    drawingContext.setLineDash([5, 15]);
    let d = dist(this.x, this.y, mouseX, mouseY);
    if (d <= this.cannonRange) {
      line(this.x, this.y, mouseX, mouseY);
    }
    pop();

  }

  //moves the user on the canvas
  move() {
    //start the moving sound effect
    if (!shipMoveSFX.isPlaying()) {
      shipMoveSFX.play();
    }

    //create an animation to move the user from their tile to the one chosen
    //calculate the final position of the user
    if (this.tileSelected === false) {
      this.chosenTile = this.selectTile();
      this.tileSelected = true;
      this.finalPositionX = this.chosenTile.x;
      this.finalPositionY = this.chosenTile.y;
    }

    //track the user's current tile they're on
    this.currentTileIndex = this.findTile();

    //keep track of the tiles left right top and bottom of the one the user is on
    this.tileUpIndex = this.currentTileIndex - 10;
    this.tileDownIndex = this.currentTileIndex + 10;
    this.tileLeftIndex = this.currentTileIndex - 1;
    this.tileRightIndex = this.currentTileIndex + 1;


    //animate the movement of the ship, (don't let the boat go through the land)
    if (this.x < this.finalPositionX) {

      if (this.lives === 2) {
        //change the user image depending on if they're moving left or right
        this.image = boatImageRight;
      } else if (this.lives === 1) {
        this.image = boatDamaged1;
      } else if (this.lives === 0) {
        this.image = boatDamaged2;
      }
      this.x += this.vx;

    } else if (this.x > this.finalPositionX) {
      if (this.lives === 2) {
        this.image = boatImageLeft;
      } else if (this.lives === 1) {
        this.image = boatDamaged1Left;
      } else if (this.lives === 0) {
        this.image = boatDamaged2Left;
      }
      this.x -= this.vx;
    } else if (this.y < this.finalPositionY) {
      this.y += this.vy
    } else if (this.y > this.finalPositionY) {
      this.y -= this.vy
    } else if (this.x === this.finalPositionX && this.y === this.finalPositionY) {
      //reset the press mouse function
      mousePressedBoolean = false;
      userMoveDone = true;
      shipMoveSFX.stop();

      //check if we're on a port tile. If so, move to the ship docked function
      if (this.chosenTile.type === 'port') {
        //the ship is docked so now we need to display the port information
        this.state = 'shipDocked';
      }
    }

  }

  //launches cannons from the user boat
  shoot() {
    //launch the first cannon that appears in the array, set its final and initial locations on the map
    if (this.cannonAnimated === false) {
      this.Cannonxf = mouseX;
      this.Cannonyf = mouseY;
      this.cannons[this.cannonNumber].xi = this.x;
      this.cannons[this.cannonNumber].yi = this.y;
      this.cannons[this.cannonNumber].xf = this.Cannonxf;
      this.cannons[this.cannonNumber].yf = this.Cannonyf;
      this.cannonAnimated = true;
    }

    //animate the movement of the cannon
    this.cannons[this.cannonNumber].launch();
  }

  //show the range of the cannon the user can launch
  showCannonRange() {
    fill(255, 0, 0, 150);
    this.cannonRange = 2 * grid[0].width;
    circle(this.x, this.y, 2 * this.cannonRange);
  }

  //chooses a tile if the user clicks on the map
  selectTile() {
    //let the user select a tile for where they want to move
    //let the tile be only two blocks away from where they are
    //highlight the tiles the user can move to
    for (let i = 0; i < grid.length; i++) {
      let tile = grid[i];
      let d = dist(mouseX, mouseY, tile.x, tile.y);
      if (d <= (1.4 * tile.width / 2) && mousePressedBoolean && tile.type === 'water') {
        //the user has chosen this element, now return the element
        return tile;
        mousePressedBoolean = false;
      } else if (d <= (1.4 * tile.width / 2) && mousePressedBoolean && tile.type === 'land') {
        //if the user touches land, don't do anything
        mousePressedBoolean = false;
      } else if (d <= (1.4 * tile.width / 2) && mousePressedBoolean && tile.type === 'port') {
        //the boat is moving to a port, change the value to arriving at port and return the tile that we're headed towards
        this.arrivedAtPort = true;
        return tile;
      }
    }
  }

  //resets boolean values for the user at the end of their turn
  endTurn() {
    userMoveDone = true;
    shootDone = true;
    mousePressedBoolean = true;
  }

  //resets all the values that need to be reset when the user moves from port to sea
  backToSea() {
    this.arrivedAtPort = false;
    this.shipDocked = false;
    this.state = 'atSea';
  }

  //highlights the tiles surrounding the user that they can move to
  hightlightTile() {
    //method to highlight the tiles the user can move their boat to
    //create an array of the tiles we're going to need to highlight

    for (let i = 0; i < grid.length; i++) {
      let tileIndex = i;
      if (tileIndex === this.currentTile + 1) {
        //change its colour
        this.adjacentTiles.push(grid[tileIndex]);
      } else if (tileIndex === this.currentTile - 1) {
        this.adjacentTiles.push(grid[tileIndex]);
      } else if (tileIndex === this.currentTile + 10) {
        this.adjacentTiles.push(grid[tileIndex]);
      } else if (tileIndex === this.currentTile + 11) {
        this.adjacentTiles.push(grid[tileIndex]);
      } else if (tileIndex === this.currentTile + 9) {
        this.adjacentTiles.push(grid[tileIndex]);
      } else if (tileIndex === this.currentTile - 9) {
        this.adjacentTiles.push(grid[tileIndex]);
      } else if (tileIndex === this.currentTile - 10) {
        this.adjacentTiles.push(grid[tileIndex]);
      } else if (tileIndex === this.currentTile - 11) {
        this.adjacentTiles.push(grid[tileIndex]);
      }

    }

    //colour all the adjacent tiles
    for (let i = 0; i < this.adjacentTiles.length; i++) {
      let tile = this.adjacentTiles[i];
      tile.image = waterLightImage;
    }
  }

  //finds the current tile of the user
  findTile() {
    //get the current tile of the user
    for (let i = 0; i < grid.length; i++) {
      let tile = grid[i];
      let d = dist(tile.x, tile.y, user.x, user.y);

      if (d <= tile.width / 2) {
        this.currentTile = i;
        return i;
      };
    }
  }

  //takes away the highlighted property of the tiles
  removeHighlightedTiles() {
    //remove the highlighted tiles
    for (let i = 0; i < this.adjacentTiles.length; i++) {
      let tile = this.adjacentTiles[i];
      tile.image = waterImage;
    }
  }

}
