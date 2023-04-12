var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var started = false;
var level=0;

$(document).keydown(function(){
    if(!started){
        $("h1").text("Level "+level);
        nextSequence();
        started=true;
    }
    
});



$(".btn").click(function(){
    var userChosenColour = $(this).attr("id"); //Didn't get in first time.

    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);

    playAudio(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
   if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    // console.log("Success");
    if(currentLevel === (level-1)){
        setTimeout(function(){
            nextSequence();
        },1000);
    }
   }
   else{
    playAudio("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
   }
}


function nextSequence(){
    userClickedPattern=[];
    level++;

    $("h1").text("Level "+level);

    var randomNumber = Math.floor(Math.random()*4);
    
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

    playAudio(randomChosenColour);
    animatePress(randomChosenColour);
}

function playAudio(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}




