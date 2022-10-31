class Piece {
  constructor(name, color, x, y, chessboard) {
    this.name = name;
    this.img = loadImage(`assets/${color}_${name}_2x_ns.png`);
    this.x = x;
    this.y = y;
    this.chessboard = chessboard;
    this.drag = false;
  }
  
  display() {

    if (this.drag) {
      image(this.img, mouseX, mouseY, this.chessboard.cellWidth, this.chessboard.cellHeight);
    }

    else{
      image(this.img, this.chessboard.cellWidth * this.y, this.chessboard.cellHeight * this.x, this.chessboard.cellWidth, this.chessboard.cellHeight);
  
  

    }
  }
}