/* eslint-disable no-undef */
class Knight extends Piece {
  constructor(color, x, y, chessboard) {
    super("knight", color, x, y, chessboard);
    this.checkList = [[2, 1], [-2, -1], [-2, 1], [2, -1], [1, 2], [-1, -2], [-1, 2], [1, -2]];
  }

  getPossibleMoves() {
    let moves = [];

    for (let i = 0; i < this.checkList.length; i++) {
      let possibleX = this.x + this.checkList[i][0];
      let possibleY = this.y + this.checkList[i][1];
      
      if (!(possibleX > 7 || possibleX < 0 || possibleY > 7 || possibleY < 0)) {
        if (this.chessboard.grid[possibleX][possibleY].occupied) {
          if (this.chessboard.grid[possibleX][possibleY].piece.color !== this.color) {
            moves.push({
              from : {
                x: this.x,
                y: this.y
              },
    
              to: {
                x: possibleX,
                y: possibleY
              }
            }); 
          }
        }

        else {
          moves.push({
            from : {
              x: this.x,
              y: this.y
            },
  
            to: {
              x: possibleX,
              y: possibleY
            }
          }); 
        }

      }      
    
    }

    return moves;

  }

  
}