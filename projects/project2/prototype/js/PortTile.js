class PortTile extends LandTile {
  constructor(x, y, r, g, b, transparency, type, portName, portDisplayImage) {
    super(x, y, r, g, b, transparency, type);
    this.portName = portName;
    this.portImage = portDisplayImage;
  }

  display() {
    imageMode(CENTER);
    image(portImage, this.x, this.y, this.width, this.height);
  }

  //this function displays the port information and options they can choose from
  shipDocked() {
    push();
    imageMode(CENTER);
    image(this.portImage, width / 2, height / 2, width, height);
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

    this.reloadCannons();

    //give the user the option to leave the port
    let backToMapButton = new Button(width / 2, (height / 2 + 150), 200, 100, "Back to Map", 25);
    backToMapButton.drawButton();

    if (backToMapButton.checkInButton()){
      //go back to the map, so change the state of the user from shipDocked to atSea and end the music
      portMusic.stop();
      user.backToSea();
    }
  }

  reloadCannons(){
    push();
    fill(255);
    stroke(2);
    textAlign(CENTER);
    textSize(50);
    textFont(medievalFont);
    text('Reload cannons', width / 2 - 100, height / 2 - 100);
    pop();

    let reloadCannonsButton = new Button(width / 2 + 200, (height / 2 - 110), 100, 50, "Reload", 25);
    reloadCannonsButton.drawButton();

    if (reloadCannonsButton.checkInButton()){
      //reload the cannons of the user ********
      //delete all the elements inside the array of user cannons and regenerate a new batch of 5
      user.cannons.splice(0);
      //setup a new array of empty cannons and set the user cannons back to 0
      for (let i = 0; i < numberOfUserCannons; i++) {
        let cannon = new Cannon(undefined,undefined,undefined,undefined);
        user.cannons.push(cannon);
      };
      user.cannonNumber = 0;
    }
  }


}
