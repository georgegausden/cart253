
function setup() {
  createCanvas(500,500);
  let hotCelsius = toCelsius(100);
  console.log("100 degrees Fahrenheit is" + ${hotCelsius} "degrees celsius.");
}


function draw(){
  background(0);


  let x = random(0,width);
  let y = random(0,height);

  ellipse(x,y,100);
}

function toCelsius(farenheight){
  let celsius = (farenheight - 32) * 5/9;
  return celsius;
}
