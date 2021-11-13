class Ball {

  constructor(x,y,note) {
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

    // Synth
    this.note = note;
    this.synth = new p5.PolySynth();
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

  }

  bounce() {
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
    this.synth.play(this.note,0.4,0,0.1);
  }

  display() {

    if (touchSideBoolean){
      //display the ghost image
      imageMode(CENTER);
      image(ghostImage,this.x,this.y,this.size,this.size);
    }
    else{
      push();
      noStroke();
      fill(this.fill.r,this.fill.g,this.fill.b);
      ellipse(this.x,this.y,this.size);
      pop();
    }

  }

  bounceOffEachother(){
    //check the distance between this ball and the other one
    if (balls.length >= 2){
      for (let i = 1; i<balls.length; i++){
        let otherBall = balls[i];
        let d = dist(this.x,this.y, otherBall.x, otherBall.y);

        if (d <= (this.size/2 + otherBall.size/2)){
          console.log('touch');
          return true;
        }
      }
    }
  }
}
