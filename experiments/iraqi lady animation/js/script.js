//import image
let iraqi;

let arabicfont;

let writing = ["aaa", "bbb", "ccc", "ddd", "eee", "fff", "ggg", "hhh", "iii", "jjj", "kkk"];
let texts = [];

let size = 30;
let numberOfLines = undefined;


let spacing = 50;

let m= 0;

function preload(){
 iraqi = loadImage('assets/images/Untitled-1.png');
 arabicfont = loadFont('assets/fonts/urdu.ttf');
 numberOfLines = texts.length;


}


function setup() {
  createCanvas(600, 600);
  background(10,80,30);

  for (let i = 0; i < numberOfLines; i++){
    texts[i] = createTextVariable(writing[i], 500, spacing, 1)
  };

}

function draw() {
  //add the writing in the background
  for (let i = 0; i<numberOfLines; i++){
    createText(texts[i].text, width-500, spacing+spacing*i, size);
  }


  //move the text a bit randomly
  moveText(texts[0]);



  //iraqi lady
  imageMode(CENTER);
  image(iraqi, width/2, height/2, width-200, height);



}

function createText(text1,x,y,size){
  push();
  textFont();
  noStroke();
  fill(255);
  textSize(size);
  text(text1,x,y);
  pop();

}

function createTextVariable(words,x,y,vx){
  writing = {
    text: words,
    x: x,
    y: y,
    vx: vx
  };

  return writing;
}

function moveText(textVariable){

  textVariable.x += textVariable.vx;


}

console.log(texts);
