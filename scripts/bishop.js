/* eslint-disable no-empty */
/* eslint-disable no-undef */
class Bishop extends Piece {
  constructor(color, x, y, chessboard) {
    super("bishop", color, x, y, chessboard);
  }

  showPossibleMoves() {
    fill("(210, 215, 211, 0.3)");
    for (let i = 1; i < 8 - this.x; i++) {
      if (!this.chessboard.grid[this.x+i][this.y+i].occupied) {
        
        // this.chessboard.grid[this.y][this.x].color = Number(!this.chessboard.grid[this.y][this.x].color);
        // // circle(this.chessboard.cellWidth * this.x + this.chessboard.cellWidth/2, this.chessboard.cellHeight * this.y + this.chessboard.cellHeight/2, this.chessboard.cellWidth/3);
      }
    }
  }
}