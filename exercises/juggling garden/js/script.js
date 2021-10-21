// Our garden
let garden = {
  // An array to store the individual flowers
  flowers: [],
  // How many flowers in the garden
  numFlowers: 30,
  //array of bees
  bees: [],

  numBees: 7,
  // The color of the grass (background)
  grassColor: {
    r: 120,
    g: 180,
    b: 120
  }
};

//add constrain
let atmosphere = {
  //an array to store the amount of rain drops
  rain: [],
  //how many drops of rain there are
  amountOfRain: 40,
}

// setup() creates the canvas and the flowers in the garden
function setup() {
  createCanvas(600, 600);

  // Create our flowers by counting up to the number of the flowers
  for (let i = 0; i < garden.numFlowers; i++) {
    let x = random(0,width);
    let y = random(0,height);
    let size = random(50,80);
    let stemLength = random(50,100);
    let petalColor = {
      r: random(100,255),
      g: random(100,255),
      b: random(100,255)
    }
    // Create a new flower
    let flower = new Flower(x, y, size, stemLength, petalColor);
    // Add the flower to the array of flowers
    garden.flowers.push(flower);
  }

  for (let i = 0; i < garden.numBees; i++){
    let bee = new Bee(random(0,width),random(0,height));
    garden.bees.push(bee);
  }

  //generate the rain drops available
  for (let i = 0; i < atmosphere.amountOfRain; i++){
    let raindrop = new Rain(undefined,undefined,20,255);
    atmosphere.rain.push(raindrop);
  }
}


// draw()
// Displays our flowers
function draw() {
  // Display the grass
  background(garden.grassColor.r, garden.grassColor.g, garden.grassColor.b);

  // Loop through all the flowers in the array and display them
  for (let i = 0; i < garden.flowers.length; i++) {
    let flower = garden.flowers[i];
    if (flower.alive){
      flower.shrink();
      flower.display();
    }
  }

  for (let i = 0; i < garden.bees.length; i++) {
    let bee = garden.bees[i];
    if (bee.alive){
      bee.shrink();
      bee.move();
      bee.display();

      for (let j = 0; j< garden.flowers.length; j++){
        let flower = garden.flowers[j];
        if (flower.alive){
          bee.tryToPollinate(flower);
        }

      }
    }
  }

  for (let i = 0; i < atmosphere.rain.length; i++){
    let raindrop = atmosphere.rain[i];
    if (mouseIsPressed){
      raindrop.display();
      raindrop.move();
    }
  }




}
