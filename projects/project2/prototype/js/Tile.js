class Tile {
  constructor(x, y, r, g, b, transparency, type) {
    this.x = x;
    this.y = y;
    this.width = width / numColumns;
    this.height = height / numRows;
    this.fillR = r;
    this.fillG = g;
    this.fillB = b;
    this.transparency = transparency;
    this.type = type;
    this.index = undefined;
  }

  //adds an index value to the tile
  addIndex(index) {
    this.index = index;
  }

  //displays the tile on the canvas depending if its land, water or a port
  display() {
    stroke(255, 255, 255, 200);
    strokeWeight(0.1);

    if (this.type === 'land') {
      imageMode(CENTER);
      image(landImage, this.x, this.y, this.width, this.height);
    } else if (this.type === 'water') {
      imageMode(CENTER);
      image(waterImage, this.x, this.y, this.width, this.height);
    } else if (this.type === 'port') {
      imageMode(CENTER);
      image(portImage, this.x, this.y, this.width, this.height);
    }
  }

}
