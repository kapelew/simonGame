var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var keyPressed = false;
var level = 0;

function turnOnClick(){
    $(".btn").click(function(event){
        if (keyPressed ){
            var userChosenColor = event.target.id;
            userClickedPattern.push(userChosenColor);
        
            animatePress(userChosenColor);
            playSound(userChosenColor);
            checkAnswer(userClickedPattern.length -1);
        }
    })
}

function turnOffClick(){
    $(".btn").off("click");
}



$(document).keyup(function(event){
    if (!keyPressed){
        $("h1").text("Level " + level);
        newSequence();
        keyPressed = true;
        console.log(keyPressed);
    }

})

function newSequence(){
    turnOffClick();
    userClickedPattern = [];
    level++;
    var randomNumber = Math.floor(Math.random() *4);
    var randomChosenColor = buttonColours[randomNumber];
    $("h1").text("Level " + level)    

    gamePattern.push(randomChosenColor);

    flashSequence(0);
}

function flashSequence(index) {
    if (index < gamePattern.length) {
        playSound(gamePattern[index]);
        var color = gamePattern[index];
        setTimeout(function () {
            $("#" + color).fadeOut().fadeIn(function () {
                flashSequence(index + 1); 
            });
        }, 300);
    }else{
        turnOnClick();
    }
}


function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            $("body").addClass("win");
            $("h1").html("Congratulations! <br> Prepare for next level...");
            setTimeout(function(){
                $("body").removeClass("win");
                newSequence();
            }, 1500);
        }
    }else{
        console.log("wrong");
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    keyPressed = false;
}

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");  
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");  
    }, 100);
}