/* eslint-disable no-undef */
/* eslint-disable no-empty */
// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let chessboard;
let activePiece = null;

let turns = ["w", "b"];
let turn = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  chessboard = new ChessBoard();
}  

function draw() {
  background(255);
  chessboard.display();
  chessboard.displayPieces();

  if (activePiece !== null) {
    activePiece.showPossibleMoves();
  }
}


function mousePressed() {
  
  let x = Math.floor(mouseX/chessboard.cellWidth);
  let y = Math.floor(mouseY/chessboard.cellHeight);


  if ((activePiece === null || chessboard.grid[y][x].piece && activePiece.color === chessboard.grid[y][x].piece.color) && chessboard.grid[y][x].piece.color === turns[turn]) {
    activePiece = chessboard.grid[y][x].piece;
    chessboard.clear();
  }


  if (activePiece !== null && chessboard.grid[y][x].color === "rgba(0, 208, 0, 0.5)") {

    chessboard.grid[activePiece.x][activePiece.y].piece = null;
    chessboard.grid[activePiece.x][activePiece.y].occupied = false;

    chessboard.grid[y][x].piece = activePiece;
    chessboard.grid[y][x].occupied = true;

    activePiece.place(y, x);
    activePiece = null;
    turn = Number(!turn);

    chessboard.clear();
  }

}