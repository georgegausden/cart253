class Circle{
  constructor(x,y,vy,identifier,r,g,b,a){
    this.x=x;
    this.y=y;
    this.vy = vy;
    this.vx = 0;
    this.size = 50;
    this.randomness = 0.01;
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    this.identifier = identifier;
  }


  display(){
    push();
    stroke(0);
    strokeWeight(0.2);
    fill(this.r,this.g,this.b, this.a);
    circle(this.x,this.y,this.size);
    pop();
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

  move(){
    this.x += this.vx;
    this.y += this.vy;

    //add some randomness
    let r = random(0,1);
    if (r<0.5){
      this.vy += this.randomness;
      this.vx -= this.randomness;
    }
    else{
      this.vy -= this.randomness;
      this.vx += this.randomness;
    }
  }

  bounce(){
    let i = 0;

    let d = dist(this.x,this.y,circles[i].x,circles[i].y);

    if (d <= this.size/2+circles[i].size/2) {
      console.log('true')
    }

    i++;
  }


}
