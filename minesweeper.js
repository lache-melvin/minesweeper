document.addEventListener('DOMContentLoaded', startGame)

var boardSize = 5;

function startGame () {
  createBoard(boardSize)
  bindEventListeners()
  totalMines()
  showRemainingMines()
  

 
  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
  lib.initBoard()
}

var board = {}

function createBoard (num) {
  board.cells = []
  for (var i = 0; i < num*num; i++) {
    board.cells.push({})
    board.cells[i].row = i % num;   //numbers rows 0-4 (repeats 5x)
    board.cells[i].col = Math.floor(i/num);     //numbers cols 5x0, 5x1...
    board.cells[i].isMine = Math.random() < 0.4;   //random true/false generator
    board.cells[i].hidden = true;
  }
}



function bindEventListeners () {
  document.addEventListener("click", checkForWin)
  document.addEventListener("contextmenu", checkForWin)
  document.addEventListener("contextmenu", showRemainingMines)
  document.getElementById('minesLeftToggler').addEventListener('click', toggleRemainingMines)
  document.getElementById('reset').addEventListener("click", boardReset)
  document.getElementById('3').addEventListener("click", boardResize)
  document.getElementById('4').addEventListener("click", boardResize)
  document.getElementById('5').addEventListener("click", boardResize)
  document.getElementById('6').addEventListener("click", boardResize)
}



//counts number of mines surrounding a given cell
function countSurroundingMines (cell) {
  var count = 0
  var surrounding = lib.getSurroundingCells(cell['row'], cell['col'])
  for (var i = 0; i < surrounding.length; i++) {
    if (surrounding[i].isMine == true) {
      count++ 
    }
  }
  return count
}


//clears board and creates a new random one at selected size
function boardResize(event) {
  document.getElementsByClassName('board')[0].innerHTML = "";
  boardSize = parseInt(event.target.id);
  startGame();
}


//clears board and creates new one based on size of current board
function boardReset () {
  boardSize = Math.sqrt(board.cells.length)
  document.getElementsByClassName('board')[0].innerHTML = "";
  startGame();
}



//show total mines in game
function totalMines() {
  var cellsWithMines = board.cells.filter (cell => {
    return cell.isMine 
  }).length
  if (cellsWithMines > 1) {
    document.getElementById('totalBombs').innerHTML =  "There are " + cellsWithMines + " mines"
  } else {
    document.getElementById("totalBombs").innerHTML = "why"
  }
}

//shows number of mines left to flag
function showRemainingMines() {
  var cellsWithMines = board.cells.filter (cell => {
    return cell.isMine 
  })
  var unmarkedMines = cellsWithMines.filter (cell => {
    return !cell.isMarked
  }).length
  if (unmarkedMines > 1) {
    document.getElementById('bombsRemaining').innerHTML = ", and you have " + unmarkedMines + " left to find."
  }
  else if (unmarkedMines == 1) {
    document.getElementById('bombsRemaining').innerHTML =  "1 mine remaining"
  } else {
    document.getElementById('bombsRemaining').innerHTML =  "0 mines remaining - you did it!"
  }
}

function toggleRemainingMines() {
  document.getElementById('bombsRemaining').classList.toggle('remainingMines')
}


//checks after each click if the player has won the game - if yes displays win message
function checkForWin () {
  var winCount = 0
  board.cells.forEach(cell => {
    if (cell.isMine && !cell.isMarked) {
      return
    } else if (!cell.isMine  && cell.hidden) {
      return 
    } else {
     winCount++
    }
  if (winCount == board.cells.length) {
    lib.displayMessage('You win!')
  }
  }) 
}


