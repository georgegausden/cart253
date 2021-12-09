class PortTile extends LandTile {
  constructor(x, y, r, g, b, transparency, type, portName, portDisplayImage,music,treasure) {
    super(x, y, r, g, b, transparency, type);
    this.portName = portName;
    this.portImage = portDisplayImage;
    this.music = music;
    this.treasure = treasure;
  }

  //displays the port tile on the canvas
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
    if (!this.music.isPlaying()) {
      this.music.play();
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
    this.reloadLives();
    this.collectTreasure();

    //give the user the option to leave the port
    let backToMapButton = new Button(width / 2, (height / 2 + 200), 200, 100, "Back to Map", 25);
    backToMapButton.drawButton();

    if (backToMapButton.checkInButton()){
      //go back to the map, so change the state of the user from shipDocked to atSea and end the music
      this.music.stop();
      user.backToSea();
    }
  }

  //This function reloads the cannons of the user if they select the button
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
      if (!rearmSFX.isPlaying()){
        rearmSFX.play();
      }
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

  reloadLives(){
    push();
    fill(255);
    stroke(2);
    textAlign(CENTER);
    textSize(50);
    textFont(medievalFont);
    text('Repair ship', width / 2 - 100, height / 2);
    pop();

    let reloadLivesButton = new Button(width / 2 + 200, (height / 2 -10), 100, 50, "Repair", 25);
    reloadLivesButton.drawButton();

    if (reloadLivesButton.checkInButton()){
      //reload the lives of the user
      if (!repairSFX.isPlaying()){
        repairSFX.play();
      }
      user.lives = 5;
    }
  }

  collectTreasure(){
    push();
    fill(255);
    stroke(2);
    textAlign(CENTER);
    textSize(50);
    textFont(medievalFont);
    text('Collect Treasure', width / 2 - 100, height / 2 +100);
    pop();

    let collectTreasureButton = new Button(width / 2 + 200, (height / 2 + 90), 200, 50, "Collect Treasure", 25);
    collectTreasureButton.drawButton();

    if (collectTreasureButton.checkInButton()){
      //collect the treasure
      if (!treasureSFX.isPlaying()) {
    treasureSFX.play();
  }
      user.treasure += this.treasure;
      this.treasure = 0;
    }
  }

}
