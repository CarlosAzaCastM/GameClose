// 1. Configuración Inicial
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// El juego de Snake se basa en una cuadrícula (grid)
// 'gridSize' define el tamaño de cada "cuadrado" en el lienzo
const gridSize = 20; 
// 'tileCount' es cuántos cuadrados caben en el lienzo (400px / 20px = 20)
const tileCount = canvas.width / gridSize;

// 2. Estado del Juego

// La serpiente es un array de "segmentos" (coordenadas {x, y})
// Empezamos con la cabeza en el centro
let snake = [
    { x: 10, y: 10 }
];

// Dirección de movimiento (inicialmente quieta)
// dx = 0 (no se mueve en X), dy = 0 (no se mueve en Y)
let direction = { dx: 0, dy: 0 };

// Posición de la comida (se generará aleatoriamente)
let food = { x: 15, y: 15 };

// Puntuación
let score = 0;

// Variable para controlar el fin del juego
let isGameOver = false;

// Velocidad del juego (cuántas veces se actualiza por segundo)
const gameSpeed = 10; // 10 "frames" por segundo

// 3. Manejo de Input (Teclado)
document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    const key = event.key; // "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"

    // Evitar que la serpiente se mueva en la dirección opuesta
    // Si se mueve hacia la derecha (dx=1), no puede ir a la izquierda (dx=-1)
    
    if (key === 'ArrowUp' && direction.dy === 0) {
        direction = { dx: 0, dy: -1 }; // Arriba
    } else if (key === 'ArrowDown' && direction.dy === 0) {
        direction = { dx: 0, dy: 1 }; // Abajo
    } else if (key === 'ArrowLeft' && direction.dx === 0) {
        direction = { dx: -1, dy: 0 }; // Izquierda
    } else if (key === 'ArrowRight' && direction.dx === 0) {
        direction = { dx: 1, dy: 0 }; // Derecha
    }
}

// 4. Funciones de Dibujo

// Dibuja un cuadrado en la cuadrícula
function drawRect(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * gridSize, y * gridSize, gridSize - 2, gridSize - 2); // -2 para dejar un borde
}

// Dibuja toda la serpiente
function drawSnake() {
    // Dibuja el cuerpo
    snake.forEach((segment, index) => {
        // La cabeza es de un color diferente
        const color = (index === 0) ? '#04b636ff' : '#067233ff'; 
        drawRect(segment.x, segment.y, color);
    });
}

// Dibuja la comida
function drawFood() {
    drawRect(food.x, food.y, '#e74c3c'); // Color rojo
}

// Dibuja la puntuación
function drawScore() {
    ctx.fillStyle = '#ecf0f1'; // Color blanco
    ctx.font = '20px "Consolas", monospace';
    ctx.fillText(`Puntos: ${score}`, 10, 25);
}

// Dibuja la pantalla de Game Over
function drawGameOver() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; // Fondo oscuro semitransparente
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#e74c3c';
    ctx.font = '40px "Consolas", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('¡GAME OVER!', canvas.width / 2, canvas.height / 2 - 20);
    
    ctx.fillStyle = '#ecf0f1';
    ctx.font = '20px "Consolas", monospace';
    ctx.fillText(`Puntuación final: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
    
    ctx.font = '16px "Consolas", monospace';
    ctx.fillText('(Refresca para reiniciar)', canvas.width / 2, canvas.height / 2 + 50);
}

// 5. Lógica del Juego

// Coloca la comida en una nueva posición aleatoria
function placeFood() {
    let newFoodPosition;
    let onSnake = true;

    // Bucle para asegurar que la comida no aparezca SOBRE la serpiente
    while (onSnake) {
        newFoodPosition = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
        // 'some' revisa si ALGÚN segmento de la serpiente cumple la condición
        onSnake = snake.some(segment => 
            segment.x === newFoodPosition.x && segment.y === newFoodPosition.y
        );
    }
    food = newFoodPosition;
}

// Actualiza el estado del juego en cada "frame"
function update() {
    if (isGameOver) return; // Si el juego terminó, no hagas nada

    if (direction.dx === 0 && direction.dy === 0) return;

    // 1. Calcular la nueva posición de la cabeza
    const head = { 
        x: snake[0].x + direction.dx, 
        y: snake[0].y + direction.dy 
    };

    // 2. Revisar colisiones (Paredes)
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        isGameOver = true;
        return;
    }

    // 3. Revisar colisiones (Consigo misma)
    // Empezamos en 1 para no checar la cabeza contra sí misma
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            isGameOver = true;
            return;
        }
    }

    // 4. Añadir la nueva cabeza al inicio de la serpiente
    snake.unshift(head);

    // 5. Revisar si comió la comida
    if (head.x === food.x && head.y === food.y) {
        score++; // Aumentar puntuación
        placeFood(); // Poner nueva comida
        // No quitamos la cola (snake.pop()), así que la serpiente crece
    } else {
        // Si no comió, quitamos el último segmento de la cola
        // Esto hace que la serpiente "se mueva"
        if (direction.dx !== 0 || direction.dy !== 0) { // Solo quita la cola si se está moviendo
             snake.pop();
        }
    }
}

// 6. Bucle Principal del Juego (Game Loop)

function gameLoop() {
    // 1. Actualiza la lógica (mover, comer, colisionar)
    update();

    // 2. Limpia el lienzo
    ctx.fillStyle = '#000'; // Fondo negro
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 3. Dibuja los elementos
    drawFood();
    drawSnake();
    drawScore();

    // 4. Si es Game Over, dibuja la pantalla de fin y detén el bucle
    if (isGameOver) {
        drawGameOver();
        return; // Detiene el bucle
    }

    // 5. Vuelve a llamar a gameLoop después de un tiempo (controla la velocidad)
    setTimeout(gameLoop, 1000 / gameSpeed);
}


// 7. Iniciar el Juego
placeFood(); // Coloca la primera comida
gameLoop(); // Inicia el bucle del juego