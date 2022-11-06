/* eslint-disable no-empty */
/* eslint-disable no-undef */
class Bishop extends Piece {
  constructor(color, x, y, chessboard) {
    super("bishop", color, x, y, chessboard);
    this.checkList = [[1,1], [-1, 1], [-1, -1], [1, -1]];
  }
}