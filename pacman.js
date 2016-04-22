$(document).ready(function(){
  drawGameBoard();
  addKeyPressListener();
})

var BRK = 0;
var COI = 1;
var PAC = 2;
var EMP = 3;

var gameBoardGrid = [
                      [BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK],
                      [BRK,PAC,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,BRK],
                      [BRK,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,BRK],
                      [BRK,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,BRK],
                      [BRK,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,BRK],
                      [BRK,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,BRK],
                      [BRK,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,BRK],
                      [BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK]
                    ];

function drawGameBoard(){
  // CREAT VAR TO HOLD ALL OUR HTML ELEMENTS
  var htmlElements = [];
  // ITERATE THROUGH GAMEBOARDGRID ARRAY
  for(var rowIdx = 0; rowIdx < gameBoardGrid.length; rowIdx+=1){
    // FOR EACH ROW THAT WE GRAB, NEED TO CREATE A DIV class=row
    htmlElements.push($('<div />', {
      'class': 'row',
      html: fetchRowCells(gameBoardGrid[rowIdx])
    }))
  }

          // FOR EACH CELL, FIGURE OUT WHICH CELL IT IS
  $('.game-board').html(htmlElements)

}

// This function will take the row and return divs that correspond to the values
function fetchRowCells(row){
  var htmlElementsInsideRow = []
  //NEED TO ITERATE THROUGH EACH ROW
  for(var cellIdx = 0; cellIdx < row.length; cellIdx+=1){
    var className;
    // FOR EACH CELL, FIGURE OUT WHICH CELL IT IS
    switch(row[cellIdx]){
      case 0:
        className = 'brick';
        break;
      case 1:
        className = 'coin';
        break;
      case 2:
        className = 'pacman';
        break;
      case 3:
        className = 'empty';
        break;
      default:
        // Error case
        console.log('Nothing for that value!');
    }

    // AND CREATE THE CORRECT ELEMENT
    htmlElementsInsideRow.push($('<div />', {
      'class': className
    }))
  }
  return htmlElementsInsideRow;
}

var pacman = {
  x: 1,
  y: 1
}

// ADD LISTENER ON KEY BEING PRESSED
function addKeyPressListener(){
  $(document).keydown(function(event){
    // CHANGE CURRENT LOCATION TO EMPTY

    gameBoardGrid[pacman.y][pacman.x] = EMP

    // FIND OUT WHICH KEY WAS PRESSED
    // UPDATE PACMAN LOCATION
    switch(event.which){
      case 37:
        // LEFT
        pacman.x -= 1;
        break;
      case 38:
        // TOP
        pacman.y -=1;
        break;
      case 39:
        // RIGHT
        pacman.x +=1;
        break;
      case 40:
        // DOWN
        pacman.y +=1;
        break;
      default:
        console.log('Arrow key not pressed!')
    }
    // If we're here, pacman location has been updated

    // INSERT NEW PACMAN LOCATION INTO GRID
    gameBoardGrid[pacman.y][pacman.x] = PAC;

    // Redraw game board
    drawGameBoard();


  })
}
