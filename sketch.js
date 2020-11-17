var boy, boyImage;
var sun, sunImage;
var ground, groundImage;
var obstacle, obstacleImage, obstacleGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;

function preload(){
  boyImage = loadImage("Picture1.png");
  sunImage = loadImage("sun.png"); 
  obstacleImage = loadImage("stone.png");
  groundImage = loadImage("Background.jpg");
}
function setup() {
  createCanvas(600, 600);
  
  ground = createSprite(300, 300, 600, 600);
  ground.addImage("ground", groundImage);
  ground.velocityX = -2;
  
  boy = createSprite(100, 450, 10, 10);
  boy.addImage("boy", boyImage);
  boy.scale = 0.2;
  
  sun = createSprite(500, 100, 10, 10);
  sun.addImage("sun", sunImage);
  sun.scale = 0.2;
  
  invisibleGround = createSprite(300,520,600,10);
  invisibleGround.visible = false;
  
  obstacleGroup = new Group();
  
  score = 0;
}

function draw() {
 background(0);
  
  if (ground.x < 200){
    ground.x = ground.width/2;
  }
  
  boy.collide(invisibleGround);
  
  if (gameState===PLAY){
  
  if(keyDown("space") && boy.y >= 440) {
      boy.velocityY = -12;
    }
    score = score + Math.round(getFrameRate()/60);
    
    boy.velocityY = boy.velocityY + 0.8;
    
   spawnObstacles();
   
    if(boy.isTouching(obstacleGroup)){
       gameState = END;
       }
  }
  if (gameState===END){
    ground.velocityX = 0;
    boy.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
     
  }
   if(keyDown("space") && gameState === END) {
      gameState = PLAY;
    }
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("SCORE : "+score, 490, 50);
}
function spawnObstacles(){
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(600,490,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.setCollider("circle", 0, 0, 40);
    obstacle.velocityX = -(6 + 3*score/100);
    obstacle.x = Math.round(random(300, 500));
    obstacle.lifetime = -1;
    obstacleGroup.add(obstacle);
  }
}







