// eslint-disable-next-line no-undef
class Rook extends Piece {
  constructor(color, x, y, chessboard) {
    super("rook", color, x, y, chessboard);
    this.checkList = [[1, 0], [0, 1], [-1, 0], [0, -1]];
  }
}
