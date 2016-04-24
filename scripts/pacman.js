$(document).ready(function(){
  // showMenu();
  findEm();
  drawGameBoard();
  startGhost();
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

// flag to represent if pacman is alive or not
var alive = true;

// the scheduler interval ID generated when ghostProtocol is started. Used to stop ghostProtocol
var gp;

// references of the different entities in the board
var BRK = 0;
var COI = 1;
var PAC = 2;
var EMP = 3;
var GHS = 4;

// 24 x 33 grid
var gameBoardGrid = [
// 0  1   2   3   4   5   6   7   8   9   0   1   2   3   4   5   6   7   8   9   0   1   2   3   4   5   6   7   8   9   0   1   2
[BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,EMP,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK], // 0
[BRK,PAC,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,BRK,EMP,BRK,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,BRK], // 1
[BRK,COI,BRK,BRK,BRK,BRK,BRK,COI,BRK,BRK,BRK,BRK,BRK,BRK,COI,BRK,EMP,BRK,COI,BRK,BRK,BRK,BRK,BRK,BRK,COI,BRK,BRK,BRK,BRK,BRK,COI,BRK], // 2
[BRK,COI,BRK,EMP,EMP,EMP,BRK,COI,BRK,EMP,EMP,EMP,EMP,BRK,COI,BRK,EMP,BRK,COI,BRK,EMP,EMP,EMP,EMP,BRK,COI,BRK,EMP,EMP,EMP,BRK,COI,BRK], // 3
[BRK,COI,BRK,BRK,BRK,BRK,BRK,COI,BRK,BRK,BRK,BRK,BRK,BRK,COI,BRK,BRK,BRK,COI,BRK,BRK,BRK,BRK,BRK,BRK,COI,BRK,BRK,BRK,BRK,BRK,COI,BRK], // 4
[BRK,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,BRK], // 5
[BRK,COI,BRK,COI,BRK,BRK,BRK,BRK,COI,BRK,BRK,COI,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,COI,BRK,BRK,COI,BRK,BRK,BRK,BRK,COI,BRK,COI,BRK], // 6
[BRK,COI,BRK,COI,BRK,EMP,EMP,BRK,COI,COI,COI,COI,COI,COI,COI,BRK,EMP,BRK,COI,COI,COI,COI,COI,COI,COI,BRK,EMP,EMP,BRK,COI,BRK,COI,BRK], // 7
[BRK,COI,BRK,COI,BRK,BRK,BRK,BRK,COI,BRK,BRK,BRK,COI,BRK,COI,BRK,BRK,BRK,COI,BRK,COI,BRK,BRK,BRK,COI,BRK,BRK,BRK,BRK,COI,BRK,COI,BRK], // 8
[BRK,COI,COI,COI,COI,COI,COI,COI,COI,COI,BRK,BRK,COI,BRK,COI,COI,COI,COI,COI,BRK,COI,BRK,BRK,COI,COI,COI,COI,COI,COI,COI,COI,COI,BRK], // 9
[BRK,BRK,COI,BRK,COI,BRK,BRK,BRK,BRK,COI,BRK,BRK,COI,BRK,COI,BRK,COI,BRK,COI,BRK,COI,BRK,BRK,COI,BRK,BRK,BRK,BRK,COI,BRK,COI,BRK,BRK], // 0
[EMP,BRK,COI,BRK,COI,BRK,EMP,EMP,BRK,COI,BRK,BRK,COI,BRK,COI,COI,GHS,COI,COI,BRK,COI,BRK,BRK,COI,BRK,EMP,EMP,BRK,COI,BRK,COI,BRK,EMP], // 1
[EMP,BRK,COI,BRK,COI,BRK,EMP,EMP,BRK,COI,BRK,BRK,COI,BRK,COI,BRK,COI,BRK,COI,BRK,COI,BRK,BRK,COI,BRK,EMP,EMP,BRK,COI,BRK,COI,BRK,EMP], // 2
[BRK,BRK,COI,BRK,COI,BRK,BRK,BRK,BRK,COI,BRK,BRK,COI,BRK,COI,COI,COI,COI,COI,BRK,COI,BRK,BRK,COI,BRK,BRK,BRK,BRK,COI,BRK,COI,BRK,BRK], // 3
[BRK,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,BRK,COI,BRK,BRK,BRK,COI,BRK,BRK,BRK,COI,BRK,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,BRK], // 4
[BRK,COI,BRK,COI,BRK,BRK,BRK,BRK,COI,BRK,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,BRK,COI,BRK,BRK,BRK,BRK,COI,BRK,COI,BRK], // 5
[BRK,COI,BRK,COI,BRK,EMP,EMP,BRK,COI,BRK,BRK,COI,BRK,BRK,BRK,BRK,COI,BRK,BRK,BRK,BRK,COI,BRK,BRK,COI,BRK,EMP,EMP,BRK,COI,BRK,COI,BRK], // 6
[BRK,COI,BRK,COI,BRK,BRK,BRK,BRK,COI,BRK,BRK,COI,BRK,BRK,BRK,BRK,COI,BRK,BRK,BRK,BRK,COI,BRK,BRK,COI,BRK,BRK,BRK,BRK,COI,BRK,COI,BRK], // 7
[BRK,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,BRK], // 8
[BRK,COI,BRK,BRK,BRK,BRK,BRK,COI,BRK,BRK,BRK,BRK,BRK,BRK,COI,BRK,BRK,BRK,COI,BRK,BRK,BRK,BRK,BRK,BRK,COI,BRK,BRK,BRK,BRK,BRK,COI,BRK], // 9
[BRK,COI,BRK,EMP,EMP,EMP,BRK,COI,BRK,EMP,EMP,EMP,EMP,BRK,COI,BRK,EMP,BRK,COI,BRK,EMP,EMP,EMP,EMP,BRK,COI,BRK,EMP,EMP,EMP,BRK,COI,BRK], // 0
[BRK,COI,BRK,BRK,BRK,BRK,BRK,COI,BRK,BRK,BRK,BRK,BRK,BRK,COI,BRK,EMP,BRK,COI,BRK,BRK,BRK,BRK,BRK,BRK,COI,BRK,BRK,BRK,BRK,BRK,COI,BRK], // 1
[BRK,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,BRK,EMP,BRK,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,COI,BRK], // 2
[BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,EMP,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK,BRK], // 3
                    ];

// will hold the current position of pacman
var pacman = {
  x: 0,
  y: 0
}
// will hold the previous position of pacman
var prevPac = {
  x: 0,
  y: 0
}

// direction of pacman to orient the image
var dir   = 0;

// will hold the current position of the ghost. 
var ghost = {
  x: 0,
  y: 0
}
// previous direction of movement of ghost (left, right, up, down)
var prevGhostStep = '';

// original content of the cell occupied by the ghost
var ghostCellContent = COI;

// scorecard
var score = 0;

// locate pacman and ghost at the beginning of the game. 
// This will allow us to change the hardcoded location of the characters in the grid as we please without worrying about updating their location variables/objects

function findEm(){
  for (var rowIdx = 0; rowIdx < gameBoardGrid.length; rowIdx++){
    for (var cellIdx = 0; cellIdx < gameBoardGrid[rowIdx].length; cellIdx++){
      if (gameBoardGrid[rowIdx][cellIdx] == 2){
        pacman.x = cellIdx;
        pacman.y = rowIdx;
        prevPac.x = cellIdx;
        prevPac.y = rowIdx;
        console.log("pacman: row-" + rowIdx + " col-" + cellIdx);
      }

      if (gameBoardGrid[rowIdx][cellIdx] == 4){
        ghost.x = cellIdx;
        ghost.y = rowIdx;
        console.log("ghost: row-" + rowIdx + " col-" + cellIdx);
      }
    }
  }
}

function drawGameBoard(){
  if (!alive){return}; // Added this so that after game over we dont want any redrawing of the board

  if ((ghost.x == pacman.x) && (ghost.y == pacman.y)){
    console.log("Pacman is DEAD!!!");
    alive = false;
    clearInterval(gp);
  }

  var htmlElements = [];

  for (var rowIdx = 0; rowIdx < gameBoardGrid.length; rowIdx++){
    htmlElements.push($('<div />',{
      'class': 'row',
         html: fetchRowCells(gameBoardGrid[rowIdx])
    }))
  }

  $('.game-board').html(htmlElements);

  // Adding the scorecard
  $('.score').html($('<ul />',{
    html: $('<li />',{
      text: "Score"
    }),
    append: $('<li />',{
      text: score
    })
  }))

  // showing the game over message
  if (!alive){
    $('.score ul').append($('<li />',{
      text: "Game Over"
    }))
  }
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
        if (!alive){
          className = 'dead'
        } else {
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
        }
        // className = 'pacman';
        break;
      case 3:
        className = 'empty';
        break;
      case 4:
        className = 'ghost';
        break;
      default:
        // The below will not be triggered becaue our board is hardcoded. Added this for future use when board can be dynamically generated
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
  if (!alive){return}; // Added this so that after game over keyPress is not processed

  $(document).keydown(function(event){
    prevPac.x = pacman.x;
    prevPac.y = pacman.y;
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
        // uncomment the alert and comment out the console.log if that logging is not desired
        // comment out both alert and console.log if no message has to be sent to the user

        // alert('Invalid key. Please use Arrow keys');
        console.log('Invalid key. Please use Arrow keys');
        return;
    }

    if (gameBoardGrid[pacman.y][pacman.x] != BRK){  // the outer IF is for collison detection
      if (gameBoardGrid[pacman.y][pacman.x] == 1){  // the inner IF is for scoring
        score++;
      }
      gameBoardGrid[pacman.y][pacman.x] = PAC;
      gameBoardGrid[prevPac.y][prevPac.x] = EMP;
    } else {
      pacman.x = prevPac.x;
      pacman.y = prevPac.y;
    }
    drawGameBoard();
  })
}

function startGhost(){
  gp = setInterval(ghostProtocol, 200); // change the number here to speed up or slow down the ghost
}

function ghostProtocol(){
  var dirAvail = [];

  if(gameBoardGrid[ghost.y][ghost.x - 1] !== BRK){dirAvail.push('l')};
  if(gameBoardGrid[ghost.y][ghost.x + 1] !== BRK){dirAvail.push('r')};
  if(gameBoardGrid[ghost.y - 1][ghost.x] !== BRK){dirAvail.push('u')};
  if(gameBoardGrid[ghost.y + 1][ghost.x] !== BRK){dirAvail.push('d')};

  // The below will make sure that if the ghost has multiple options for taking the next step, it doesn't retrace its step. This stops the ghost from oscillating between two adjacent cells and makes it move through the grid
  if ((prevGhostStep == '') || (dirAvail.length == 1)){
    //  do nothing if these conditions are satisfied
  } else {
    if ((prevGhostStep == 'l') && ($.inArray('r',dirAvail) > -1)){dirAvail.splice($.inArray('r', dirAvail),1);}
    if ((prevGhostStep == 'r') && ($.inArray('l',dirAvail) > -1)){dirAvail.splice($.inArray('l', dirAvail),1);}
    if ((prevGhostStep == 'u') && ($.inArray('d',dirAvail) > -1)){dirAvail.splice($.inArray('d', dirAvail),1);}
    if ((prevGhostStep == 'd') && ($.inArray('u',dirAvail) > -1)){dirAvail.splice($.inArray('u', dirAvail),1);}
  }

  var next = Math.floor(Math.random() * dirAvail.length);
  
  gameBoardGrid[ghost.y][ghost.x] = ghostCellContent;

  switch (dirAvail[next]){
    case 'l':
      prevGhostStep = 'l';
      ghost.x -= 1;
      break;
    case 'r':
      prevGhostStep = 'r';
      ghost.x += 1;
      break;
    case 'u':
      prevGhostStep = 'u';
      ghost.y -= 1;
      break;
    case 'd':
      prevGhostStep = 'd';
      ghost.y += 1;
      break;
  }

  if ((ghost.x == pacman.x) && (ghost.y == pacman.y)){
    // do not update the ghosts position if it reaches pacman. This 
  } else {
    ghostCellContent = gameBoardGrid[ghost.y][ghost.x];
    gameBoardGrid[ghost.y][ghost.x] = GHS;
  }

  drawGameBoard();
}