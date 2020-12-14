var banana, bananaImage,monkey_running;
var obstacleImage, obstacleGroup;
var backGround, backGround1, backGround2, backGround_Image, invisibleGround ;
var stone, stoneImg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var i = 0;

function preload() {
  //load images and animations
  
  backGround_Image = loadImage("jungle.jpg");
  
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  monkeyCollided = loadAnimation("Monkey_01.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  //create canvas
  createCanvas(windowWidth, windowHeight);
  
  //create backgrounds
  backGround = createSprite(width,height/2,width,height);
  backGround.addImage("background",backGround_Image);
  backGround.scale = 0.5;
  backGround.x = width/2;
  
  backGround1 = createSprite(width/-2,height/2,width,height);
  backGround1.addImage("background",backGround_Image);
  backGround1.scale = 0.5;
  backGround1.x = width/2;
  
  backGround2 = createSprite(width/-2,height/2,width,height);
  backGround2.addImage("background",backGround_Image);
  backGround2.scale = 0.5;
  backGround2.x = width/2;
  
  backGround3 = createSprite(width/-2,height/2,width,height);
  backGround3.addImage("background",backGround_Image);
  backGround3.scale = 0.5;
  backGround3.x = width/2;
  
  backGround4 = createSprite(width/-2,height/2,width,height);
  backGround4.addImage("background",backGround_Image);
  backGround4.scale = 0.5;
  backGround4.x = width/2;
  
  //create monkey
  monkey = createSprite((width/4)-40,windowHeight/2+90);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  //create invisibleGround
  invisibleGround = createSprite(monkey.x,monkey.y+30,100,2);
  invisibleGround.visible = false;     
  
  //make groups
  foodGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {

  
//introduce gameState PLAY
 if(gameState === PLAY) {
  //give the velocity to the backgrounds
  backGround.velocityX = -4;
  backGround1.velocityX = -4;
  backGround2.velocityX = -4;
  backGround3.velocityX = -4;
  backGround4.velocityX = -4;
  
  //make the backGround fit according the screen size
  
  if(windowWidth < 1100 ) {
  if(backGround.x < windowWidth) {
    backGround1.x = backGround.x+500;
  }
  
  if(backGround1.x < windowWidth) {
    backGround2.x = backGround1.x+500;
  }
  
  if(backGround2.x < windowWidth) {
    backGround.x = backGround2.x+500;
  }
  
  
  }
  
  if(windowWidth > 1100 ) {
  if(backGround.x < windowWidth) {
    backGround1.x = backGround.x+500;
  }
  
  if(backGround1.x < windowWidth) {
    backGround2.x = backGround1.x+500;
  }
  
  if(backGround2.x < windowWidth) {
    backGround3.x = backGround2.x+500;
  }
  
  if(backGround3.x < windowWidth) {
    backGround.x = backGround3.x+500;
  }
  
  }
  
  //to jump monkey if space key is pressed
  if(keyDown("space") && monkey.y >= 150) {
    monkey.velocityY = -6;
  }
  
  //add gravity
  monkey.velocityY = monkey.velocityY + 0.8
  
  //give monkey a constant position
  monkey.collide(invisibleGround);
  
   //scoring system
  if(monkey.isTouching(foodGroup)) {
    score = score+2;
    foodGroup.destroyEach();
  }
  
   //change monkey size
  switch(score) {
    case 10: monkey.scale = 0.12;
      break;
    case 25 : monkey.scale = 0.13;
      break;
    case 40 : monkey.scale = 0.14;
      break;
    case 55 : monkey.scale = 0.15;
      break;
    case 70 : monkey.scale = 0.16;
       break;
    default: break;
  }
   
   //call the functions
   food();
   obstacles();
   
   //increase monkey size when it collide with the stone first time
   if(obstacleGroup.collide(monkey)) {
      monkey.scale=0.12;
     i=i+1;
     obstacleGroup.destroyEach();
   }
   
   //when monkey collide with the stone second time make game over
   if(i === 2) {
     gameState = END;
   }
     //introduce gameState END
 } else if(gameState === END) {
    monkey.destroy()
    backGround.destroy()
    backGround1.destroy()
    backGround2.destroy()
    backGround3.destroy()
    backGround4.destroy()
    obstacleGroup.destroyEach()
    foodGroup.destroyEach()
    
   //position of background1 in gameState END
    backGround1.x = width;
    backGround1.y = height/2;
    textSize(50)
    fill("Crimson")
    text.depth = backGround1.depth+1;
    text("You Lost!", windowWidth/2-50,windowHeight/2);
   
   
   
   //give monkey a constant position
  monkey.collide(invisibleGround);
  }
  
  //to drawSprites
  drawSprites();
  
   
  //Display Score
   stroke("Black");
   fill("Black");
   textSize(20);
   text("score: " + score,windowWidth-150,(windowHeight/3)-50);
  
  //display death
   text("death: "+ i, windowWidth-250,(windowHeight/3)-50);
}

//introduce function fruit
function food() {
  if(World.frameCount%80 === 0) {
 var banana = createSprite(windowWidth+10,200,20,20);
     banana.addImage(bananaImage);
     banana.scale = 0.05;
     banana.velocityX = -5;
              
     banana.y = Math.round(random(120,200));
     banana.setLifetime = windowWidth + 10;
    
     foodGroup.add(banana);
  }
}

//introduce functon obstacles
function obstacles() {
  if(World.frameCount%300 === 0) {
     var obstacle = createSprite(windowWidth+10,invisibleGround.y-25,10,40);
         obstacle.velocityX = -8;
         obstacle.addImage(obstacleImage);
         obstacle.scale = 0.2;
    
         obstacle.setLifetime = windowWidth+10;  
    
         obstacleGroup.add(obstacle);
  }
}

//Hpoe!! you are enjoying the game