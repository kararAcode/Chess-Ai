class Piece {
  constructor(name, color, x, y, chessboard) {
    this.name = name;
    this.color = color;
    this.img = loadImage(`assets/${color}_${name}_2x_ns.png`);
    this.x = x;
    this.y = y;
    this.chessboard = chessboard;
  }
  
  display() {
    image(this.img, this.chessboard.cellWidth * this.y, this.chessboard.cellHeight * this.x, this.chessboard.cellWidth, this.chessboard.cellHeight);
  }
}