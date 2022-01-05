
let balls = [];
let numberBalls = 5;
let obstacles = [];
let numberObstacles = 50;
let obstacleInteriors = [];
let sun = undefined;
let g = 2;

function setup(){
  createCanvas(windowWidth,windowHeight);

  sun = new Attractor(width/2,height/2,100,100);

  for (let i = 0; i<numberBalls;i++){
    let ball = new Ball(random(0,width),random(height/2,0),random(0,3));
    balls.push(ball);
  }

  // for (let i = 0; i<numberObstacles; i++){
  //   let obstacle = new Obstacle(random(0,width),random(0,height),random(100,200),random(100,200));
  //   obstacles.push(obstacle);
  //
  //   let obstacleInterior = new ObstacleInterior(obstacle.x,obstacle.y,obstacle.width,obstacle.height,obstacle.curvature,random(0.3,0.8),random(0.3,0.8));
  //   obstacleInteriors.push(obstacleInterior);
  //
  //   // let ball = new Ball(random(obstacle.x-obstacle.width/2,obstacle.x+obstacle.width/2),random(obstacle.y+obstacle.height/2,obstacle.y-obstacle.height/2),random(0,3));
  //   // balls.push(ball);
  //}

}

function draw(){
  background(0);

  sun.display();

  // for (let i =0; i<obstacles.length; i++){
  //   let obstacle = obstacles[i];
  //   obstacle.display();
  //   let obstacleInterior = obstacleInteriors[i];
  //   obstacleInterior.display();
  //   obstacleInterior.move(obstacle);
  //   // let ball = balls[i];
  //   // ball.display();
  //   // ball.move();
  //   // ball.bounceOffObstacle(obstacle);
  //   // ball.checkGravityInBox(obstacle);
  // }

  for (let i = 0; i<balls.length;i++){
    let ball = balls[i];
    ball.display();
    ball.checkGravity();
    ball.move();
    ball.bounceOffGround();
    ball.wrap();
    ball.attraction(sun);
  }

  //check to see if a ball touches the attractor
  for (let i = 0; i<balls.length; i++){
    let ball = balls[i];
    if (touching(ball,sun)){
      //make them stick to eachother
      sun.size += ball.size;
      sun.mass += ball.mass;
      balls.splice(i,1);
    }
  }


}

function touching(object1,object2){
  let d = dist(object1.x,object1.y,object2.x,object2.y);

  if (d<object1.size/2+object2.size/2){
    return true
  }
}

// function mousePressed(){
//   //create new obstacle
//   let obstacle = new Obstacle(mouseX,mouseY,random(100,200),random(100,200));
//   obstacles.push(obstacle);
// }
