/* eslint-disable no-undef */
class King extends Piece {
  constructor(color, x, y, chessboard) {
    super("king", color, x, y, chessboard);
    this.inDanger = false;
    this.checkList = [[1, 0], [0, 1], [-1, 0], [0, -1], [1,1], [-1, 1], [-1, -1], [1, -1]]; // contains all the directions it can go
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
              piece: this,
        
    
              to: {
                x: possibleX,
                y: possibleY
              }
            });           
          }
        }
  
        else {
          moves.push({
            piece: this,
  
  
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