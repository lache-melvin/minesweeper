document.addEventListener('DOMContentLoaded', startGame)

var board = {}

function createBoard () {
  board.cells = []
  for (var i = 0; i < 25; i++) {
    board.cells.push({})
    board.cells[i].row = i % 5;
    board.cells[i].col = Math.floor(i/5);
    board.cells[i].isMine = Math.random() < 0.4;
    board.cells[i].hidden = true;
  }
}






 function startGame () {
  // Don't remove this function call: it makes the game work!
  createBoard()
  addResetListener()
 
  document.addEventListener("click", checkForWin)
  document.addEventListener("contextmenu", checkForWin)
  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
 
  

  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
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
 
  

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
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
function addResetListener () {
  document.getElementById('reset').addEventListener("click", boardReset)
}

function boardReset () {
  document.getElementsByClassName('board')[0].innerHTML = "";
  startGame();
}