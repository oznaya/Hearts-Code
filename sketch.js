let message = 'Hearts and Code: Rescue';
let messageX;
const xSpeed = 2;
const ySpeed = 0.05;
const amplitudeFactor = 0.1; // Amplitude as a fraction of canvas height
const verticalLetterSpacingFactor = 0.025; // Vertical letter spacing as a fraction of canvas height
let showText = true;
let showImage = false;
let myFont;
let img1;
let scaleCounter = 0;
let scaleDirection = 1;
let imgSizeFactor = 0.25; // Initial image size as a fraction of canvas height
let string = 'Loading...';
let currentCharacter = 0;
let imageLoaded = false;
let backgroundBabyImg;
let babyEatImg;
let babyIdle;
let babyHover;
let babyLearning;
let babyNight;
let backgroundBabyNightImg;
let eatButton;
let learnButton;
let sleepButton;
let ageButton;
let isEating = false;
let isLearning = false;
let isSleeping = false;
let isSceneThree = false;
let teenIdle;
let teenHover;
let teenLearning;
let teenNight;
let teenEatImg;
let teenBackgroundImg;
let teenBackgroundNightImg;
let isSceneFour = false;
let adultIdle;
let adultHover;
let adultLearning;
let adultNight;
let adultEatImg;
let adultBackgroundImg;
let adultBackgroundNightImg;
let isGraduating = false;
let graduating;
let infoButton;
let informing = false;
let hCR;
let taskEatDone = false;
let taskLearnDone = false;
let taskSleepDone = false;
let canAgeUp = false;
let fadeValue = 0; // Controls the fade
let fadingOut = false;
let fadingIn = false;
let nextScene = null;
let redoButton;

function preload() {
  myFont = loadFont('Farmhouse Goodness.ttf');
  img1 = loadImage('Ziggy.png.png');
  backgroundBabyImg = loadImage('SceneTwoBaby/BackgroundSceneOne.png');
  backgroundBabyNightImg = loadImage('SceneTwoBaby/NightTimeSceneOne.png');
  babyEatImg = loadImage('SceneTwoBaby/BABYROBOTEATING.png');
  babyIdle = loadImage('SceneTwoBaby/BABYROBOTIDLE.png');
  babyHover= loadImage('SceneTwoBaby/BABYROBOTHOVER.png');
  babyLearning= loadImage('SceneTwoBaby/BABYROBOTLEARNING.png');
  babyNight= loadImage('SceneTwoBaby/BABYROBOTNIGHT.png');
  eatButton = loadImage('Buttons/EATINGBUTTON.png');
  learnButton = loadImage('Buttons/LEARNINGBUTTON.png');
  sleepButton = loadImage('Buttons/SLEEPINGBUTTON.png');
  ageButton = loadImage('Buttons/AGEUPBUTTON.png');
  teenIdle = loadImage('SceneThreeTeen/TEENROBOTIDLE.png');
  teenHover = loadImage('SceneThreeTeen/TEENROBOTHOVER.png');
  teenLearning = loadImage('SceneThreeTeen/TEENROBOTLEARNING.png');
  teenNight = loadImage('SceneThreeTeen/TEENROBOTNIGHT.png');
  teenEatImg = loadImage('SceneThreeTeen/TEENROBOTEATING.png');
  teenBackgroundImg = loadImage('SceneThreeTeen/TEENBACKGROUNDDAY.png');
  teenBackgroundNightImg = loadImage('SceneThreeTeen/TEENBACKGROUNDNIGHGTIME.png');
  adultIdle = loadImage('SceneFourAdult/ADULTROBOTIDLE.png');
  adultHover = loadImage('SceneFourAdult/ADULTROBOTHOVER.png');
  adultLearning = loadImage('SceneFourAdult/ADULTROBOTLEARNING.png');
  adultNight = loadImage('SceneFourAdult/ADULTROBOTNIGHT.png');
  adultEatImg = loadImage('SceneFourAdult/ADULTROBOTEATING.png');
  adultBackgroundImg = loadImage('SceneFourAdult/ADULTROBOTBACKGROUNDDAY.png');
  adultBackgroundNightImg = loadImage('SceneFourAdult/ADULTROBOTBACKGROUNDNIGHT.png');
  graduating = loadImage('GRADUATEROBOT.png');
  infoButton= loadImage('i.png');
  hCR = loadImage('Hearts & Code Rescue.png');
  redoButton= loadImage('returnButton.png');
}


function setup() {
  createCanvas(windowWidth, windowHeight); // Make canvas fit the window screen
  button = createButton("Sign");
  button.mouseClicked(sceneOne);
  button.size(height * 0.2, height * 0.1); // Button size based on canvas height
  button.position(windowWidth /2, windowHeight * 0.75); // Button position based on canvas height
  button.style('background-color', color(100, 149, 237));
  input = createInput("Your Name");
  input.position(windowWidth /2, windowHeight * .7); // Input position based on canvas height
  messageX = width / 2;
  imgSize = height * imgSizeFactor;
}


function draw() {
  background(255);

  if(isGraduating){
    sceneGraduation();
  }else if (isSceneFour){
    sceneFour();
  }else if (isSceneThree){
    sceneThree();

}else if (showImage) {
    let currentString = string.substring(0, currentCharacter);
    push();
    fill(100, 149, 237);
    textFont(myFont);
    textSize(height * 0.075); // Text size based on canvas height
    text(currentString, windowWidth * .4, height * 0.875, width * 0.375, height * 0.625);
    currentCharacter += 0.03;
    pop();


    imageMode(CENTER);
    imgSize += scaleDirection * 2;
    image(img1, width / 2, height / 2, imgSize, imgSize);


    if (imgSize >= height * 0.625 || imgSize <= height * imgSizeFactor) {
      scaleDirection *= -1;
      scaleCounter++;
    }

    if (scaleCounter >= 1.5) {
      showImage = false;
      imageLoaded = true;
    }

}else if (imageLoaded) {
    sceneTwo();
  }
  else {
    mainScreen();
  } 

  if (fadingOut) {
    fadeOutWhite();
  }else if (fadingIn) {
    fadeInWhite();
  }
}

function fadeOutWhite() {
  // Increment the fadeValue to increase opacity
  fadeValue += 5; // Adjust this value for slower/faster fade
  fill(255, 255, 255, fadeValue); // White color with increasing opacity
  rect(0, 0, width, height); // Draw a white rectangle over the whole canvas

  // Once the fade-out is complete (i.e., fully white), trigger the fade-in effect
  if (fadeValue >= 255) {
    fadingOut = false; // Stop fading out
    fadeValue = 0; // Reset fade for fade-in
    transitionToNextScene(); // Prepare to fade in the next scene
    fadingIn = true; // Start fading in
  }
}

function fadeInWhite() {
  // Increment the fadeValue to decrease opacity
  fadeValue += 5; // Adjust this value for slower/faster fade
  fill(255, 255, 255, 255 - fadeValue); // White color with decreasing opacity
  rect(0, 0, width, height); // Draw a white rectangle over the whole canvas

  // Once the fade-in is complete (i.e., fully transparent), stop fading
  if (fadeValue >= 255) {
    fadingIn = false; // Stop fading in
    fadeValue = 0; // Reset fade for future use
    // Additional logic if needed after fade-in
  }
}
function mainScreen(){

  const amplitude = height * amplitudeFactor;
  const verticalLetterSpacing = height * verticalLetterSpacingFactor;

  if (showText) {
    
    fill(100, 149, 237);
    textSize(height * 0.1); // Text size based on canvas height
    textFont(myFont);
    for (let i = 0; i < message.length; i++) {
      const letterX = messageX + textWidth(message.substring(0, i));
      const letterOffset = i * verticalLetterSpacing;
      const letterY = height * 0.4 + sin((frameCount - letterOffset) * ySpeed) * amplitude;
      text(message[i], letterX, letterY);
    }


    messageX -= xSpeed;
    if (messageX < -textWidth(message)) {
      messageX = width + 20;
    }


    textSize(height * 0.05); // Text size based on canvas height
    fill(0);
    text("Are you ready to adopt the future?",windowWidth /3, windowHeight * 0.58);
    textSize(height * 0.0375); // Text size based on canvas height
    textFont('Comic Sans');
    fill(100);
    text("Ziggy is a nice robot girl waiting for a guardian.", windowWidth /2.85, height * 0.625);

    
}

image(infoButton, windowWidth * .9, windowHeight * .1, 50, 50);
    if (informing){
      imageMode(CORNER);
      image(hCR, 0, 0, windowWidth, windowHeight);
  }
}

function sceneOne() {
  showText = false;
  showImage = true;
  button.hide();
  input.hide();
}


function mouseHover1() {
  if (mouseX > width * 0.75 - 100 &&
     mouseX < width * 0.75 + 100 &&
     mouseY > height * 0.66 - 50 &&
     mouseY < height * 0.66 + 50)
    { over = true;
    } else {
      over = false;
   
  }
   
}

function mouseHover2() {
  if (mouseX > width * 0.65 - 100 &&
     mouseX < width * 0.65 + 100 &&
     mouseY > height * 0.76 - 50 &&
     mouseY < height * 0.76 + 50)
    { over = true;
    } else {
      over = false;
   
  }
   
}

function mouseHover3() {
  if (mouseX > width * 0.5 - 100 &&
     mouseX < width * 0.5 + 100 &&
     mouseY > height * 0.7 - 50 &&
     mouseY < height * 0.7 + 50)
    { over = true;
    } else {
      over = false;
   
  }
   
}


function sceneTwo() {
 
  imageMode(CORNER);
  image(backgroundBabyImg,50,50, width-50, height-50);




  if (isEating){
    imageMode(CENTER);
    image(babyEatImg, windowWidth * 0.75, windowHeight * 0.66, 1060, 1260);
  } else if (isLearning){
    imageMode(CENTER);
    image(babyLearning, width * 0.65, height * 0.56, 900, 750);
  } else if (isSleeping){
    imageMode(CORNER);
    image(backgroundBabyNightImg,50,50, width-50, height-50);
    imageMode(CENTER);
    image(babyNight, width * 0.65, height * 0.56, 900,750);
  }else {
    imageMode(CENTER);
  image(babyIdle, width * 0.65, height * 0.56, 900,750);
  mouseHover1();
  if (over) {
    image(babyHover, width * 0.65, height * 0.56, 900,750);
  }

  }
 
  



  image(eatButton, windowWidth /14 , windowHeight * .225, 150, 150);
  image (learnButton, windowWidth /14 , windowHeight * .425, 150, 150);
  image (sleepButton, windowWidth /14 , windowHeight * .625, 150, 150);
  image (ageButton, windowWidth /14 , windowHeight * .825, 150, 150);


}




function sceneThree() {
  imageMode(CORNER);
  image (teenBackgroundImg,50,50, width-50, height-50);


  imageMode(CENTER);
  image(eatButton, windowWidth /14 , windowHeight * .225, 150, 150);
  image (learnButton, windowWidth /14 , windowHeight * .425, 150, 150);
  image (sleepButton, windowWidth /14 , windowHeight * .625, 150, 150);
  image (ageButton, windowWidth /14 , windowHeight * .825, 150, 150);


  if (isEating){
    image(teenEatImg, windowWidth * 0.65, windowHeight * 0.56, 800, 750);
  } else if (isLearning){
    image(teenLearning, width * 0.65, height * 0.56, 800, 750);
  } else if (isSleeping){
    imageMode(CORNER);
    image(teenBackgroundNightImg,50,50, width-50, height-50);
    imageMode(CENTER);
    image(teenNight, width * 0.65, height * 0.56, 800,750);
  } else {
    imageMode(CENTER);
    image(teenIdle, width * 0.65, height * 0.56, 800,750);
    
  mouseHover2();
  if (over) {
    image(teenHover, width * 0.65, height * 0.56, 800,750);
  }
  }




}


function sceneFour() {
  imageMode(CORNER);
  image (adultBackgroundImg,50,50, width-50, height-50);


  if(isEating){
    imageMode(CENTER);
    image(adultEatImg, windowWidth * 0.5, windowHeight * 0.6, 800, 750);
  } else if (isLearning){
    imageMode(CENTER);
    image(adultLearning, width * 0.5, height * 0.6, 800, 750);
  } else if (isSleeping){
    imageMode(CORNER);
    image(adultBackgroundNightImg,50,50, width-50, height-50);
    imageMode(CENTER);
    image(adultNight, width * 0.5, height * 0.6, 800,750);
  } else {
    imageMode(CENTER);
    image(adultIdle, width * 0.5, height * 0.6, 800,750);
  mouseHover3();
  if (over) {
    image(adultHover, width * 0.5, height * 0.6, 800,750);
  }
  }




  imageMode(CENTER);
  image(eatButton, windowWidth /14 , windowHeight * .225, 150, 150);
  image (learnButton, windowWidth /14 , windowHeight * .425, 150, 150);
  image (sleepButton, windowWidth /14 , windowHeight * .625, 150, 150);
  image (ageButton, windowWidth /14 , windowHeight * .825, 150, 150);
}

function sceneGraduation(){
  
  imageMode(CORNER);
  image(graduating, 0, 0, windowWidth, windowHeight);
  imageMode (CENTER);
  image (redoButton, windowWidth * .9, windowHeight * .1, 50, 50);
}


function eatButtonPressed() {
  isEating = true;
  setTimeout(function(){ isEating = false; taskEatDone = true; checkAllTasks();}, 3000);
}




function learnButtonPressed() {
  isLearning = true;
  setTimeout(function(){ isLearning = false; 
    taskLearnDone = true; checkAllTasks(); }, 4000);
}




function sleepButtonPressed() {
  isSleeping = true;
  setTimeout(function(){ isSleeping = false;  taskSleepDone = true;
    checkAllTasks();}, 5000);
}

function transitionToNextScene() {
  // Logic for transitioning to the next scene
  if (isSceneFour) {
    isGraduating = true;
    isSceneFour = false;
    isSceneThree = false;
  } else if (isSceneThree) {
    isSceneFour = true;
    isSceneThree = false;
  } else {
    isSceneFour = false;
    isSceneThree = true;
  }

  // Reset tasks and age-up ability for the next stage
  taskEatDone = false;
  taskLearnDone = false;
  taskSleepDone = false;
  canAgeUp = false;
}

function ageButtonPressed() {
  if (canAgeUp) {
    fadingOut = true;
    nextScene = isSceneFour ? null : (isSceneThree ? 'sceneFour' : 'sceneThree');
  } 
}

function checkAllTasks() {
  if (taskEatDone && taskLearnDone && taskSleepDone) {
    canAgeUp = true; // Allow aging up
  }
}

function infoSession() {
  informing = true;
  button.hide();
  input.hide();
  setTimeout(function(){ informing = false; button.show(); input.show();}, 6000);
}

function mousePressed() {
  // Check if the mouse is within the button image boundaries
  if (
    mouseX > windowWidth /14 -75&&
    mouseX < windowWidth /14 + 75 &&
    mouseY > windowHeight * .225 -75&&
    mouseY < windowHeight * .225 + 75
  ) {
    eatButtonPressed();
  } else if (
    mouseX > windowWidth /14 -75&&
    mouseX < windowWidth /14 + 75 &&
    mouseY > windowHeight * .425 -75 &&
    mouseY < windowHeight * .425 + 75
  ) {
    learnButtonPressed();
  } else if (
    mouseX > windowWidth /14 -75 &&
    mouseX < windowWidth /14 + 75 &&
    mouseY > windowHeight * .625 -75 &&
    mouseY < windowHeight * .625 + 75
  ) {
    sleepButtonPressed();
  } else if (
    mouseX > windowWidth /14 -75 &&
    mouseX < windowWidth /14 + 75 &&
    mouseY > windowHeight * .825 -75 &&
    mouseY < windowHeight * .825 + 75 &&
    canAgeUp
  ) {
    ageButtonPressed();
  } else if (
    mouseX > windowWidth * .9 &&
    mouseX < windowWidth * .9 + 50 &&
    mouseY > windowHeight * .1 &&
    mouseY < windowHeight * .1 + 50
  ) {
    infoSession();
  } else if (
    mouseX > windowWidth * .9 -50 &&
    mouseX < windowWidth * .9 + 50 &&
    mouseY > windowHeight * 0.1 -50  &&
    mouseY < windowHeight * 0.1 + 50
  ) {
    returnToMainScreen();
  }
}


function returnToMainScreen() {
  // Reset the game state
  isGraduating = false;
  isSceneFour = false;
  isSceneThree = false;
  showText = true;
  showImage = false;
  imgSize = height * imgSizeFactor;
  scaleCounter = 0;
  scaleDirection = 1;
  imageLoaded = false;
  taskEatDone = false;
  taskLearnDone = false;
  taskSleepDone = false;
  canAgeUp = false;
  button.show();
  input.show();
}