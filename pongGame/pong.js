// 1. Configuración Inicial
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// 2. Definición de Objetos del Juego

// Paleta del Jugador
const player = {
    x: 10, // Posición x (lado izquierdo)
    y: canvas.height / 2 - 50, // Centrado verticalmente
    width: 15,
    height: 100,
    color: '#FFF',
    score: 0
};

// Paleta de la IA (Computadora)
const com = {
    x: canvas.width - 25, // Posición x (lado derecho)
    y: canvas.height / 2 - 50, // Centrado verticalmente
    width: 15,
    height: 100,
    color: '#FFF',
    score: 0
};

// La Pelota
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 7, // Velocidad base
    speedX: 5, // Velocidad en eje X
    speedY: 5, // Velocidad en eje Y
    color: '#FFF'
};

// La Red (visual)
const net = {
    x: canvas.width / 2 - 1,
    y: 0,
    width: 2,
    height: 10,
    color: '#FFF'
};

// 3. Funciones de Dibujo

// Dibuja un rectángulo (para paletas y red)
function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

// Dibuja un círculo (para la pelota)
function drawCircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false); // Círculo completo
    ctx.closePath();
    ctx.fill();
}

// Dibuja el texto (puntuación)
function drawText(text, x, y, color) {
    ctx.fillStyle = color;
    ctx.font = '45px sans-serif';
    ctx.fillText(text, x, y);
}

// Dibuja la red
function drawNet() {
    for (let i = 0; i <= canvas.height; i += 15) {
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

// 4. Lógica de Movimiento y Colisión

// Función para reiniciar la pelota (después de un punto)
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speed = 7; // Resetea velocidad
    ball.speedX = -ball.speedX; // Invierte la dirección
    ball.speedY = 5; // Resetea ángulo
}

// Detección de colisión (pelota vs paleta)
function collision(b, p) {
    // b = ball (pelota), p = player/com (paleta)
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    // Retorna true si hay colisión, false si no
    return b.right > p.left && b.left < p.right && b.bottom > p.top && b.top < p.bottom;
}

// Mover la paleta del jugador con el mouse
canvas.addEventListener('mousemove', movePaddle);

function movePaddle(evt) {
    let rect = canvas.getBoundingClientRect();
    player.y = evt.clientY - rect.top - player.height / 2;
}

// 5. Función de Actualización (Update) - La lógica principal
function update() {
    
    // Movimiento de la pelota
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // IA simple: La paleta 'com' sigue la pelota
    // (0.1 es la 'dificultad', un valor más alto la hace más rápida/difícil)
    let aiLevel = 0.1; 
    com.y += (ball.y - (com.y + com.height / 2)) * aiLevel;

    // Colisión con paredes (superior e inferior)
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.speedY = -ball.speedY; // Invierte dirección Y
    }

    // Determinar qué paleta golpeó (jugador o IA)
    let paddle = (ball.x < canvas.width / 2) ? player : com;

    // Colisión con paletas
    if (collision(ball, paddle)) {
        // Invertir la dirección X
        ball.speedX = -ball.speedX;

        // Calcular dónde golpeó la pelota en la paleta (-1 a 1)
        // -1 = arriba, 0 = centro, 1 = abajo
        let collidePoint = (ball.y - (paddle.y + paddle.height / 2));
        collidePoint = collidePoint / (paddle.height / 2);

        // Calcular el ángulo de rebote (en radianes)
        // Máximo 45 grados (Math.PI / 4)
        let angleRad = (Math.PI / 4) * collidePoint;

        // Cambiar la velocidad Y basado en el ángulo
        // (Si golpea en el lado del jugador, dirección es 1, si es IA es -1)
        let direction = (ball.x < canvas.width / 2) ? 1 : -1;
        ball.speedY = ball.speed * Math.sin(angleRad);
        
        // Aumentar la velocidad de la pelota cada vez que golpea
        ball.speed += 0.5;
    }

    // Puntuación
    if (ball.x - ball.radius < 0) {
        // Punto para la IA
        com.score++;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        // Punto para el Jugador
        player.score++;
        resetBall();
    }
}

// 6. Función de Renderizado (Dibujo)
function render() {
    
    // Limpiar el canvas (dibujando un rectángulo negro)
    drawRect(0, 0, canvas.width, canvas.height, '#000');
    
    // Dibujar puntuación del jugador
    drawText(player.score, canvas.width / 4, canvas.height / 5, '#FFF');
    
    // Dibujar puntuación de la IA
    drawText(com.score, (3 * canvas.width) / 4, canvas.height / 5, '#FFF');
    
    // Dibujar la red
    drawNet();
    
    // Dibujar paleta del jugador
    drawRect(player.x, player.y, player.width, player.height, player.color);
    
    // Dibujar paleta de la IA
    drawRect(com.x, com.y, com.width, com.height, com.color);
    
    // Dibujar la pelota
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

// 7. El Game Loop (Bucle del juego)

function gameLoop() {
    update(); // Actualiza la lógica
    render(); // Dibuja todo en pantalla
}

// Iniciar el bucle del juego (approx 60 cuadros por segundo)
const framePerSecond = 60;
setInterval(gameLoop, 1000 / framePerSecond);