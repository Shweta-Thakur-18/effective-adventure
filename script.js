const leftPaddle = document.getElementById("leftPaddle");
const rightPaddle = document.getElementById("rightPaddle");
const ball = document.getElementById("ball");

const gameContainer = document.querySelector(".game-container");

let ballX = 300;
let ballY = 150;
let ballSpeedX = 5;
let ballSpeedY = 2;

let leftPaddleY = 100;
let rightPaddleY = 100;
const paddleSpeed = 5;

function updateGameArea() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom walls
    if (ballY <= 0 || ballY >= gameContainer.clientHeight - ball.clientHeight) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (ballX <= leftPaddle.clientWidth && ballY >= leftPaddleY && ballY <= leftPaddleY + leftPaddle.clientHeight) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX >= gameContainer.clientWidth - ball.clientWidth - rightPaddle.clientWidth && ballY >= rightPaddleY && ballY <= rightPaddleY + rightPaddle.clientHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Ball out of bounds (score)
    if (ballX <= 0) {
        // Right player scores
        resetBall();
    } else if (ballX >= gameContainer.clientWidth - ball.clientWidth) {
        // Left player scores
        resetBall();
    }

    // Move paddles
    if (leftPaddleY >= 0 && leftPaddleY <= gameContainer.clientHeight - leftPaddle.clientHeight) {
        leftPaddleY += 0; // Stop the paddle
    }

    if (rightPaddleY >= 0 && rightPaddleY <= gameContainer.clientHeight - rightPaddle.clientHeight) {
        rightPaddleY += 0; // Stop the paddle
    }

    // Update paddle positions
    leftPaddle.style.top = leftPaddleY + "px";
    rightPaddle.style.top = rightPaddleY + "px";

    // Update ball position
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
}

function resetBall() {
    ballX = gameContainer.clientWidth / 2;
    ballY = gameContainer.clientHeight / 2;
    ballSpeedX = -ballSpeedX;
}

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            rightPaddleY -= paddleSpeed;
            break;
        case "ArrowDown":
            rightPaddleY += paddleSpeed;
            break;
        case "w":
            leftPaddleY -= paddleSpeed;
            break;
        case "s":
            leftPaddleY += paddleSpeed;
            break;
    }
});

setInterval(updateGameArea, 20); // Update the game every 20 milliseconds
