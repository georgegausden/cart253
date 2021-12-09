class Enemy extends Boat {

  constructor(x, y) {
    super(x, y);
    this.size = 40;
    this.lives = 2;
    this.positionFinalx = undefined;
    this.positionFinaly = undefined;
    this.vx = 1;
    this.vy = 1;
    this.image = boatImageRight;
    this.cannons = [];
    this.moveDone = false;
    this.shootDone = false;
    this.targetSet = false;
    this.cannonTargetx = undefined;
    this.cannonTargety = undefined;
    this.cannons = [];
    this.cannonNumber = 0;
    this.positionSet = false;
    this.precision = random(0, 1);

  }

  //Displays the enemy boat on the canvas
  display() {
    push();
    imageMode(CENTER);
    image(this.image, this.x, this.y, this.size, this.size);
    pop();
  }

  //Moves the enemy on the canvas
  move(i) {
    //Set the final position of the enemy on the canvas
    if (this.positionSet === false) {
      this.positionFinalx = grid[randomSeedArray[numberOfMovesPlayed + i]].x;
      this.positionFinaly = grid[randomSeedArray[numberOfMovesPlayed + i]].y;
      this.positionSet = true;
    }

    //animate the movement of the ship
    if (this.x < this.positionFinalx) {
      //Change the image of the enemy depending on if they're moving left or right
      if (this.lives === 2) {
        this.image = boatImageRight;
      } else if (this.lives === 1) {
        this.image = boatDamaged1;
      } else if (this.lives === 0) {
        this.image = boatDamaged2;
      }
      this.x += this.vx
    } else if (this.x > this.positionFinalx) {
      if (this.lives === 2) {
        this.image = boatImageLeft;
      } else if (this.lives === 1) {
        this.image = boatDamaged1Left;
      } else if (this.lives === 0) {
        this.image = boatDamaged2Left;
      }
      this.x -= this.vx
    } else if (this.y < this.positionFinaly) {
      this.y += this.vy
    } else if (this.y > this.positionFinaly) {
      this.y -= this.vy
    } else if (this.x === this.positionFinalx && this.y === this.positionFinaly) {
      //the enemy arrived at their location
      this.moveDone = true;
      mousePressedBoolean = false;
      numberOfMovesPlayed += 1;
    };


  }

  //lets the enemy shoot cannons at the user
  shoot(i) {
    //use randomness to create a certain level of precision for the enemy boats
    //the accuracy will be between 0 and 100%, so 0 to 1
    //the ideal target is the user's position itself (100% accuracy), so multiply the user's position by a certain amount
    if (this.targetSet === false) {
      this.cannonTargetx = user.x * this.precision;
      this.cannonTargety = user.y * this.precision;
      this.cannons[this.cannonNumber].xi = this.x;
      this.cannons[this.cannonNumber].yi = this.y;
      this.cannons[this.cannonNumber].xf = this.cannonTargetx;
      this.cannons[this.cannonNumber].yf = this.cannonTargety;
      this.targetSet = true;
    }

    //This function animates the canon launching
    this.cannons[this.cannonNumber].launchEnemyCannon(i);



  }

}
