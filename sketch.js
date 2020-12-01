  var monkey_lose;
  var you_lose;
  var monkey , monkey_running;
  var banana ,bananaImage, obstacle, obstacleImage;
  var bananaGroup, obstacleGroup;
  var score=0;
  var ground;
  var survivalTime=0;
  var backpic;
  var back;
  
 
function preload(){
  
    //monkey running
    monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

      you_lose = loadImage("you_lose.gif");
      
  
    //banana 
    bananaImage   = loadImage("banana.png");

    //obstacle
    obstacleImage = loadImage("obstacle.png");
 
  obstacleGroup=createGroup();
  bananaGroup=createGroup();
  backpic=loadImage("animated froest for game.gif");
}



function setup() {
  createCanvas(400,400);

    // creating mokey,monkey animation,monkey scale
    monkey=createSprite(50,350,10,20);
    monkey.addAnimation("monkey moving",monkey_running);
    monkey.scale=0.2;
  
    

    //creation of ground, ground velocity
    ground=createSprite(200,350,800,10);
    ground.x = ground.width /2;
    ground.velocityX = -4;
    ground.visible=false;
  

    back=createSprite(200,180,400,400);
    back.addImage(backpic);
    back.x = ground.width /2;
    back.velocityX = -4;
    back.scale=1;
  
    monkey_lose=createSprite(200,200,400,400);
    monkey_lose.addImage(you_lose);
    monkey_lose.scale=1;
    monkey_lose.visible=false;
    

}


function draw() {
background("white");
  
  monkey.depth=back.depth;
  monkey.depth=back.depth+1;
  obstacle.depth=monkey.depth;  
  monkey_lose.depth=obstacleGroup.depth;
  monkey_lose.depth=30000;
  
  
    //to make ground move 
    if (ground.x < 0){
        ground.x = ground.width/2;
      }

    //to make monkey collide on ground
    monkey.collide(ground);
  
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y > 201 ) {
        monkey.velocityY = -12;
      
    }
  
    // gravity
    monkey.velocityY = monkey.velocityY + 1 ;
    
  //calling functions
  bananas();
  obstacle();
  
  
  //to add score
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    score=score+1;
  }
  
  if(monkey.isTouching(obstacleGroup)){
    ground.velocityX=0;
    back.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    monkey.destroy();
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);  
    monkey_lose.visible=true;
    back.visible=false;
    monkey.velocityY=0;
  }
    
  
     if (back.x < 0){
        back.x = back.width/2;
      
  }
  
  
  
  drawSprites();
    stroke("white");
  textSize(20);
  fill("white")
  text("Score: " +score,230,50);
  
  //survival time
  stroke("white");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: "+survivalTime,50,50);
}

function bananas(){
  //spawning food 
  if (frameCount%80 === 0){
    //banana creation, banana image,scale,velocity,lifetime
    var banana = createSprite(620,120,50,50);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-4;           
    banana.lifetime = 400;
    // to add banana in banana group
    bananaGroup.add(banana);
  }
}

function obstacle(){
  if (frameCount % 300 === 0){
   var obstacle = createSprite(400,310,10,40);
   obstacle.velocityX = -4;
   obstacle.addImage(obstacleImage);
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 600;
   
   //add each obstacle to the group
   obstacleGroup.add(obstacle);
 }
}