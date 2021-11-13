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
    this.vx = 0;
    this.vy = vy;
    this.friction = 0.5;
    this.randomness = 0.51;

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


  playNote() {
    //calculate the frequency of the ball based on its velocity
    //calculate the magnitude of the velocity
    this.playOscillator();
    let time = millis();
    //after a certain time, decrease the volume
    if (time>1000){
      this.osc.amp(0,0.5);
      this.osc.stop();
    }
  }

  playOscillator(){
    let magnitudeVelocity = sqrt(this.vx*this.vx+this.vy+this.vy);
    this.freq = magnitudeVelocity * 10;
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

  friction(){
    if (this.vx >= 0){
      this.vx -= this.friction;
    }
    else if (this.vx < 0){
      this.vx += this.friction;
    }

    if (this.vy >= 0){
      this.vy -= this.friction;
    }
    else if (this.vy < 0){
      this.vy += this.friction;
    }
  }

  wrap(){
    //touch the side of the screen, so play note
    if (this.y <= -this.size){
      this.playNote();
      this.y = height;
      //lose some speed
      this.friction();
    }
    else if (this.y > height+this.size){
      this.playNote();
      this.y = 0;
      this.friction();
    }
    else if (this.x <= 0){
      this.vx = -this.vx;
    }
    else if (this.x > width){
      this.vx = -this.vx;
    }
  }


}
