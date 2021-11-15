class PortTile extends LandTile {
  constructor(x, y, r, g, b, transparency, type, portName) {
    super(x, y, r, g, b, transparency, type);
    this.portName = portName;
  }

  display() {
    imageMode(CENTER);
    image(portImage, this.x, this.y, this.width, this.height);
  }

  //this function displays the port information and options they can choose from
  shipDocked() {
    push();
    imageMode(CENTER);
    image(portDisplayImage, width / 2, height / 2, width, height);
    pop();

    //play the port music
    if (!portMusic.isPlaying()) {
      portMusic.play();
    }
    //display the text
    push();
    fill(255);
    stroke(2);
    textAlign(CENTER);
    textSize(50);
    textFont(medievalFont);
    text('Welcome to ' + this.portName, width / 2, height / 6);
    pop();

    //give the user the option to leave the port
    let backToMenu = this.createButtonVariable(width / 2, (height / 2 + 150), 200, 100, "Back to menu", 25);
    this.drawButton(backToMenu);

  }

  createButtonVariable(x, y, width, height, text, fontSize) {
    let button = {
      x: x,
      y: y,
      width: width,
      height: height,
      fill: {
        r: buttonElements.r,
        g: buttonElements.g,
        b: buttonElements.b,
      },
      text: text,
      textFill: {
        r: buttonElements.textR,
        g: buttonElements.textG,
        b: buttonElements.textB
      },
      fontSize: fontSize,
    }
    return button;
  }

  drawButton(button) {
    push();
    fill(button.fill.r, button.fill.g, button.fill.b);
    rectMode(CENTER);
    this.lightenButton(button.x, button.y, button.width, button.height, button.fill.r, button.fill.g, button.fill.b);
    rect(button.x, button.y, button.width, button.height, buttonCurvature);
    pop();

    //be able to go back to the main menu
    push();
    textSize(button.fontSize);
    fill(button.textFill.r, button.textFill.g, button.textFill.b);
    textAlign(CENTER, CENTER);
    text(button.text, button.x, button.y);
    pop();
  }

  lightenButton(xPosition, yPosition, shapeWidth, shapeHeight, fillR, fillG, fillB) {
    if (this.isHovering(xPosition, yPosition, shapeWidth, shapeHeight)) {
      fill(fillR + lighten, fillG + lighten, fillB + lighten);
    } else {
      fill(fillR, fillG, fillB);
    }
  }

  isHovering(xPosition, yPosition, shapeWidth, shapeHeight) {
    if ((mouseX >= xPosition - shapeWidth / 2) && (mouseX <= xPosition + shapeWidth / 2) && (mouseY < yPosition + shapeHeight / 2) && (mouseY > yPosition - shapeHeight / 2)) {
      return true;
    } else {
      return false;
    }
  }
}
