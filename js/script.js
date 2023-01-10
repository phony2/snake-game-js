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

/**
* Изображение для мухомора
*/
const toxicImg = new Image();
toxicImg.src = "img/toxic.png";

// Скорость игры в милисекундах
let speed = 600;

// Размер одной клетки игрового поля
let box = 32;

/**
* Количество набранных очков в игре
*/
let score = 0;

/**
* Рандомная позиция еды и мухомора в рамках игрового поля
*/
let food = generatingCoordinates();
let toxic = generatingCoordinates();

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
	if (event.keyCode === 37 && dir != "right") dir = "left";
	else if (event.keyCode === 38 && dir != "down") dir = "up";
	else if (event.keyCode === 39 && dir != "left") dir = "right";
	else if (event.keyCode === 40 && dir != "up") dir = "down";
}

/**
* Функция генерации радомных координат х и у
*/
function generatingCoordinates() {
  return {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
  };
}

function gameOver() {
  clearInterval(game);
  alert(`Игра закончилась со счетом: ${score}. Для запуска игры сначала, перезагрузите страницу.`);
}


/**
* Функция для отрисовки игры
*/
function drawGame() {
	// Отрисовка фона игрового поля
	ctx.drawImage(playingArea, 0, 0);
	
	// Отрисовка еды и мухомора
	ctx.drawImage(foodImage, food.x, food.y);
	ctx.drawImage(toxicImg, toxic.x, toxic.y);
	
	// Отрисовка змейки
	for(let i = 0; i < snake.length; i++) {
		if (snake.length === 1) ctx.drawImage(snakeImg, snake[i].x, snake[i].y);
		else ctx.drawImage(i === 0 ? headImg : bodyImg, snake[i].x, snake[i].y);
	}
	
	// Если направление не установлено, нет смысла идти дальше
	if (!dir) return;
	
	// Устанавливаем цвет текста
	ctx.fillStyle = "white";
	
	// Устанавливаем шрифт текста
	ctx.font = "50px Arial";
	
	// Выводим текущее значение очков в игре
	ctx.fillText(score, box * 2.5, box * 1.7);
	
	// Выводим текущую скорость игры
	ctx.fillText(`speed: ${speed}`, box * 7, box * 1.7);
	
	
	
	//запомним текущие координаты
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;
	
	// Если на пути встретилась еда
	// +1 очко
	// Увеличиваем скорость на 10
	// Генерируем новую еду
	// В противном случае удаляем последний элемент змейки,
	// чтобы ее размеры не менялись
	if(snakeX === food.x && snakeY === food.y) {
		score++;
		speed -= 10;
		food = generatingCoordinates();
	} else {
		//удаление последнего элемента массива змейки
		snake.pop();
	}
	
	// При встрече с мухомором змейка погибает
	if(snakeX == toxic.x && snakeY == toxic.y) {
		gameOver();
	}
		
	//меняем координаты головы в зависимости от направления
	if (dir === "left") snakeX -= box;
	if (dir === "right") snakeX += box;
	if (dir === "up") snakeY -= box;
	if (dir === "down") snakeY += box;
	
	//новые координаты головы
	const newHead = { x: snakeX, y: snakeY };
	//добавление новой головы в начало массива
	snake.unshift(newHead);
	
	
}

let game = setInterval(drawGame, speed);