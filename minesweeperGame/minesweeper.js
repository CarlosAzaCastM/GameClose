// 1. Configuración del Juego
const GRID_SIZE = 10; // 10x10
const MINE_COUNT = 10; // 10 minas

const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');

let board = []; // El array 2D que representa nuestro tablero
let firstClick = true;
let gameOver = false;
let revealedTiles = 0;
const totalTiles = GRID_SIZE * GRID_SIZE;

// 2. Creación del Tablero
function createBoard() {
    // Configurar CSS para la cuadrícula
    boardElement.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 30px)`;
    boardElement.style.gridTemplateRows = `repeat(${GRID_SIZE}, 30px)`;

    for (let y = 0; y < GRID_SIZE; y++) {
        const row = [];
        for (let x = 0; x < GRID_SIZE; x++) {
            
            // Crear el elemento HTML (el <div> de la casilla)
            const tileElement = document.createElement('div');
            tileElement.classList.add('tile');
            tileElement.dataset.y = y;
            tileElement.dataset.x = x;

            // Añadir 'listeners' para clics
            tileElement.addEventListener('click', handleLeftClick);
            tileElement.addEventListener('contextmenu', handleRightClick);
            
            boardElement.appendChild(tileElement);

            // Crear el objeto de estado para esta casilla
            const tile = {
                x,
                y,
                element: tileElement,
                isMine: false,
                isRevealed: false,
                isFlagged: false,
                adjacentMines: 0
            };
            row.push(tile);
        }
        board.push(row);
    }
}

// 3. Lógica de Clics

function handleLeftClick(event) {
    if (gameOver) return;

    const tile = getTileFromEvent(event);
    if (!tile || tile.isRevealed || tile.isFlagged) return;

    // --- Lógica del Primer Clic ---
    // Si es el primer clic, plantamos las minas AHORA.
    // Esto asegura que el primer clic NUNCA sea una mina.
    if (firstClick) {
        plantMines(tile); // Plantar minas evitando esta casilla
        calculateAllAdjacentMines(); // Calcular todos los números
        firstClick = false;
    }
    
    // --- Lógica de Revelación ---
    revealTile(tile);

    // --- Comprobar Victoria/Derrota ---
    if (tile.isMine) {
        endGame(false); // Perdió
    } else {
        checkWinCondition();
    }
}

function handleRightClick(event) {
    event.preventDefault(); // Prevenir que aparezca el menú contextual
    if (gameOver) return;

    const tile = getTileFromEvent(event);
    if (!tile || tile.isRevealed) return;

    // Poner/Quitar bandera
    tile.isFlagged = !tile.isFlagged;
    tile.element.textContent = tile.isFlagged ? '🚩' : '';
}

function getTileFromEvent(event) {
    const x = parseInt(event.target.dataset.x);
    const y = parseInt(event.target.dataset.y);
    return board[y][x];
}

// 4. Lógica de Minas y Números

function plantMines(safeTile) {
    let minesPlaced = 0;
    while (minesPlaced < MINE_COUNT) {
        const x = Math.floor(Math.random() * GRID_SIZE);
        const y = Math.floor(Math.random() * GRID_SIZE);
        const tile = board[y][x];

        // Si la casilla no es ya una mina Y no es la casilla segura (el primer clic)
        if (!tile.isMine && (tile.x !== safeTile.x || tile.y !== safeTile.y)) {
            tile.isMine = true;
            minesPlaced++;
        }
    }
}

function calculateAllAdjacentMines() {
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            if (board[y][x].isMine) continue;
            
            const neighbors = getNeighbors(board[y][x]);
            const mineCount = neighbors.filter(n => n.isMine).length;
            board[y][x].adjacentMines = mineCount;
        }
    }
}

// 5. Lógica de Revelación (¡La parte divertida!)

function revealTile(tile) {
    // Casos base para la recursión:
    // 1. Ya está revelada
    // 2. Tiene bandera
    // 3. No existe (fuera del tablero)
    if (!tile || tile.isRevealed || tile.isFlagged) return;

    tile.isRevealed = true;
    tile.element.classList.add('revealed');
    revealedTiles++;

    if (tile.isMine) {
        tile.element.textContent = '💣';
        tile.element.classList.add('mine');
        return;
    }

    if (tile.adjacentMines > 0) {
        tile.element.textContent = tile.adjacentMines;
        tile.element.setAttribute('data-adjacent', tile.adjacentMines);
        return;
    }

    // --- RECURSIÓN (Flood Fill) ---
    // Si llegamos aquí, es una casilla '0' (sin minas adyacentes)
    // Debemos revelar a todos sus vecinos automáticamente.
    const neighbors = getNeighbors(tile);
    neighbors.forEach(neighbor => {
        revealTile(neighbor); // Llamada recursiva
    });
}

// 6. Funciones de Ayuda (Vecinos)

function getNeighbors(tile) {
    const neighbors = [];
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
        for (let xOffset = -1; xOffset <= 1; xOffset++) {
            if (yOffset === 0 && xOffset === 0) continue; // Es la misma casilla

            const neighborY = tile.y + yOffset;
            const neighborX = tile.x + xOffset;

            // Comprobar si está dentro del tablero
            if (isValidCoordinate(neighborX, neighborY)) {
                neighbors.push(board[neighborY][neighborX]);
            }
        }
    }
    return neighbors;
}

function isValidCoordinate(x, y) {
    return x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE;
}

// 7. Fin del Juego y Victoria

function checkWinCondition() {
    // Ganas si (total de casillas - total de minas) == casillas reveladas
    if (totalTiles - MINE_COUNT === revealedTiles) {
        endGame(true); // Ganó
    }
}

function endGame(didWin) {
    gameOver = true;
    
    if (didWin) {
        statusElement.textContent = '¡Felicidades, ganaste! 🥳';
    } else {
        statusElement.textContent = '¡BOOM! Perdiste. 💣';
        // Revelar todas las minas
        board.forEach(row => {
            row.forEach(tile => {
                if (tile.isMine) {
                    revealTile(tile); // Usamos revealTile para que muestre la '💣'
                }
            });
        });
    }
}

// --- Iniciar el juego ---
createBoard();