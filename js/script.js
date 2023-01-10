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
* Функция для отрисовки игры
*/
function drawGame() {}