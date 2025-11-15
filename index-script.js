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

// Variable para guardar la última posición de scroll
let lastScrollTop = 0;

// Selecciona tu barra de navegación
const navbar = document.querySelector('.nav-menu');

// Agrega un "escuchador" al evento de scroll de la ventana
window.addEventListener('scroll', function() {
    
    // Obtiene la posición actual del scroll
    // (usamos ambos por compatibilidad entre navegadores)
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // --- El usuario está haciendo scroll hacia ABAJO ---
        
        // Añade la clase para ocultar el nav
        navbar.classList.add('nav-menu-hidden');

    } else {
        // --- El usuario está haciendo scroll hacia ARRIBA ---
        
        // Quita la clase para mostrar el nav
        navbar.classList.remove('nav-menu-hidden');
    }
    
    // Actualiza la última posición de scroll para la próxima vez
    // (con un 'if' para evitar que se ponga en negativo en Mac)
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
});

const btnIframe = document.querySelector('#btn-iframe-category');
const btnUnity = document.querySelector('#btn-unity-category');
const btnJs = document.querySelector('#btn-javascript-category');
const btnTitleMenu = document.querySelector('.title-menu')

const allGames = document.querySelectorAll('.btn-game');

const confettiGif = document.querySelector('.confetti-gif');

const secretGame = document.querySelector('.secret-game')

let clickCounter = 0;
let clickTimer = null;
const tripleClickDelay = 500;

function filterGames(categoryGame) {
    allGames.forEach(game => {
        if(game.classList.contains(categoryGame)){
            game.classList.remove('game-hidden');
        }
        else
        {
            game.classList.add('game-hidden');
        }
    });
}

btnIframe.addEventListener('click', () => {
    filterGames('iframe-game');
});

btnUnity.addEventListener('click', () => {
    filterGames('unity-game');
});

btnJs.addEventListener('click', () => {
    filterGames('javascript-game');
});

btnTitleMenu.addEventListener('click', () => {
    filterGames('btn-game');
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
    confettiGif.classList.remove('confetti-gif-hidden');
    secretGame.classList.remove('secret-game');
    setTimeout(()=>{
        confettiGif.classList.add('confetti-gif-hidden');
    },4000);
}
