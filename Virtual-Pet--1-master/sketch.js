//Create variables here
var database
var dog,happyDog;
var foodS,foodStock;;

function preload(){
  //load images here
  dogImg = loadImage("images/dogImg.png");
  dog1Img = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500,500);

 dog = createSprite(250,250,50,50);
dog.addImage(dogImg);
dog.scale = 0.5;
foodStock = database.ref('food');
foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dog1Img);
  }

  drawSprites();
  //add styles here
  fill("red");
  textSize(15);
  text("FoodStockLeft:"+foodS,200,200);
  fill("green");
  textSize(15);
  text("Note = PressUp_AroowKeyToFeedDogMilk",300,300);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
database.ref('/').update({
  food:x
})
}