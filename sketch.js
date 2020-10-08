var PLAY=1;
var END=0;
var gameState=1;

var sword,fruit ,monster,fruitGroup,enemyGroup, score,r,randomFruit;
var swordImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage,gameOverSound,knifeSwooshSound;


function preload(){
  
  swordImage = loadImage("sword.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png");
  gameOverSound = loadSound("gameover.mp3");
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
  
}



function setup() {
  createCanvas(600, 600);
  
  sword=createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7

  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();

  sword.setCollider("rectangle",0,-10,80,80)
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    fruits();
    Enemy();
    
    // Move sword with mouse
    sword.y=World.mouseY;
    sword.x=World.mouseX;
  
    // Increase score if sword touching fruit
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      knifeSwooshSound.play();
      score=score+2;
    }
    else
    {
      if(enemyGroup.isTouching(sword)){
        gameState=END;
        
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        
        sword.addImage(gameOverImage);
        gameOverSound.play();
        sword.scale = 2
        sword.x=300;
        sword.y=300;
      }
    }
  }
  
  drawSprites();
  
  text("Score : "+ score,500,50);
}


function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(599,200,20,20);
    position = Math.round(random(1,2));
    
    if(position ==1){
      monster.x = 600; 
      monster.velocityX = -(8+(score/4))
    }   
    if(position ==2){
      monster.x = 0;
      monster.velocityX = 8+(score/4);
    }     
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,500));
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(600,200,20,20);
    position = Math.round(random(1,2));
    
    if(position == 1){
      fruit.x = 600;
      fruit.velocityX = -(7+(score/4));
    } 
    if(position == 2){
      fruit.x = 0;
      fruit.velocityX = 7+(score/4);
    }
    fruit.scale=0.2;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}

