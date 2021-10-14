let list1 = [1,2,3,4,5];
let list2 = ['a','b','c'];

function setup() {
  createCanvas(500, 500);

}

function draw() {
  background(0);
  list1.splice(1,0,list2[0]);
  console.log(list1); 

}

console.log(list1);
