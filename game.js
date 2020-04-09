if (window.matchMedia("(max-width: 800px)").matches) {
    $("#level-title").text("Tap Anywhere to Start")
}


var userClickedPattern = [];

var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var started = false;

var level = 0;

function playSound(color) {
    new Audio('sounds/' + color + '.mp3').play();
}


function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function nextSequence() {

    level += 1;

    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColors[randomNumber];

    gamePattern.push(randomChosenColour);

    $("." + randomChosenColour).fadeToggle(100).fadeToggle(100);

    playSound(randomChosenColour);

    //Beginner guide

    var touch = "Click "

    if (window.matchMedia("(max-width: 800px)").matches) {
        var touch = "Tap "
    }

    if (level === 1) {
        $("h3").html("Simon says:<br>" + touch + gamePattern[0] + " button!")
    }
    else if (level === 2) {
        $("h3").html("Now Simon says:<br>" + touch + gamePattern[0] + " button!<br> 2. Click " + gamePattern[1] + " button!")
    }
    else if (level === 3) {
        $("h3").text("You got this, champ!")
    }
    else {
        $("h3").text("")
    }
}

$(".btn").click(function () {

    if (started == true){

        var userChosenColor = $(this).attr("id");

        userClickedPattern.push(userChosenColor);

        playSound(userChosenColor);

        animatePress(userChosenColor);

        checkAnswer(userClickedPattern.length - 1);
    }
})

if (window.matchMedia("(max-width: 800px)").matches) {

    $(document).click(function () {
        if (started == false) {
            $("h1").text("Level " + level);
    
            setTimeout(nextSequence, 1000);
    
            started = true;
        }
    })
}
else {
$(document).keydown(function () {
    if (started == false) {
        $("h1").text("Level " + level);

        nextSequence();

        started = true;
    }
});
}


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);

            userClickedPattern = [];
        }
    }

    else {

        if (window.matchMedia("(max-width: 800px)").matches) {
            $("h1").text("Game Over, Tap to Restart");
        }
        else {
            $("h1").text("Game Over, Press F to Restart");
        }
        
        new Audio('sounds/wrong.mp3').play();

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 100)

        setTimeout(startOver, 500);
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}