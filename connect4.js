/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

/**
 * I will be using the array below in sync with the current player to alternate the 
 * token images
 */
const pieceArray = [
  'url("Images/YellowPiece.png")',
  'url("Images/RedPiece.png")'
];
/**
 * I use the array below to alternate the color of the text based on the current player
 */
const colorArray = [
  "Yellow", "Red"
];


const playerH2 = document.querySelector("#player-turn");
const playerTurns = document.querySelector("#turn-count");
var WIDTH = 7;
var HEIGHT = 6;
let turnCount = 0;
var currPlayer = 0; // active player: 1 or 2 .. player 1 = 0  player 2 = 1 (for array purposes)
var board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */



 /**
  * The code for make board took some time to run through and get to
  * Basically what is happening is we are taking the empty board that we declared above
  * turning it initially into an array of HEIGHT (6) nulls.
  * Then, by using map, we are creating a new array to replace each of the 6 nulls
  * this happens 7 times until we have a 6x7 board of nulls.
  * A Single board array that now has 6 arrays that are 7 elements long
  */
function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  board = new Array(HEIGHT).fill(null).map(() => new Array(WIDTH).fill(null));
  console.log(board);
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  htmlBoard = document.querySelector("#board");
    playerH2.innerText = "Yellow's Turn";
    playerH2.style.color = "Yellow";
    playerH2.style.backgroundColor = "black";
  // TODO: add comment for this code
  /**
   *  Here we start by creating a new Table-Row (tr) element and setting it to a variable called top
   * we give top the id of "column-top" and add a click listener to it with the function of handleClick() which ill discuss at that function
   * we then loop through var x WIDTH times (in this case 7). Each time creating a new row element (td) called headCell with
   * we give each headCell an id of whatever x is at the time which will be 0-6 and then append that to the top row we just created
   * So, top should be a table row containing 7 individual cells or (tds).
   * lastly we append the entire row that we just created to the htmlboard table element
   */
  var top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
  
  for (var x = 0; x < WIDTH; x++) {
    var headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  /**
   * The below code is similar to the above, except we use it to build all the other rows in the htmlboard table
   * each cell or (td) is given an id that is equal to the row value (y) and the column value (x)
   * then we append the created rows to the htmlboard
   * 
   */
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }

}
/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let i = HEIGHT-1; i >= 0; i--){
    if (board[i][x] !== 0 && board[i][x] !== 1) {
        board[i][x] = currPlayer;
        return i;
    }
    else {
      continue;
    }
  }
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  
  if (currPlayer === 0 ) {
    htmlBoard.rows[y+1].cells[x].style.backgroundImage = "url('Images/YellowPiece.png')";
    
  }
  if (currPlayer === 1) {
    htmlBoard.rows[y+1].cells[x].style.backgroundImage = "url('Images/RedPiece.png')";
  
  }
}

/** endGame: announce game end */

function endGame(msg) {
   alert(msg);
}
  // TODO: pop up alert message

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;
 

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
    htmlBoard.rows[y+1].cells[x].classList.add("fall");
    htmlBoard.rows[y+1].cells[x].style.backgroundImage = pieceArray[currPlayer];
  // check for win
  if (checkForWin()) {
    htmlBoard.rows[0].removeEventListener("click", handleClick);
    return setTimeout(() => {
      endGame(`Player ${colorArray[currPlayer]} won!`);
  },400)};
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (checkForTie()) {
    htmlBoard.rows[0].removeEventListener("click", handleClick);
    return endGame(`Board Is Full, No Winners. Play Again!`);
  }
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  if (currPlayer === 0) {
    htmlBoard.rows[y].cells[x].style.backgroundImage = '';
    playerH2.innerText = "Red's Turn";
    playerH2.style.color = "Red";
    playerH2.style.backgroundColor = "black";
    currPlayer++;
  }
  else {
    htmlBoard.rows[y].cells[x].style.backgroundImage = '';
    playerH2.innerText = "Yellow's Turn";
    playerH2.style.color = "Yellow";
    playerH2.style.backgroundColor = "black";
    currPlayer--;
  }
  turnCount++;
  playerTurns.innerText = `Turns: ${turnCount}`;
}

function checkForTie() {
  if (turnCount === HEIGHT*WIDTH) {
    return true;
  }
  else {
    return false;
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
/**
 * Short and sweet explanation
 * horiz, vert, diagDR, and diagDL are some form of 4 "boxes" in a row
 * either horizontally starting from 0 going to 6 or vertical starting from 0 going to 5
 * or diagnal from the R (DR) or diagnal from the left (DL)
 * these cells are checked 43 times in a sense HEIGHT * WIDTH of the board
 * to see if any 4 boxes have an ID that is the same as the current players number 
 * either 0 or 1
 */
  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}
const reset = document.querySelector("#reset");
reset.addEventListener("click", () => {

  location.reload();

})
makeBoard();
makeHtmlBoard();

let td = document.querySelectorAll("#column-top td");
let tdArray = Array.from(td);

/**
 * Below are functions I will use depending on the screen size to add the proper listeners
 * the mouse events work well when not using a touchscreen, so I needed to come up with a way
 * to implement a different kind of feel and even for mobile and touchscreen users
 */
function addMouseEvents() {
  for (let box in tdArray) {
    tdArray[box].addEventListener("mouseenter",e => {
    tdArray[box].style.backgroundImage = pieceArray[currPlayer];
  })
}
  for (let box in tdArray) {
    tdArray[box].addEventListener("mouseleave",e => {
    tdArray[box].style.backgroundImage = null;
    })
  }
}
function mouseEventsMobile() {
  for (let box in tdArray) {
      tdArray[box].classList.add("hover");
  }
}
/********* */

if (screen.width <= 699) {
  mouseEventsMobile();
  
} else {
  addMouseEvents();
}
