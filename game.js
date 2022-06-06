let gamePattern = []
let userChosenColor = []
let buttonColors = ["red", "blue", "green", "yellow"]
let startedGame = false
let level = 0
let gameIsOver = false

function playSound (name) {
    const audio = new Audio()
    audio.src =`./sounds/${name}.mp3`
    audio.play()
}

function nextSequence () {
    let randomNumber = Math.floor(Math.random() * 4)
    let randomChosenColor = buttonColors[randomNumber]
    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100)
    playSound(randomChosenColor)

    level++
    $("#level-title").html(`Level ${level}`)
    gamePattern.push(randomChosenColor)

}

$(".btn").on("click", function (event) {
    const buttonColor = event.target.id
    $(`#${buttonColor}`).fadeOut(100).fadeIn(100)
    playSound(buttonColor)
    userChosenColor.push(buttonColor)
    checkAnswer()
})

function checkAnswer () {
    if (gamePattern[userChosenColor.length - 1] !== userChosenColor[userChosenColor.length - 1]) {
        playSound("wrong")
        $("#level-title").html(`Game over! Press any key to restart.`)
        gameIsOver = true
    } else if (gamePattern.length === userChosenColor.length) {
        userChosenColor =[]
        setTimeout(function() {
            nextSequence()
        }, 1000)
    }
}


function restartGame () {
    level = 0
    gamePattern = []
    userChosenColor = []
    gameIsOver = false
}

// start game
$(window).keypress(function (e) { 
    if (!startedGame && e.key === 'a') {
        startedGame = true
        nextSequence()
    } 
    if (gameIsOver) {
        restartGame()
        nextSequence()
    }
});
