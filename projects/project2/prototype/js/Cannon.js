class Cannon {
  constructor(x,y,xf,yf){
    this.xi = x;
    this.yi = y;
    this.xf = xf;
    this.yf = yf;
    this.size = 20;
    this.vx = undefined;
    this.vy = undefined;
    this.time = 10;
    this.calculated = false;

  }

  display(){
    push();
    fill(0);
    circle(this.xi,this.yi,this.size);
    pop();
  }

  move(){
    this.xi += this.vx;
    this.yi += this.vy;
  }

  calculateVelocityVectors(){
    this.vx = (this.xf - this.xi)/this.time;
    this.vy = (this.yf - this.yi)/this.time;
  }

  //launch contains all the elements to shoot the cannon on the screen, basically a function that encapsulates everything
  launch(){
    this.display();

    if (this.calculated === false){
      this.calculateVelocityVectors();
      this.calculated = true;
    }

    this.move();

    //check if the cannon hits an enemy ship
    for (let i = 0; i<enemyBoats.length; i++){
      let boat = enemyBoats[i];
      let cannon = user.cannons[user.cannonNumber];

      if (checkTouch(cannon.xi,cannon.yi,cannon.size,boat) && boat.lives === 2 && boatHit === false){
        //the cannon hit the user ship, so make it lose a life and change the image of the boat as well
        if (!explosionSFX.isPlaying()){
          explosionSFX.play();
        }
        boat.image = boatDamaged1;
        boat.lives -= 1;
        boatHit = true;

      }
      else if (checkTouch(cannon.xi,cannon.yi,cannon.size,boat) && boat.lives === 1 && boatHit === false){
        //the cannon hit the user ship, so make it lose a life and change the image of the boat as well
        if (!explosionSFX.isPlaying()){
          explosionSFX.play();
        }
        boat.image = boatDamaged2;
        boat.lives -= 1;
        boatHit = true;
      }
      else if (checkTouch(cannon.xi,cannon.yi,cannon.size,boat) && boat.lives === 0 && boatHit === false){
        //remove the boat from the list of enemy boats, splice it out
        if (!explosionSFX.isPlaying()){
          explosionSFX.play();
        }
        enemyBoats.splice(i,1);
        boatHit = true;
      }


    }

    if (this.xi > width || this.xi < 0 || this.yi > height || this.yi < 0 || boatHit === true){
      //let the program know the user has shot the cannon and that the animation is over, so reset all the boolean variables
      this.calculated = false;
      user.cannonAnimated = false;
      user.cannonNumber += 1;
      user.tileSelected = false;
      cannonSoundPlayed = false;
      shootDone = true;
      boatHit = false;
      userMoveDone = false;
    }
  }

  launchEnemyCannon(i){

    let enemyBoat = enemyBoats[i]

    this.display();
    if (this.calculated === false){
      this.calculateVelocityVectors();
      this.calculated = true;
    }

    //check to see if the enemy touched the user's boat
    if (checkTouch(this.x,this.y,this.size, user)){
      console.log('yes')
      if (!explosionSFX.isPlaying()){
        explosionSFX.play();
      }
      if (user.lives === 2){
        user.image = boatDamaged1;
      }
      else if (user.lives === 1){
        user.image = boatDamaged2Left;
      }
      boatHit = true;
      user.lives -= 1;
    }

    this.move();

    if (this.xi > width || this.xi < 0 || this.yi > height || this.yi < 0){
      //let the program know the user has shot the cannon and that the animation is over, so reset all the boolean variables
      this.calculated = false;
      enemyBoat.shootDone = true;
      boatHit = false;
      enemyBoat.targetSet = false;
      enemyBoat.cannonNumber += 1;
      enemyBoat.positionSet = false;
      enemyShootsFinished += 1;
      shootDone = false;
    }
  }

}
