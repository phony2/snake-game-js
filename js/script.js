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

// скорость игры в милисекундах
let speed = 600;

// размер одной клетки игрового поля
let box = 32;

// позиция еды
let food = { x: 5 * box, y: 5 * box}

/**
* Функция для отрисовки игры
*/
function drawGame() {
	//отрисовка фона игрового поля
	ctx.drawImage(playingArea, 0, 0);
	
	// отрисовка еды
	ctx.drawImage(foodImage, food.x, food.y);
}

let game = setInterval(drawGame, speed);