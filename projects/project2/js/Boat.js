class Boat {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.fill = 255;
  }

  //displays the boat on the canvas
  display() {
    push();
    imageMode(CENTER);
    image(boatImageRight, this.x, this.y, this.size, this.size);
    pop();

  }




}
