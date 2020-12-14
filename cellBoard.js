let board = new Array();
let m, n;

function boardGenerator(m, n) {
  let max = 2 ** (m * n - 1);
  let min = (2 ** (m * n));
  let boardNumber = Math.floor(Math.random() * (max - min) + min);
  let board = new Array();

  boardNumber = boardNumber.toString(2);

  for (let i = 0; i <  (m + 2); i++) {//m+2 for padding
    board[i] = new Array();
    for (let j = 0; j < (n + 2); j++) {//n+2 for padding
      if ((j == 0) || (i == 0) || (j == (n + 1)) || (i == (m + 1)) ) {
        board[i][j] = "0"; //added padding
        // Добавила padding со всех сторон, чтобы экономить на дополнительные проверки(существует ли там элемент)
//padding будет мертвая клетка, так как она ни на что не влияет
//но обрабатывать(оживлять, умертвлять) клетки будем только вне этих экстра элементов, экстра элементы не будет в центре внимания и не будут меняться
//выводим массив без padding
      } else {
        board[i][j] = boardNumber[0];
        boardNumber = boardNumber.slice(1, boardNumber.length);
      }
    }
  }
  return board;
}

function readFile() {
  const fileSystem = require("fs");
  let dataString = "";

  try {
    dataString = fileSystem.readFileSync("boardFile.txt", 'ascii')
  } catch (err) {
    console.error(err)
  }
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

  for (let i = 1; i < m + 1; i++) {
    dataArray[i] = dataArray[i].padStart(n + 1, "0");
    dataArray[i] = dataArray[i].padEnd(n + 2, "0");
    dataArray[i] = dataArray[i].split('');
  }
  return {"dataArray": dataArray, "m": m, "n": n};
}

function showBoard(boardArray, m, n) {
  for (let i = 1; i <  m - 1; i++) {
    for (let j = 1; j < n - 1; j++) {
      process.stdout.write(boardArray[i][j]);
    }
    process.stdout.write('\n');
  }
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
  }
  return aliveCells;
}

function updateBoard(board, m, n) {
  let newBoard = new Array();
  let aliveCells;
  for (i = 0; i < m; i++) {
    newBoard[i] = new Array(n ).fill("0");
    for (j = 0; j < n; j++) {

      if ((j == 0) || (i == 0) || (j == (n - 1)) || (i == (m - 1)) ) {
        board[i][j] = "0";
      } else {
        aliveCells = checkSurroundingCells(board, i, j);
        if (board[i][j] == "1") {
          if (( aliveCells < 2) || (aliveCells > 3)) {
            newBoard[i][j] = "0";
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

function setupUpdateLoop() {
  const readLineSync = require('readline-sync');
  let whichMethod = readLineSync.question(`Choose how you would like to load the board's initial state: 
  *Type 1, if you prefer to randomly generate the board
  *Type 2, if you prefer to load the board from a file\n`);
  if (whichMethod == "1") {
    m = Number(readLineSync.question("How many columns should the board have?\n"));
    n = Number(readLineSync.question("How many rows should the board have?\n"));
    board = boardGenerator(m, n);
    console.log("The board's initial generated state:")
    showBoard(board, m + 2, n + 2);
  } else if (whichMethod == "2") {
    let dataString = readFile();
    let dataObject = stringToBoard(dataString);
    board = dataObject.dataArray;
    m = dataObject.m;
    n = dataObject.n;
    console.log("Board's initial file state:")
    showBoard(board, m + 2, n + 2);
  }
  console.log("\nStarting the board updating process. Press any key to leave the program");
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on('data', process.exit.bind(process, 0));
}

function startUpdateLoop() {
  board = updateBoard(board, m + 2, n + 2);
  console.log();
  showBoard(board, m + 2, n + 2); //+2 for padding
}

setupUpdateLoop();
let timerId = setInterval(startUpdateLoop, 1000);

