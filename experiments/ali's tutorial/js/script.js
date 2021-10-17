//solar system creating

let sun;

let earth;

let g = 9;



function setup() {
  createCanvas(600, 600);
  background(255);

  //create a sun
  sun = createPlanet(width / 2, height / 2, 0, 0, 0, 0, 100, 100, 255, 255, 200);
  earth = createPlanet(width / 2 + 200, height / 2 - 100, 0, 0, 0, 0, 100, 50, 255, 50, 255);
}

function draw() {
  //display our planets
  displayPlanet(sun);
  displayPlanet(earth);

  movePlanet(earth);

  gravity(earth, sun);







}

function gravity(planet1, planet2){
  let d = dist(planet1.x, planet1.y, planet2.x, planet2.y);

  planet1.ax = -1*g*planet2.mass/(d*d);
  planet1.ay = -1*g*planet2.mass/(d*d);
}

function movePlanet(planet) {
  planet.x += planet.vx;
  planet.y += planet.vy;
  planet.vx += planet.ax;
  planet.vy += planet.vy;
}

function displayPlanet(planet) {
  push();
  fill(planet.fill.r, planet.fill.g, planet.fill.b);
  circle(planet.x, planet.y, planet.size);
  pop();
}

function createPlanet(x, y, vx, vy, ax, ay, mass, size, colourR, colourG, colourB) {
  planet = {
    x: x,
    y: y,
    vx: vx,
    vy: vy,
    ax: ax,
    ay: ay,
    mass: mass,
    size: size,
    fill: {
      r: colourR,
      g: colourG,
      b: colourB
    }
  }
  return planet;
}
