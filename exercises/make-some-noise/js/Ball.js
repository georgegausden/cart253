class Ball {

  constructor(x,y,vy) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.fill = {
      r: random(200,255),
      g: random(200,255),
      b: random(200,255)
    };
    this.speed = 3;
    this.vx = random(-this.speed,this.speed);
    this.vy = random(-this.speed,this.speed);
    this.randomness = 0.01;

    // Synth
    this.osc = new p5.Oscillator('sine');
    this.freq = undefined;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    //add some randomness
    let r = random(0,1);
    if (r>0.5){
      this.vy += this.randomness;
      this.vx -= this.randomness;
    }
    else{
      this.vy -= this.randomness;
      this.vx += this.randomness;
    }

  }

  bounce() {
    //make the ball play the note related to its velocity as it touches the side

    if (this.x - this.size/2 < 0 || this.x + this.size/2 > width) {
      this.vx = -this.vx;
      this.playNote();
      //touch the side of the screen, change the boolean value to true
      if (touchSideBoolean){
        touchSideBoolean = false;
      }
      else{
        touchSideBoolean = true;
      }

    }

    if (this.y - this.size/2 < 0 || this.y + this.size/2 > height) {
      this.vy = -this.vy;
      this.playNote();
      //touch the side of the screen, change the boolean value to true
      if (touchSideBoolean){
        touchSideBoolean = false;
      }
      else{
        touchSideBoolean = true;
      }
    }
  }

  playNote() {
    //calculate the frequency of the ball based on its velocity
    //calculate the magnitude of the velocity
    let magnitudeVelocity = sqrt(this.vx*this.vx+this.vy+this.vy);
    this.freq = magnitudeVelocity * 5;
    this.osc.start(this.freq);
  }

  display() {

    if (touchSideBoolean){
      push();
      noStroke();
      fill(0);
      ellipse(this.x,this.y,this.size);
      pop();
    }
    else{
      push();
      noStroke();
      fill(this.fill.r,this.fill.g,this.fill.b);
      ellipse(this.x,this.y,this.size);
      pop();
    }

  }

  wrap(){
    if (this.y <= -this.size){
      this.y = height;
    }
    else if (this.y > height+this.size){
      this.y = 0;
    }
    else if (this.x <= 0){
      this.vx = -this.vx;
    }
    else if (this.x > width){
      this.vx = -this.vx;
    }
  }
}
