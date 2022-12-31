//Button Colors Array
buttonColors = ["red","blue","green","yellow"];

//Game Pattern Array
gamePattern = [];

//User Array that will check against the Game Pattern Array
userClickedPattern = [];


//Variable created to track whether the game started or not.
let started = false;

var level = 0; //Keeps track of the level and starts at 0



//GAME START

//Detecting Keyboard Press
$(document).keypress(function(){
    //Checks if the level is 0. If true call the nextSequence function. 
    if (!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
});

//Event Handler Function to grab user click input.
$("div.btn").click(function(){
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor);
    
    animatePress(userChosenColor);
    
    //Getting the last element of the array and passing it to checkAnswer
    // lastIndex = userClickedPattern.indexOf(userChosenColor);
    
    checkAnswer(userClickedPattern.length-1);
    
})

//Check Sequence Function
function checkAnswer(currentLevel){

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("Success");

        //If the user got the most recent answer correct, this will check if they finished the sequence
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("Failed");
        
        //This will play a sound if the user gets the sequence wrong
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        //Changing the title to "Game Over, Press Any Key to Restart" if the user gets it wrong
        $("#level-title").text("Game Over, Press Any Key to Restart");

        //Calling startOver to reset the game
        startOver();
    }
    
}
// SEQUENCES
//Next Sequence Function meant to generate a random number between 0-3, stores it into a random number variable, and plays the animation/sound
function nextSequence(){

    //Once nextSequence() is triggered, we reset the userClickedPattern to an empty array for the next level
    userClickedPattern = [];
    //Incrementing the level every time function is called and setting the header to the level
    level++;
    $("#level-title").html("Level "+level);

    var randomNum = Math.floor(Math.random() * 4); //generates a number between 0-3 but never 4
    let randomChosenColor = buttonColors[randomNum];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}


//RESTART GAME
//Start over function that will reset the values of level, gamePattern, and started variables
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}


//Play Sound function. This function will need to take name as input and pass it to the function to play sound
function playSound(name){
    var audio = new Audio("sounds/" + name +".mp3");
    audio.play();
}

//Creating function that will add animations to user clicks
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}