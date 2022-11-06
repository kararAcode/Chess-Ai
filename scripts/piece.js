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

  place(i, j) {

    this.x = i;
    this.y = j;
  }

  showPossibleMoves() {
    let i = 0;
    let checkList = this.checkList;
    while (checkList.length !== 0) {
      let xFactor = checkList[0][0];
      let yFactor = checkList[0][1];

      if (this.x + i * xFactor > 7 || this.x + i * xFactor < 0 || this.y + i * yFactor > 7 || this.y + i * yFactor < 0) {
    
        i = 0;
        checkList.shift();
      }

      else if (this.chessboard.grid[this.x+i * xFactor][this.y+i * yFactor].occupied) {
        if (this.chessboard.grid[this.x+i * xFactor][this.y+i * yFactor].piece.color !== this.color) {
          this.chessboard.grid[this.x+i * xFactor][this.y+i * yFactor].color = "rgba(0, 208, 0, 0.5)";
        }

        i = 0;
        checkList.shift();

      }

      else {
        this.chessboard.grid[this.x+i * xFactor][this.y+i * yFactor].color = "rgba(0, 208, 0, 0.5)";
      }
      

      i++;
    }
    
  }


}

