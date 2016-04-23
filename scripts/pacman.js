$(document).ready(function(){
  // showMenu();
  drawGameBoard();
  addKeyPressListener();
})

function showMenu(){
  // Give users a option of 3 + custom build
  // pre-built options will be images to click
  // custom build will give a choice of
  //    --- grid (rows x cols)
  //    --- circular grid (go out of right/top and come in on the left/bottom)
}

function buildBoard(){
// using HTML data methods to build and store the board representations
}

var BRK = 0;
var COI = 1;
var PAC = 2;
var EMP = 3;

// 24 x 33 grid
var gameBoardGrid = [
// 0  1   2   3   4   5   6   7   8   9   0   1   2   3   4   5   6   7   8   9   0   1   2   3   4   5   6   7   8   9   0   1   2
[BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,EMP,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK],
[BRK,PAC,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,BRK,EMP,BRK,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,BRK],
[BRK,COI,BRK,BRK,BRK,BRK,BRK,COI,BRK,BRK,BRK,BRK,BRK,BRK,COI,BRK,EMP,BRK,COI,BRK,BRK,BRK,BRK,BRK,BRK,COI,BRK,BRK,BRK,BRK,BRK,COI,BRK],
[BRK,COI,BRK,EMP,EMP,EMP,BRK,COI,BRK,EMP,EMP,EMP,EMP,BRK,COI,BRK,EMP,BRK,COI,BRK,EMP,EMP,EMP,EMP,BRK,COI,BRK,EMP,EMP,EMP,BRK,COI,BRK],
[BRK,COI,BRK,BRK,BRK,BRK,BRK,COI,BRK,BRK,BRK,BRK,BRK,BRK,COI,BRK,BRK,BRK,COI,BRK,BRK,BRK,BRK,BRK,BRK,COI,BRK,BRK,BRK,BRK,BRK,COI,BRK],
[BRK,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,BRK],
[BRK,COI,BRK,COI,BRK,BRK,BRK,BRK,COI,BRK,BRK,COI,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,COI,BRK,BRK,COI,BRK,BRK,BRK,BRK,COI,BRK,COI,BRK],
[BRK,COI,BRK,COI,BRK,EMP,EMP,BRK,COI,COI,COI,COI,COI,COI,COI,BRK,EMP,BRK,COI,COI,COI,COI,COI,COI,COI,BRK,EMP,EMP,BRK,COI,BRK,COI,BRK],
[BRK,COI,BRK,COI,BRK,BRK,BRK,BRK,COI,COI,BRK,BRK,COI,BRK,COI,BRK,BRK,BRK,COI,BRK,COI,BRK,BRK,COI,COI,BRK,BRK,BRK,BRK,COI,BRK,COI,BRK],
[BRK,COI,COI,COI,COI,COI,COI,COI,COI,COI,BRK,BRK,COI,BRK,COI,COI,COI,COI,COI,BRK,COI,BRK,BRK,COI,COI,COI,COI,COI,COI,COI,COI,COI,BRK],
[BRK,BRK,COI,BRK,COI,BRK,BRK,BRK,BRK,COI,BRK,BRK,COI,BRK,COI,BRK,BRK,BRK,COI,BRK,COI,BRK,BRK,COI,BRK,BRK,BRK,BRK,COI,BRK,COI,BRK,BRK],
[EMP,BRK,COI,BRK,COI,BRK,EMP,EMP,BRK,COI,BRK,BRK,COI,BRK,COI,BRK,EMP,BRK,COI,BRK,COI,BRK,BRK,COI,BRK,EMP,EMP,BRK,COI,BRK,COI,BRK,EMP],
[EMP,BRK,COI,BRK,COI,BRK,EMP,EMP,BRK,COI,BRK,BRK,COI,BRK,COI,BRK,BRK,BRK,COI,BRK,COI,BRK,BRK,COI,BRK,EMP,EMP,BRK,COI,BRK,COI,BRK,EMP],
[BRK,BRK,COI,BRK,COI,BRK,BRK,BRK,BRK,COI,BRK,BRK,COI,BRK,COI,COI,COI,COI,COI,BRK,COI,BRK,BRK,COI,BRK,BRK,BRK,BRK,COI,BRK,COI,BRK,BRK],
[BRK,COI,COI,COI,COI,COI,COI,COI,COI,COI,BRK,BRK,COI,BRK,BRK,BRK,COI,BRK,BRK,BRK,COI,BRK,BRK,COI,COI,COI,COI,COI,COI,COI,COI,COI,BRK],
[BRK,COI,BRK,COI,BRK,BRK,BRK,BRK,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,BRK,BRK,BRK,BRK,COI,BRK,COI,BRK],
[BRK,COI,BRK,COI,BRK,EMP,EMP,BRK,COI,BRK,BRK,COI,BRK,BRK,BRK,BRK,COI,BRK,BRK,BRK,BRK,COI,BRK,BRK,COI,BRK,EMP,EMP,BRK,COI,BRK,COI,BRK],
[BRK,COI,BRK,COI,BRK,BRK,BRK,BRK,COI,BRK,BRK,COI,BRK,BRK,BRK,BRK,COI,BRK,BRK,BRK,BRK,COI,BRK,BRK,COI,BRK,BRK,BRK,BRK,COI,BRK,COI,BRK],
[BRK,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,BRK],
[BRK,COI,BRK,BRK,BRK,BRK,BRK,COI,BRK,BRK,BRK,BRK,BRK,BRK,COI,BRK,BRK,BRK,COI,BRK,BRK,BRK,BRK,BRK,BRK,COI,BRK,BRK,BRK,BRK,BRK,COI,BRK],
[BRK,COI,BRK,EMP,EMP,EMP,BRK,COI,BRK,EMP,EMP,EMP,EMP,BRK,COI,BRK,EMP,BRK,COI,BRK,EMP,EMP,EMP,EMP,BRK,COI,BRK,EMP,EMP,EMP,BRK,COI,BRK],
[BRK,COI,BRK,BRK,BRK,BRK,BRK,COI,BRK,BRK,BRK,BRK,BRK,BRK,COI,BRK,EMP,BRK,COI,BRK,BRK,BRK,BRK,BRK,BRK,COI,BRK,BRK,BRK,BRK,BRK,COI,BRK],
[BRK,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,BRK,EMP,BRK,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,BRK],
[BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,EMP,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK],
                    ];

var pacman = {
  x: 1,
  y: 1
}
// previous position of pacman
var prevX = 1;
var prevY = 1;

// direction of pacman to orient the image
var dir   = 0;

// scorecard
var score = 0;

function drawGameBoard(){
  var htmlElements = [];

  for (var rowIdx = 0; rowIdx < gameBoardGrid.length; rowIdx++){
    htmlElements.push($('<div />',{
      'class': 'row',
         html: fetchRowCells(gameBoardGrid[rowIdx])
    }))
  }

  $('.game-board').html(htmlElements);
  $('.score').html($('<ul />',{
    html: $('<li />',{
      text: "Score"
    }),
    append: $('<li />',{
      text: score
    })
  }))
}

function fetchRowCells(row){
  var htmlElementsInsideRow = [];

  for (var cellIdx = 0; cellIdx < row.length; cellIdx++){
    var className;

    switch (row[cellIdx]){
      case 0:
        className = 'brick';
        break;
      case 1:
        className = 'coin';
        break;
      case 2:
        console.log("in class name setter." + dir);
        switch (dir){
          case 37:
            className = 'pacman-l';
            break;
          case 38:
            className = 'pacman-u';
            break;
          case 0:
          case 39:
            className = 'pacman-r';
            break;
          case 40:
            className = 'pacman-d';
            break;
          default:
            console.log('Arrow direction indeterminate!');
        }
        // className = 'pacman';
        break;
      case 3:
        className = 'empty';
        break;
      default:
        alert('Invalid value for bulding the Board. Check log');
        console.log('fetchRowCells: Invalid Row[IDX] value used = ' + row[cellIdx]);
    }

    htmlElementsInsideRow.push($('<div />',{
      'class': className
    }))
  }
  return htmlElementsInsideRow;
}


function addKeyPressListener(){
  $(document).keydown(function(event){
    prevX = pacman.x;
    prevY = pacman.y;
    switch(event.which){
      case 37:
        dir = 37;
        pacman.x -= 1;
        break;
      case 38:
        dir = 38;
        pacman.y -=1;
        break;
      case 39:
        dir = 39;
        pacman.x +=1;
        break;
      case 40:
        dir = 40;
        pacman.y +=1;
        break;
      default:
        alert('Invalid key. Please use Arrow keys');
        return;
    }

    if (gameBoardGrid[pacman.y][pacman.x] != BRK){  // the outer IF is for collison detection
      if (gameBoardGrid[pacman.y][pacman.x] == 1){  // the inner IF is for scoring
        score++;
      }
      gameBoardGrid[pacman.y][pacman.x] = PAC;
      gameBoardGrid[prevY][prevX] = EMP;
    } else {
      pacman.x = prevX;
      pacman.y = prevY;
    }
    drawGameBoard();
  })
}