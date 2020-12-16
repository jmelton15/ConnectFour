/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */


const pieceArray = [
  'url("Images/YellowPiece.png")',
  'url("Images/RedPiece.png")'
];


var WIDTH = 7;
var HEIGHT = 6;

var currPlayer = 1; // active player: 1 or 2
var board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
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
  for (let i = HEIGHT-1; i > 0; i--){
    if (board[i][x] !== 1 && board[i][x] !== 2) {
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
  if (currPlayer === 1 ) {
    htmlBoard.rows[y+1].cells[x].style.backgroundImage = "url('Images/YellowPiece.png')";
  }
  if (currPlayer === 2) {
    htmlBoard.rows[y+1].cells[x].style.backgroundImage = "url('Images/RedPiece.png')";
  }
}

/** endGame: announce game end */

function endGame(msg) {
  setTimeout(() => {alert(msg),1000;});
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

  // check for win
  if (checkForWin()) {
    htmlBoard.rows[0].removeEventListener("click", handleClick);
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  if (currPlayer === 1) {
    currPlayer++;
  }
  else {
    currPlayer--;
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

for (let box in tdArray) {
  tdArray[box].addEventListener("mouseenter",e => {
    tdArray[box].style.backgroundImage = pieceArray[currPlayer-1];
})
}
for (let box in tdArray) {
    tdArray[box].addEventListener("mouseleave",e => {
      tdArray[box].style.backgroundImage = null;
  })
}


