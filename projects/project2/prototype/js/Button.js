class Button {
  constructor(x, y, width, height, text, fontSize) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.fill = {
      r: 108,
      g: 206,
      b: 217,
    };
    this.text = text;
    this.textFill = {
      textR: 255,
      textG: 255,
      textB: 255
    };
    this.fontSize = fontSize;
    this.lighten = 50;
    this.buttonCurvature = 50;
  }

  //display the button the screen, also allows for the button to be lightened when hovered over
  drawButton() {
    push();
    fill(this.fill.r, this.fill.g, this.fill.b);
    rectMode(CENTER);
    this.lightenButton(this.x, this.y, this.width, this.height, this.fill.r, this.fill.g, this.fill.b);
    rect(this.x, this.y, this.width, this.height, this.buttonCurvature);
    pop();

    //be able to go back to the main menu
    push();
    textSize(this.fontSize);
    fill(this.textFill.r, this.textFill.g, this.textFill.b);
    textAlign(CENTER, CENTER);
    text(this.text, this.x, this.y);
    pop();
  }

  //lightens the button when the user is hovering over it with the mouse
  lightenButton(xPosition, yPosition, shapeWidth, shapeHeight, fillR, fillG, fillB) {
    if (this.isHovering(xPosition, yPosition, shapeWidth, shapeHeight)) {
      fill(fillR + this.lighten, fillG + this.lighten, fillB + this.lighten);
    } else {
      fill(fillR, fillG, fillB);
    }
  }

  //a boolean to check if the user is in fact over the button
  isHovering(xPosition, yPosition, shapeWidth, shapeHeight) {
    if ((mouseX >= xPosition - shapeWidth / 2) && (mouseX <= xPosition + shapeWidth / 2) && (mouseY < yPosition + shapeHeight / 2) && (mouseY > yPosition - shapeHeight / 2)) {
      return true;
    } else {
      return false;
    }
  }

  //a boolean to check that the user clicked the button
  checkInButton() {
    if ((mouseX >= this.x - this.width / 2) && (mouseX <= this.x + this.width / 2) && (mouseIsPressed === true) && (mouseY < this.y + this.height / 2) && (mouseY > this.y - this.height / 2)) {
      return true;

    } else {
      return false;
    }
  }

}
