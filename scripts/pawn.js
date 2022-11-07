/* eslint-disable no-undef */
class Pawn extends Piece {
  constructor(color, x, y, chessboard) {
    super("pawn", color, x, y, chessboard);
    this.dx;
    this.startX = this.x;
    this.firstTurn = true;

    if (this.startX === 1) {
      this.dx = 1;
    }

    else if (this.startX === 6) {
      this.dx = -1;
    }
  }

  showPossibleMoves() {

    this.showPossibleKills();
    
    if (this.x !== this.startX) {
      this.firstTurn = false;
    }
        
    if (this.checkSpot(this.x + this.dx, this.y)) {
      if (!this.chessboard.grid[this.x + this.dx][this.y].occupied) {
        this.chessboard.grid[this.x + this.dx][this.y].color = "rgba(0, 208, 0, 0.5)";
      }

    }

    if (this.checkSpot(this.x + this.dx * 2, this.y) && this.firstTurn) {
      if (!this.chessboard.grid[this.x + this.dx *2][this.y].occupied) {
        this.chessboard.grid[this.x + this.dx *2][this.y].color = "rgba(0, 208, 0, 0.5)";
      }    
    }

    
  }

  checkSpot(x, y) {  
    return !(x > 7 || x < 0 || y > 7 || y < 0);    
  }

  showPossibleKills() {
    if (this.checkSpot(this.x + this.dx, this.y + this.dx)) {
      if (this.chessboard.grid[this.x + this.dx][this.y + this.dx].occupied ) {
        if (this.chessboard.grid[this.x + this.dx][this.y + this.dx].piece.color !== this.color) { 
          this.chessboard.grid[this.x + this.dx][this.y + this.dx].color = "rgba(0, 208, 0, 0.5)";
        }
      }
    }

    if (this.checkSpot(this.x + this.dx, this.y - this.dx)) {
      if (this.chessboard.grid[this.x + this.dx][this.y - this.dx].occupied ) {
        if (this.chessboard.grid[this.x + this.dx][this.y - this.dx].piece.color !== this.color) { 
          this.chessboard.grid[this.x + this.dx][this.y - this.dx].color = "rgba(0, 208, 0, 0.5)";
        }
      }
    }

  }
  
}








