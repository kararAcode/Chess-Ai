/* eslint-disable no-undef */
class Pawn extends Piece {
  constructor(color, x, y, chessboard) {
    super("pawn", color, x, y, chessboard);
    this.dx;
    this.startX = this.x;
    this.firstTurn = true; 

    // defines direction based on starting x
    if (this.startX === 1) {
      this.dx = 1;
    }

    else if (this.startX === 6) {
      this.dx = -1;
    }
  }

  getPossibleMoves() {
    let moves = [];

    // if we arent where we started that means we have already taken our first turn
    if (this.x !== this.startX) {
      this.firstTurn = false;
    }
        

    // checks if it can capture a piece diagonally
    if (this.checkSpot(this.x + this.dx, this.y + this.dx)) {
      if (this.chessboard.grid[this.x + this.dx][this.y + this.dx].occupied ) {
        if (this.chessboard.grid[this.x + this.dx][this.y + this.dx].piece.color !== this.color) { 
          moves.push({
            piece: this,
  
            to: {
              x: this.x + this.dx,
              y: this.y + this.dx
            }
          });         
        }
      }
    }

    if (this.checkSpot(this.x + this.dx, this.y - this.dx)) {
      if (this.chessboard.grid[this.x + this.dx][this.y - this.dx].occupied ) {
        if (this.chessboard.grid[this.x + this.dx][this.y - this.dx].piece.color !== this.color) { 
          moves.push({
            piece: this,
  
            to: {
              x: this.x + this.dx,
              y: this.y - this.dx
            }
          });         
        }
      }
    }

    // checks if it can move 1 square forward
    if (this.checkSpot(this.x + this.dx, this.y)) {
      if (!this.chessboard.grid[this.x + this.dx][this.y].occupied) {
        moves.push({
          piece: this,

          to: {
            x: this.x + this.dx,
            y: this.y
          }
        });       
      }

    }


    //moves 2 squares forward if first turn
    if (this.checkSpot(this.x + this.dx * 2, this.y) && this.firstTurn) {
      if (!this.chessboard.grid[this.x + this.dx *2][this.y].occupied && !this.chessboard.grid[this.x + this.dx][this.y].occupied ) {
        moves.push({
          piece: this,

          to: {
            x: this.x + this.dx * 2,
            y: this.y
          }
        });       
      }    
    }

    return moves;
  }

  checkSpot(x, y) {  
    return !(x > 7 || x < 0 || y > 7 || y < 0);    
  }

}








