/* eslint-disable no-undef */
class Queen extends Piece {
  constructor(color, x, y, chessboard) {
    super("queen", color, x, y, chessboard);
    this.checkList = [[1, 0], [0, 1], [-1, 0], [0, -1], [1,1], [-1, 1], [-1, -1], [1, -1]];
  }
}