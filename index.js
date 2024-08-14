let scoreElement = document.getElementById('score');
let map = document.querySelector('.map');

let foodX = 0, foodY = 0;
let directionX = 0, directionY = 0;
let positionX = 12, positionY = 12;
let snakeBody = [[12, 12]];
let runningScore = 0;
let gameInterval;

const updateFoodPosition = () => {
    foodX = Math.floor(Math.random() * 50) + 1;
    foodY = Math.floor(Math.random() * 40) + 1;
}

const drawFood = () => {
    const foodDiv = document.createElement('div');
    foodDiv.classList.add('foodDiv');
    foodDiv.style.gridColumn = foodX;
    foodDiv.style.gridRow = foodY;
    map.appendChild(foodDiv);
}

const drawSnake = () => {
    snakeBody.forEach(segment => {
        const snakeSegment = document.createElement("div");
        snakeSegment.classList.add("snake");
        snakeSegment.style.gridColumn = segment[0];
        snakeSegment.style.gridRow = segment[1];
        map.appendChild(snakeSegment);
    });
}

const move = () => {
    document.addEventListener('keydown', e => {
        if(e.key === 'w' && directionY === 0){
            directionX = 0;
            directionY = -1;
        } else if(e.key === 'a' && directionX === 0){
            directionX = -1;
            directionY = 0;
        } else if(e.key === 's' && directionY === 0){
            directionX = 0;
            directionY = 1;
        } else if(e.key === 'd' && directionX === 0){
            directionX = 1;
            directionY = 0;
        }
    });
}

const handleGameOver = () => {
    clearInterval(gameInterval);
    alert("Game over");
    location.reload();
}

const init = () => {
    move();

    // Update head position
    positionX += directionX;
    positionY += directionY;

    // Check if snake head's position is outside the wall
    if (positionX > 50 || positionX < 1 || positionY > 40 || positionY < 1) {
        handleGameOver();
    }

    // Check if snake head's position is equal to food position
    if (positionX == foodX && positionY == foodY) {
        updateFoodPosition();
        runningScore++;
        scoreElement.textContent = runningScore;
        snakeBody.push([foodX, foodY]);
    }

    // Check if the snake's head position is equal to any body segment
    for (let i = 1; i < snakeBody.length; i++) {
        if (positionX == snakeBody[i][0] && positionY == snakeBody[i][1]) {
            handleGameOver();
        }
    }

    // Update the snake body
    snakeBody.unshift([positionX, positionY]);  
    snakeBody.pop();

    map.innerHTML = "";
    drawSnake();
    drawFood();
}

updateFoodPosition();
drawFood();
console.log(foodX + " " + foodY);
gameInterval = setInterval(init, 100);
