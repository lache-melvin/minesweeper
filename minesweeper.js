document.addEventListener('DOMContentLoaded', startGame)

var board = {}

function createBoard () {
  board.cells = []
  for (var i = 0; i < 25; i++) {
    board.cells.push({})
    board.cells[i].row = i % 5;   //numbers rows 0-4 (repeats 5x)
    board.cells[i].col = Math.floor(i/5);     //numbers cols 5x0, 5x1...
    board.cells[i].isMine = Math.random() < 0.4;   //random true/false generator
    board.cells[i].hidden = true;
  }
}






 function startGame () {
  createBoard()
  bindEventListeners()
  showRemainingMines()
 
  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
  lib.initBoard()
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


function bindEventListeners () {
  document.addEventListener("click", checkForWin)
  document.addEventListener("contextmenu", checkForWin)
  document.getElementById('reset').addEventListener("click", boardReset)
  document.addEventListener("contextmenu", showRemainingMines)
  document.getElementById('minesLeftToggler').addEventListener('click', toggleRemainingMines)
  
}

//clears board and creates a new random one
function boardReset () {
  document.getElementsByClassName('board')[0].innerHTML = "";
  startGame();
}


//adds a message to top of screen with number of mines left to flag
function showRemainingMines() {
  var cellsWithMines = board.cells.filter (cell => {
    return cell.isMine 
  })
  var unmarkedMines = cellsWithMines.filter (cell => {
    return !cell.isMarked
  }).length
  if (unmarkedMines > 1) {
    document.getElementById('bombsRemaining').innerHTML =  unmarkedMines + " mines remaining"
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




