const buttonColors = ["red", "blue", "yellow", "green"];
//array to store the patterns created by game
let gamePattern = [];
//array to store the click patterns made by user
let userPattern = [];

//maximum level scored
let maxScore = 0;

//level 0 indicates game has not started yet
let level = 0;

$(document).keypress(function() {
  //use keypress only to start a new game
  if(level == 0) {
    setTimeout(nextSequence, 500);
  }
});

$(".btn").click(function() {
  //accept clicks only when the game has started
  if(level!=0) {
    
    let userChoosenColor = $(this).attr("id");
    userPattern.push(userChoosenColor);

    playSound(userChoosenColor);
    animatePress(userChoosenColor);

    //checks whether the click followed the gamePattern
    checkAnswer(userPattern.length-1);
  }
});  

function checkAnswer(index) {
  if(userPattern[index] === gamePattern[index]) {
    if(index+1 == gamePattern.length) {
      maxScore = Math.max(maxScore,level);
      setTimeout(nextSequence,500);
    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text(`Wrong! Press any key to restart the game. Max Level Score is ${maxScore}`);
    setTimeout(()=> {$("body").removeClass("game-over");},200);

    gamePattern = [];
    userPattern = [];
    level = 0;
  }
}

//this function will be called whenever a new level starts
function nextSequence() {
  //in every new level, the previous user patterns will be removed
  userPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random()*4);
  let randomChoosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChoosenColor);

  $("#"+randomChoosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChoosenColor);
}

function playSound(randomColor) {
  let address = "sounds/"+randomColor+".mp3";
  let audio = new Audio(address);
  audio.play();
}

function animatePress(userChoosenColor) {
  $("#"+userChoosenColor).addClass("pressed");
  setTimeout(()=> {
    $("#"+userChoosenColor).removeClass("pressed");
  },100);
}
