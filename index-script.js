const games = {
    "SmashKarts" : "https://games.crazygames.com/en_US/smash-karts/index.html?v=1.345",
    "SpaceWaves" : "https://games.crazygames.com/es_ES/space-waves/index.html?skipPrerollFirstSession=true&amp;v=1.345",
    "Stickman" : "https://games.crazygames.com/en_US/count-masters-stickman-games/index.html?v=1.345",
    "Pong" : "pongGame/index.html",
    "Snake" : "snakeGame/index.html",
    "Mine" : "minesweeperGame/index.html"
};


const btn1 = document.getElementById("game-space")
const btn2 = document.getElementById("game-smash")
const btn3 = document.getElementById("game-soccer")
const btn4 = document.getElementById("game-pong")
const btn5 = document.getElementById("game-snake")
const btn6 = document.getElementById("game-mine")
    
btn1.addEventListener("click", goSpaceGame)
btn2.addEventListener("click", goSmash)
btn3.addEventListener("click", goStickman)
btn4.addEventListener("click", goPong)
btn5.addEventListener("click", goSnake)
btn6.addEventListener("click", goMine)

function goSpaceGame() {
    btn1.href = `game-play.html?game=${games["SpaceWaves"]}&name=Space Waves`
}

function goSmash() {
    btn2.href = `game-play.html?game=${games["SmashKarts"]}&name=Smash Karts`
}

function goStickman() {
    btn3.href = `game-play.html?game=${games["Stickman"]}&name=Stickman`
}

function goPong() {
    btn4.href = `game-play.html?game=${games["Pong"]}&name=Pong`
}

function goSnake() {
    btn5.href = `game-play.html?game=${games["Snake"]}&name=Snake`
}

function goMine() {
    btn6.href = `game-play.html?game=${games["Mine"]}&name=Minesweeper`
}

