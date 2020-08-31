
var buttonColor=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;



// starting the game

$(document).keypress(function(){

if(!started){
  $("h1").text("Level"+ level);
  started=true;
  nextSequence();

}
});

// when a user clicks a button
$(" .btn").click(function(){
  var userChosenColor= $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(cur){

    if(gamePattern[cur]===userClickedPattern[cur])
    {
        if(userClickedPattern.length===gamePattern.length){
        setTimeout(function(){
        nextSequence()
        ;},100);
      }
    }
    else{
      playSound("wrong");
      level=0;
      userClickedPattern=[];
      gamePattern=[];
      started=false;


      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);

      $("h1").text("Game Over!");
      setTimeout(function(){
          $("h1").text("Press any key to start again");
      },200);


    }
}

// generating a random number
function nextSequence(){
  userClickedPattern=[];
  randomNumber=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColor[randomNumber];

  gamePattern.push(randomChosenColor);

// animation
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

    level++;
  $("h1").text("Level "+ level);

}


// animation for when the user clicks a button
function animatePress(color){
  $("#"+color).addClass("pressed");
  setTimeout(function(){
    $("#"+color).removeClass("pressed");
  },100);
}


// playing sounds when a button is clicked or assigned
function playSound(name){
  var audio= new Audio("sounds/"+ name + ".mp3");
  audio.play();
}
