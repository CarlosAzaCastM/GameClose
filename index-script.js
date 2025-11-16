const games = {
    "SmashKarts" : "https://games.crazygames.com/en_US/smash-karts/index.html?v=1.345",
    "SpaceWaves" : "https://games.crazygames.com/es_ES/space-waves/index.html?skipPrerollFirstSession=true&v=1.345",
    "Stickman" : "https://games.crazygames.com/en_US/count-masters-stickman-games/index.html?v=1.345",
    "Pong" : "pongGame/index.html",
    "Snake" : "snakeGame/index.html",
    "Mine" : "minesweeperGame/index.html"
};


const btn1 = document.getElementById("game-space")
const btn2 = document.getElementById("game-smash")
const btn3 = document.getElementById("game-stick")
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

let lastScrollTop = 0;

const navbar = document.querySelector('.nav');

window.addEventListener('scroll', function() {

    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {

        navbar.classList.add('nav--hidden');

    } else {
        navbar.classList.remove('nav--hidden');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
});

const btnIframe = document.querySelector('#btn-iframe-category');
const btnUnity = document.querySelector('#btn-unity-category');
const btnJs = document.querySelector('#btn-javascript-category');
const btnTitleMenu = document.querySelector('.header-title') 

const allGames = document.querySelectorAll('.game-card'); 

const confettiGif = document.querySelector('.confetti'); 

const secretGame = document.querySelector('.game-card--secret') 

let clickCounter = 0;
let clickTimer = null;
const tripleClickDelay = 500;

function filterGames(category) { 
    allGames.forEach(game => {
        if(game.classList.contains(category)){
            game.classList.remove('game-card--hidden'); 
        }
        else
        {
            game.classList.add('game-card--hidden'); 
        }
    });
}

btnIframe.addEventListener('click', () => {
    filterGames('game-card--iframe'); 
});

btnUnity.addEventListener('click', () => {
    filterGames('game-card--unity'); 
});

btnJs.addEventListener('click', () => {
    filterGames('game-card--javascript'); 
});

btnTitleMenu.addEventListener('click', () => {
    filterGames('game-card'); 
    clickCounter++;

    clearTimeout(clickTimer);

    if(clickCounter === 3)
    {
        miAccionSecreta();
        clickCounter = 0;
    }
    else
    {
        clickTimer = setTimeout(()=>{
            clickCounter = 0;
        },tripleClickDelay);
    }
});

function miAccionSecreta() {
    confettiGif.classList.remove('confetti--hidden'); 
    secretGame.classList.remove('game-card--secret'); 
    setTimeout(()=>{
        confettiGif.classList.add('confetti--hidden'); 
    },4000);
}