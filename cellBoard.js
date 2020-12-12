/* Дана доска размером M × N клеток. 
Клетка может находиться в одном из двух состояний: 1 — живая, 0 — мёртвая. 
Каждая клетка взаимодействует с восемью соседями. Правила таковы:

        1) Живая клетка, у которой меньше двух живых соседей, погибает.

        2) Живая клетка, у которой два или три живых соседа, выживает.

        3) Живая клетка, у которой больше трёх живых соседей, погибает.

        4) Мёртвая клетка, у которой три живых соседа, возрождается.

Напишите программу, которая будет:
+ случайным образом генерить стартовое состояние;
+- уметь получать его из файла (способ выбирается через параметры запуска в консоли);
+— каждую секунду выводить в консоль новое состояние доски
*/
let board = new Array();
let m, n;

function updateBoard(board, m, n) {// Добавить padding со всех сторон, чтобы экономить на дополнительные проверки(существует ли там элемент)
  //padding будет мертвая клетка, так как она ни на что не влияет
  //но обрабатывать(оживлять, умертвлять) клетки будем только вне этих экстра элементов, экстра элементы не будет в центре внимания и не будут меняться
  let newBoard;
  for (i = 0; i < m; i++) {
    for (j = 0; j < n; j++) {

    }
  }
}

function checkCellStatus() {
  
}
function boardGenerator(m, n) {//нужно m x n значений//m*n-1
  let max = 2 ** (m * n - 1);
  let min = (2 ** (m * n));
  let boardNumber = Math.floor(Math.random() * (max - min) + min);//min is inclusive, max is not inclusive [4,8) which is with integers [4,7]
  let board = new Array();

  boardNumber = boardNumber.toString(2);
  console.log(boardNumber);

  for (let i = 0; i <  m; i++) {
    board[i] = new Array();
    for (let j = 0; j < n; j++) {
      board[i][j] = boardNumber[0];
      boardNumber = boardNumber.slice(1, boardNumber.length);
    }
  }
  console.log(board);
  return board;
}

function readFile() {
  const fileSystem = require("fs");
  let dataString = "";//no data

  try {
    dataString = fileSystem.readFileSync("boardFile.txt", 'ascii')
  } catch (err) {
    console.error(err)
  }
  console.log(dataString);
  return dataString;
}

function stringToBoard(dataString) {//for readfile stringToBoard
  let dataArray, m, n;
  if (dataString !== "") {
    dataArray = dataString.split('\r\n');
    n = dataArray[0].length;  
    m = dataArray.length;
  }
  for (let i = 0; i < m; i++) {
    dataArray[i] = dataArray[i].split('');
  }
  console.log(dataArray);
  return dataArray;
}

function showBoard(boardArray, m, n) {
  for (let i = 0; i <  m; i++) {
    for (let j = 0; j < n; j++) {
      process.stdout.write(boardArray[i][j]);
    }
    process.stdout.write('\n');
  }
}

m = 2;
n = 3;
board = boardGenerator(m, n);
console.log("showBoard");
showBoard(board, m, n);//working with array, showing array
let dataString = readFile();
board = stringToBoard(dataString);
console.log("showBoard");
m = 3;
n = 5;
showBoard(board, m, n);