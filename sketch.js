var dog, happyDog, dogImage;
var database;
var foodS, foodStock;


function preload()
{
  dogImage = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
}

function setup() {
 database = firebase.database();
 foodStock = database.ref('Food');
 foodStock.on("value", readStock);

  createCanvas(500, 500);
  dog = createSprite(400, 450, 20, 20);
  dog.addImage(dogImage);
  dog.scale = 0.1;
  
  foodV = 20;
}


function draw() {  
background(46, 139, 87);

if(keyCode === UP_ARROW) {
writeStock(foodS);
dog.addImage(happyDog);

}

if(keyCode === 32) {
 dog.addImage(dogImage);
 foodV = 20;
}

  drawSprites();
  textSize(15);
  fill("grey");
  stroke(2);
  text("Note: Press UP Arrow to feed the dog", 120, 20);
  textSize(20);
  fill("grey");
  stroke(2);
  text("Food Remaining : " + foodV, 200, 250);
}

function readStock(data) {
foodS = data.val();
}

function writeStock(foodS) {
 if(foodV <= 0) {
  foodV = 0;

 } 
 if(keyWentDown(UP_ARROW)){
 foodV = foodV -1;
 }else {
 foodV = foodV;
 }

database.ref('/').update({
  Food:foodV
})


}