/* eslint-disable no-empty */
// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let chessboard;

function setup() {
  createCanvas(windowWidth, windowHeight);
  chessboard = new ChessBoard();

}  

function draw() {
  background(220);
  chessboard.display();
  chessboard.displayPieces();
}


function mousePressed() {
  let x = Math.floor(mouseX/chessboard.cellWidth);
  let y = Math.floor(mouseY/chessboard.cellHeight);

  let piece = chessboard.findPiece(y, x);
  
  if (piece.drag) {
    piece.x = y;
    piece.y = x;
    piece.drag = false;
  }

  else {
    piece.drag = true;
  }


}