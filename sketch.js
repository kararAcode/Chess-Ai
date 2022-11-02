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

  // if (activePiece !== null) {
  //   activePiece.showPossibleMoves();
  // }
}


function mousePressed() {
  let x = Math.floor(mouseX/chessboard.cellWidth);
  let y = Math.floor(mouseY/chessboard.cellHeight);

  console.log(y+1, x+1)
  chessboard.grid[y+1][x+1].color = "red"; 


}