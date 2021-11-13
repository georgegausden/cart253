"use strict";

let circles = [];
let numberOfCircles = 10;

function setup(){
  createCanvas(windowWidth,windowHeight);
  background(255);


  for (let i =0; i<numberOfCircles; i++){
    let circle = new Circle(random(0,width),height,random(-2,-1),int(random(0,circles.length)));
    circles.push(circle);
  }

}

function draw(){


  //check if two bubbles touch eachother

  for (let i = 0; i<circles.length; i++){
    let circle = circles[i];
    circle.display();
    circle.move();
    circle.wrap();
    circle.bounce();
  }
}

function checkTouch(object1,object2){
  let d = dist(object1.x,object1.y, object2.x, object2.y)
  if (d<(object1.size/2+object2.size)){
    return true
  }


}
