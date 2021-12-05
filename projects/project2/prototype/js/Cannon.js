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

      if (checkTouch(cannon.xi,cannon.yi,cannon.size,boat) && boat.lives === 2){
        //the cannon hit the user ship, so make it lose a life and change the image of the boat as well
        boat.image = boatDamaged1;
        boat.lives -= 1;
        break;
      }
      else if (checkTouch(cannon.xi,cannon.yi,cannon.size,boat) && boat.lives === 1){
        //the cannon hit the user ship, so make it lose a life and change the image of the boat as well
        boat.image = boatDamaged2;
        boat.lives -= 1;
        break;
      }
      else if (checkTouch(cannon.xi,cannon.yi,cannon.size,boat) && boat.lives === 0){
        //remove the boat from the list of enemy boats, splice it out
        enemyBoats.splice(i,1);
      }




    }

    if (this.xi > width || this.xi < 0 || this.yi > height || this.yi < 0){
      //let the program know the user has shot the cannon and that the animation is over, so reset all the boolean variables
      this.calculated = false;
      user.cannonAnimated = false;
      user.cannonNumber += 1;
      cannonSoundPlayed = false;
      shootDone = true;
    }




  }

}
