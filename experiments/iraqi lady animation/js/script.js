//create a grid of squares


let squares = [];

//split the canvas up into squares

let numberOfSquares = undefined;
let numberOfRows = 10;
let numberOfColumns = 10;
let counter = 0;
let counter2 = 0;

function setup(){
  createCanvas(500,500);
  background(255);
  numberOfSquares = numberOfRows * numberOfColumns;

  for (let j = 0; j<numberOfRows; j++){
    for (let i = 0; i<numberOfColumns; i++){
      squares.push(createRectangle(width/numberOfColumns*i,height/numberOfRows*j,random(0,255),random(0,255),random(0,255), 255));
    }
  }

}

function draw(){
  for (let i = 0; i<squares.length; i++){
    noStroke();
    fill(squares[i].fillR, squares[i].fillG, squares[i].fillB, squares[i].transparency);
    rect(squares[i].x, squares[i].y,  squares[i].width, squares[i].height);
  };






  //change the colour of the squares over time
  let time = millis();
  if (time >= 100){
    for (let i = 0; i<squares.length; i++){
      let element = int(random(0,squares.length));
      let threshold = random(0,1);
      if (threshold <= 0.01){
        squares[element].fillR = random(0,255);
        squares[element].fillG = random(0,255);
        squares[element].fillB = random(0,255);
        squares[element].transparency = random(0,100);
        squares[element].width = random(0,100);
        squares[element].height = random(0,100);
      }
    }
  }
}

function createRectangle(x,y,r,g,b, transparency){
  rectangle = {
    x: x,
    y: y,
    width:width/numberOfColumns,
    height:height/numberOfRows,
    fillR: r,
    fillG: g,
    fillB: b,
    transparency: transparency
  };

  return rectangle;

}



function checkTouch(x1,y1,x2,y2){
  let d = dist(x1,y1,x2,y2);

  if (d <= 10){
    return true;
  };
}

console.log(squares)
