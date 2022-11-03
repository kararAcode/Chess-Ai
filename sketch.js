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

function setup() {
  createCanvas(windowWidth, windowHeight);
  chessboard = new ChessBoard();
}  

function draw() {
  background(220);
  chessboard.display();
  chessboard.displayPieces();

  if (activePiece !== null) {
    activePiece.showPossibleMoves();
  }
}


function mousePressed() {
  let x = Math.floor(mouseX/chessboard.cellWidth);
  let y = Math.floor(mouseY/chessboard.cellHeight);

  if (activePiece === null) {
    activePiece = chessboard.grid[y][x].piece;
  }

  if (activePiece !== null && chessboard.grid[y][x].color === "rgba(0, 208, 0, 0.5)") {
    activePiece.place(y, x);
    activePiece = null;
  }

}