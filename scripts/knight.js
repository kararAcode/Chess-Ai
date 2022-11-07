/* eslint-disable no-undef */
class Knight extends Piece {
  constructor(color, x, y, chessboard) {
    super("knight", color, x, y, chessboard);
    this.checkList = [[2, 1], [-2, -1], [-2, 1], [2, -1], [1, 2], [-1, -2], [-1, 2], [1, -2]];
  }

  showPossibleMoves() {
    for (let i = 0; i < this.checkList.length; i++) {
      let possibleX = this.x + this.checkList[i][0];
      let possibleY = this.y + this.checkList[i][1];
      
      if (!(possibleX > 7 || possibleX < 0 || possibleY > 7 || possibleY < 0)) {
        if (this.chessboard.grid[possibleX][possibleY].occupied) {
          if (this.chessboard.grid[possibleX][possibleY].piece.color !== this.color) {
            this.chessboard.grid[possibleX][possibleY].color = "rgba(0, 208, 0, 0.5)";
          }
        }

        else {
          this.chessboard.grid[possibleX][possibleY].color = "rgba(0, 208, 0, 0.5)";
        }

      }      
    
    }

  }
}