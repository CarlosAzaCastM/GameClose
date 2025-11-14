const games = {
    "SmashKarts" : "https://games.crazygames.com/en_US/smash-karts/index.html?v=1.345",
    "SpaceWaves" : "https://games.crazygames.com/es_ES/space-waves/index.html?skipPrerollFirstSession=true&amp;v=1.345",
    "Stickman" : "https://games.crazygames.com/en_US/count-masters-stickman-games/index.html?v=1.345"
};


const btn1 = document.getElementById("game-space")
const btn2 = document.getElementById("game-smash")
const btn3 = document.getElementById("game-soccer")
    
btn1.addEventListener("click", goSpaceGame)
btn2.addEventListener("click", goSmash)
btn3.addEventListener("click", goStickman)

function goSpaceGame() {
    btn1.href = `game-play.html?game=${games["SpaceWaves"]}&name=Space Waves`
}

function goSmash() {
    btn2.href = `game-play.html?game=${games["SmashKarts"]}&name=Smash Karts`
}

function goStickman() {
    btn3.href = `game-play.html?game=${games["Stickman"]}&name=Stickman`
}

