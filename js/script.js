/**
* Получение элемента канваса по айди
*/
const canvas = document.getElementById("game");

/**
* Получение контекста рисования на холсте
*/
const ctx = canvas.getContext("2d");

/**
* Создаем объект картинки и загружаем фон для игрового поля
*/
const playingArea = new Image();
playingArea.src = "img/area.png";

/**
* Создаем объект картинки и загружаем картинку еды
*/
const foodImage = new Image();
foodImage.src = "img/food.png";

/**
* Изображение головы змейки
*/
const headImg = new Image();
headImg.src = "img/head.png";

/**
* Одно звено тела змейки
*/
const bodyImg = new Image();
bodyImg.src = "img/body.png";

/**
* Изображение для змейки состоящей из одного элемента массива
*/
const snakeImg = new Image();
snakeImg.src = "img/snake.png";

// Скорость игры в милисекундах
let speed = 600;

// Размер одной клетки игрового поля
let box = 32;

/**
* Рандомная позиция еды в рамках игрового поля
*/
let food = {
  x: Math.floor((Math.random() * 17 + 1)) * box,
  y: Math.floor((Math.random() * 15 + 3)) * box,
};

/**
* Змейка состоящая из координат каждого звена туловища
*/
let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box
};

/**
* Переменная содержащее в себе текущее направление движения змейки
*/
let dir;

/**
* Подписка на событие нажатия клавиши клавиатуры, вызывается функция direction
*/
document.addEventListener("keydown", direction);

/**
* Функция устанавливающая текущее направление взависимости от нажатой клавиши
*/
function direction(event) {
	if (event.keyCode == 37 && dir != "right") dir = "left";
	else if (event.keyCode == 38 && dir != "down") dir = "up";
	else if (event.keyCode == 39 && dir != "left") dir = "right";
	else if (event.keyCode == 40 && dir != "up") dir = "down";
}


/**
* Функция для отрисовки игры
*/
function drawGame() {
	// Отрисовка фона игрового поля
	ctx.drawImage(playingArea, 0, 0);
	
	// Отрисовка еды
	ctx.drawImage(foodImage, food.x, food.y);
	
	// Отрисовка змейки
	for(let i = 0; i < snake.length; i++) {
		if (snake.length === 1) ctx.drawImage(snakeImg, snake[i].x, snake[i].y);
		else ctx.drawImage(i === 0 ? headImg : bodyImg, snake[i].x, snake[i].y);
	}
	
	console.log(dir);
	if (!dir) return;
	
	
	
	//запомним текущие координаты
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;
	
	//удаление последнего элемента массива змейки
	snake.pop();
	
	//меняем координаты головы в зависимости от направления
	if (dir == "left") snakeX -= box;
	if (dir == "right") snakeX += box;
	if (dir == "up") snakeY -= box;
	if (dir == "down") snakeY += box;
	
	//новые координаты головы
	const newHead = { x: snakeX, y: snakeY };
	//добавление новой головы в начало массива
	snake.unshift(newHead);
	
	
}

let game = setInterval(drawGame, speed);