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

// will hold the total number of coins. start with 1 to account for the coin under the ghost!
var coins = 1;

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
      if (gameBoardGrid[rowIdx][cellIdx] == PAC){
        pacman.x = cellIdx;
        pacman.y = rowIdx;
        prevPac.x = cellIdx;
        prevPac.y = rowIdx;
        // console.log("pacman: row-" + rowIdx + " col-" + cellIdx);
      }

      if (gameBoardGrid[rowIdx][cellIdx] == GHS){
        ghost.x = cellIdx;
        ghost.y = rowIdx;
        // console.log("ghost: row-" + rowIdx + " col-" + cellIdx);
      }

      if (gameBoardGrid[rowIdx][cellIdx] == COI){
        coins++;
      }
    }
  }
  // console.log("coins - " + coins);
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
        // console.log('Invalid key. Please use Arrow keys');
        return;
    }

    if (gameBoardGrid[pacman.y][pacman.x] != BRK){  // the outer IF is for collison detection
      if (gameBoardGrid[pacman.y][pacman.x] == 1){  // the inner IF is for scoring
        score++;
        // if (score == coins){
        //   alive = false;
        // }
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

  // The below is for testing. The ghost moves on hitting the space bar. if this is uncommented, make sure the setInterval statement is commented. Otherwise, it will still work but wont be of help with testing.
  
  // $(document).keydown(function(e){
  //   if (event.which == 32){
  //     ghostProtocol();
  //   }
  // })
}

function ghostProtocol(){
  var    dirAvail = [];
  var     dirToGo = [];
  var    dirMatch = 0;
  var matchedDirs = [];

  if(gameBoardGrid[ghost.y][ghost.x - 1] !== BRK){dirAvail.push('l')};
  if(gameBoardGrid[ghost.y][ghost.x + 1] !== BRK){dirAvail.push('r')};
  if(gameBoardGrid[ghost.y - 1][ghost.x] !== BRK){dirAvail.push('u')};
  if(gameBoardGrid[ghost.y + 1][ghost.x] !== BRK){dirAvail.push('d')};

  // The below will make sure that if the ghost has multiple options for taking the next step, it doesn't retrace its step. This stops the ghost from oscillating between two adjacent cells and makes it move through the grid
  // if ((prevGhostStep == '') || (dirAvail.length == 1)){
  if (dirAvail.length == 1){
    //  do nothing if these conditions are satisfied
  } else {
    // putting in a rudimentary pacman seeking mechanism
    // 1. figure out where the ghost is relative to pacman. Possibilities are: leftup, up, rightup, right, rightdown, down, leftdown, left. Store this in dirToGo
    switch (true){
      case (pacman.x < ghost.x):
        dirToGo.push('l');
        switch (true){
          case (pacman.y < ghost.y):
            dirToGo.push('u');
            break;
          case (pacman.y > ghost.y):
            dirToGo.push('d');
            break;
        }
        break;
      case (pacman.x == ghost.x):
        switch (true){
          case (pacman.y < ghost.y):
            dirToGo.push('u');
            break;
          case (pacman.y > ghost.y):
            dirToGo.push('d');
            break;
        }
        break;
      case (pacman.x > ghost.x):
        dirToGo.push('r');
        switch (true){
          case (pacman.y < ghost.y):
            dirToGo.push('u');
            break;
          case (pacman.y > ghost.y):
            dirToGo.push('d');
            break;
        }
        break;
    }

    // 2. We have collected the possible directions of motion in dirAvail. Check if this contains the ideal directions identified above
    for (var i = 0; i < dirToGo.length; i++){
      if ($.inArray(dirToGo[i],dirAvail) > -1){
        dirMatch++;
        matchedDirs.push(dirToGo[i]);
      }
    }

    // 3. If all the ideal directions (max of 2) are also possible directions, then make sure that the ideal directions are the only possible directions available.
    if (dirMatch == dirToGo.length){
      dirAvail = [];
      for (var i = 0; i < dirToGo.length; i++){
        dirAvail.push(dirToGo[i]);
      }

    // If only one of the ideal directions is available as a possible direction, if it is the same as the previous direction the ghost was taking, make it the only possible option.
    } else if (matchedDirs[0] == prevGhostStep){ // using matchDirs[0] directly because at this point, the array can hold only one value
      dirAvail = [];
      dirAvail.push(matchedDirs[0]);
      
    // If only one of the ideal directions is available as a possible direction, and it is not the same as the previous direction the ghost was taking, check whether it is at right angles with previous direction and if yes make it the only option
    } else {
      switch (true){
        case (matchedDirs[0] == 'l' && prevGhostStep != 'r'):
        case (matchedDirs[0] == 'r' && prevGhostStep != 'l'):
        case (matchedDirs[0] == 'u' && prevGhostStep != 'd'):
        case (matchedDirs[0] == 'd' && prevGhostStep != 'u'):
          dirAvail = [];
          dirAvail.push(matchedDirs[0]);
          break;
        deafult:
    // If any of the above conditions arent satisfied, then go ahead and randomly pick the direction for the ghost
          if ((prevGhostStep == 'l') && ($.inArray('r',dirAvail) > -1)){dirAvail.splice($.inArray('r', dirAvail),1);}
          if ((prevGhostStep == 'r') && ($.inArray('l',dirAvail) > -1)){dirAvail.splice($.inArray('l', dirAvail),1);}
          if ((prevGhostStep == 'u') && ($.inArray('d',dirAvail) > -1)){dirAvail.splice($.inArray('d', dirAvail),1);}
          if ((prevGhostStep == 'd') && ($.inArray('u',dirAvail) > -1)){dirAvail.splice($.inArray('u', dirAvail),1);}
          break;
      }
      // } else {
      //   if ((prevGhostStep == 'l') && ($.inArray('r',dirAvail) > -1)){dirAvail.splice($.inArray('r', dirAvail),1);}
      //   if ((prevGhostStep == 'r') && ($.inArray('l',dirAvail) > -1)){dirAvail.splice($.inArray('l', dirAvail),1);}
      //   if ((prevGhostStep == 'u') && ($.inArray('d',dirAvail) > -1)){dirAvail.splice($.inArray('d', dirAvail),1);}
      //   if ((prevGhostStep == 'd') && ($.inArray('u',dirAvail) > -1)){dirAvail.splice($.inArray('u', dirAvail),1);}
      // }
    }
  }
    
    // console.log("dirToGo - " + dirToGo);
    // console.log("dirAvail - " + dirAvail);

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

  // console.log("dir selected - " + dirAvail[next]);

  if ((ghost.x == pacman.x) && (ghost.y == pacman.y)){
    // do not update the ghosts position if it reaches pacman. 
  } else {
    ghostCellContent = gameBoardGrid[ghost.y][ghost.x];
    gameBoardGrid[ghost.y][ghost.x] = GHS;
  }

  drawGameBoard();
}