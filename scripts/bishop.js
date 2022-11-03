/* eslint-disable no-empty */
/* eslint-disable no-undef */
class Bishop extends Piece {
  constructor(color, x, y, chessboard) {
    super("bishop", color, x, y, chessboard);
  }

  showPossibleMoves() {
    for (let i = 1; i < 7; i++) {

      if (!(this.x + i > 7) && !(this.y + i > 7)) {

        if (this.chessboard.grid[this.x+i][this.y+i].occupied) {
          if (this.chessboard.grid[this.x+i][this.y+i].piece.color !== this.color) {
            this.chessboard.grid[this.x+i][this.y+i].color = "rgba(0, 208, 0, 0.5)";
          }
          break;
        }

        else {
          this.chessboard.grid[this.x+i][this.y+i].color = "rgba(0, 208, 0, 0.5)";
        }
      }
    }

    for (let i = 1; i < 7; i++) {

      if (!(this.x - i < 0) && !(this.y + i > 7)) {

        if (this.chessboard.grid[this.x-i][this.y+i].occupied) {
          if (this.chessboard.grid[this.x-i][this.y+i].piece.color !== this.color) {
            this.chessboard.grid[this.x-i][this.y+i].color = "rgba(0, 208, 0, 0.5)";
          }
          break;
        }

        else {
          this.chessboard.grid[this.x-i][this.y+i].color = "rgba(0, 208, 0, 0.5)";
        }
      
      }
    }

    for (let i = 1; i < 7; i++) {

      if (!(this.x + i > 7) && !(this.y - i < 0)) {
       

        if (this.chessboard.grid[this.x+i][this.y-i].occupied) {
          if (this.chessboard.grid[this.x+i][this.y-i].piece.color !== this.color) {
            this.chessboard.grid[this.x+i][this.y-i].color = "rgba(0, 208, 0, 0.5)";
          }
          break;
        }

        else {
          this.chessboard.grid[this.x+i][this.y-i].color = "rgba(0, 208, 0, 0.5)";
        }

      }
      
    }
    
    for (let i = 1; i < 7; i++) {
      if (!(this.x - i < 0) && !(this.y - i < 0)) {

        if (this.chessboard.grid[this.x-i][this.y-i].occupied) {
          if (this.chessboard.grid[this.x-i][this.y-i].piece.color !== this.color) {
            this.chessboard.grid[this.x-i][this.y-i].color = "rgba(0, 208, 0, 0.5)";
          }
          break;
        }

        else {
          this.chessboard.grid[this.x-i][this.y-i].color = "rgba(0, 208, 0, 0.5)";
        }
      
      }
      
    }
    
  }
}