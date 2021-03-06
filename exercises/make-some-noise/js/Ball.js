`class Ball {

  constructor(x, y, vy) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.fill = {
      r: random(200, 255),
      g: random(200, 255),
      b: random(200, 255)
    };
    this.vx = 0;
    this.vy = vy;
    this.friction = 2;
    this.randomness = 0.1;
    this.maxSpeed = 8;

    // Synth
    this.freq = undefined;
  }

  //moves the balls around, adds some random movement and constrain the speeds
  move() {
    this.x += this.vx;
    this.y += this.vy;

    //add some randomness
    let r = random(0, 1);
    if (r > 0.5) {
      this.vy += this.randomness;
      this.vx -= this.randomness;
    } else {
      this.vy -= this.randomness;
      this.vx += this.randomness;
    }

    //constrain the velocities
    this.vx = constrain(this.vx, -this.maxSpeed, this.maxSpeed);
    this.vy = constrain(this.vy, -this.maxSpeed, this.maxSpeed);
  }

  //figures out which note to play based on the speed of the ball
  playNote() {
    //calculate the frequency of the ball based on its velocity
    //calculate the magnitude of the velocity
    this.calculateFrequency();
    this.osc = new p5.Oscillator(this.freq, 'sine');
    this.osc.start();
    this.osc.amp(0, 0.5);
  }

  //calculates the frequency that makes sense given the velocity
  calculateFrequency() {
    let magnitudeVelocity = sqrt(this.vx * this.vx + this.vy + this.vy);
    this.freq = magnitudeVelocity * 200;
  }

  //displays the balls and changes the colour of the ball based on if they touch the side of the screen
  display() {

    this.size = sizeSlider.value();

    if (touchSideBoolean) {
      push();
      noStroke();
      fill(0);
      ellipse(this.x, this.y, this.size);
      pop();
    } else {
      push();
      noStroke();
      fill(this.fill.r, this.fill.g, this.fill.b);
      ellipse(this.x, this.y, this.size);
      pop();

    }

  }

  //makes sure the balls stay in the frame, also plays the note when the side is touched
  wrap() {
    //touch the side of the screen, so play note
    if (this.y <= -this.size) {
      this.y = height;
    } else if (this.y > height + this.size) {

      this.y = 0;

    } else if (this.x <= 0) {
      this.vx = -this.vx;
      this.colourNote();
      this.playNote();


      //this.applyFriction();
    } else if (this.x > width) {
      this.vx = -this.vx;
      this.colourNote();
      this.playNote();


    }
  }

  //colours the ball if it just touched the side of the screen
  colourNote() {
    //if the ball touches the side, temporarily highlight it so the user sees
    for (let i = 0; i < balls.length; i++) {
      let ball = balls[i];
      ball.fill.r = 255;
      ball.fill.g = 255;
      ball.fill.b = 255;
    }

    this.fill.r = 255;
    this.fill.g = 0;
    this.fill.b = 0;
  }

  //makes the speed slider determine the value of the speed
  changeSpeed() {
    this.vx = speedSlider.value() * this.vx;
    this.vy = speedSlider.value() * this.vy;
  }
}
