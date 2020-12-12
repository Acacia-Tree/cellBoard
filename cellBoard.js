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
let board = new Array();// Добавить padding со всех сторон, чтобы экономить на дополнительные проверки(существует ли там элемент)
//padding будет мертвая клетка, так как она ни на что не влияет
//но обрабатывать(оживлять, умертвлять) клетки будем только вне этих экстра элементов, экстра элементы не будет в центре внимания и не будут меняться
//выводить массив без padding
let m, n;

function updateBoard(board, m, n) {
  let newBoard = new Array();
  let aliveCells;
  for (i = 0; i < m; i++) {
    newBoard[i] = new Array(n ).fill("0");
    console.log("newBoard");
    console.log(newBoard);
    for (j = 0; j < n; j++) {

      if ((j == 0) || (i == 0) || (j == (n - 1)) || (i == (m - 1)) ) {
        board[i][j] = "0"; //added padding
      } else {
        aliveCells = checkSurroundingCells(board, i, j);
        if (board[i][j] == "1") {
          if (( aliveCells < 2) || (aliveCells > 3)) {
            newBoard[i][j] = "0";
            console.log("newBoard");
            console.log(newBoard);
          } else {
            newBoard[i][j] = "1";
          }
        } else {
          if (aliveCells == "3") {
            newBoard[i][j] = "1";
          } else {
            newBoard[i][j] = "0";
          }
        }
      }

    }
  }
  return newBoard;
}

function checkSurroundingCells(board, iCell, jCell) {//на выходе количество живых клеток вокруг
  let aliveCells = 0;

  let di = [-1, -1, -1, 0, 1, 1, 1, 0];
  let dj = [-1,  0,  1, 1, 1, 0,-1,-1];// смещения, соответствующие соседям ячейки

  for (let n = 0; n < 8; n++) {
    let i = iCell + di[n];
    let j = jCell + dj[n];
    if (board[i][j] == "1") {
      aliveCells++;
    }
    if ((iCell == 1) && (jCell == 3)) {
      console.log(`Next to board[${iCell}][${jCell}] is ${board[i][j]}`);
      console.log(`n is ${n}`);
    }
  }
  //console.log(`board[${iCell}][${jCell}] has ${aliveCells} alive surrounding cells`);
  return aliveCells;
}
function boardGenerator(m, n) {//нужно m x n значений//m*n-1
  let max = 2 ** (m * n - 1);
  let min = (2 ** (m * n));
  let boardNumber = Math.floor(Math.random() * (max - min) + min);//min is inclusive, max is not inclusive [4,8) which is with integers [4,7]
  let board = new Array();

  boardNumber = boardNumber.toString(2);
  console.log(boardNumber);

  for (let i = 0; i <  (m + 2); i++) {//m+2 for padding
    board[i] = new Array();
    for (let j = 0; j < (n + 2); j++) {//n+2 for padding
      if ((j == 0) || (i == 0) || (j == (n + 1)) || (i == (m + 1)) ) {
        board[i][j] = "0"; //added padding
      } else {
        board[i][j] = boardNumber[0];
        boardNumber = boardNumber.slice(1, boardNumber.length);
      }
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
  //console.log(dataString);
  return dataString;
}

function stringToBoard(dataString) {//for readfile 
  let dataArray, m, n;
  if (dataString !== "") {
    dataArray = dataString.split('\r\n');
    n = dataArray[0].length;  
    m = dataArray.length;
  }

  let paddingArray = Array(n + 2).fill("0");
  dataArray.push(paddingArray);
  dataArray.unshift(paddingArray);

  for (let i = 1; i < m + 1; i++) {//already took care of first and last padding rows
    dataArray[i] = dataArray[i].padStart(n + 1, "0");
    dataArray[i] = dataArray[i].padEnd(n + 2, "0");
    dataArray[i] = dataArray[i].split('');
  }
  return dataArray;
}

function showBoard(boardArray, m, n) {
  for (let i = 1; i <  m - 1; i++) {
    for (let j = 1; j < n - 1; j++) {
      process.stdout.write(boardArray[i][j]);
    }
    process.stdout.write('\n');
  }
}

m = 2;
n = 3;
board = boardGenerator(m, n);
console.log("showBoard");
showBoard(board, m + 2, n + 2);//working with array, showing array
console.log();
let dataString = readFile();
board = stringToBoard(dataString);
console.log("showBoard");
m = 3;
n = 3;
showBoard(board, m + 2, n + 2); //+2 for padding
let newBoard = updateBoard(board, m + 2, n + 2);
console.log("last new Board");
console.log(newBoard);
showBoard(newBoard, m + 2, n + 2); //+2 for padding