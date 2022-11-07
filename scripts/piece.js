class Piece {
  constructor(name, color, x, y, chessboard) {
    this.name = name;
    this.color = color;
    this.img = loadImage(`assets/${color}_${name}.png`);
    this.x = x;
    this.y = y;
    this.chessboard = chessboard;
  }
  
  display() {
    image(this.img, width/2 - this.chessboard.cellWidth*4 + this.chessboard.cellWidth * this.y, this.chessboard.cellHeight * this.x, this.chessboard.cellWidth, this.chessboard.cellHeight);
  }

  place(i, j) {
    this.x = i;
    this.y = j;
  }

  showPossibleMoves() {
    let i = 1;
    let checkList = [...this.checkList];

    while (checkList.length !== 0) {
      let xFactor = checkList[0][0];
      let yFactor = checkList[0][1];

      let possibleX = this.x + i * xFactor;
      let possibleY = this.y + i * yFactor;


      if (possibleX > 7 || possibleX < 0 || possibleY > 7 || possibleY < 0) {
        i = 0;
        checkList.shift();
      }

      else if (this.chessboard.grid[possibleX][possibleY].occupied) {
        if (this.chessboard.grid[possibleX][possibleY].piece.color !== this.color) {
          this.chessboard.grid[possibleX][possibleY].color = "rgba(0, 208, 0, 0.5)";
        }

        i = 0;
        checkList.shift();

      }

      else {
        this.chessboard.grid[possibleX][possibleY].color = "rgba(0, 208, 0, 0.5)";
      }
      

      i++;
    }
    
  }

  checkSpot(x, y) {
    
        
    if (!(x > 7 || x < 0 || y > 7 || y < 0)) {
      if (this.chessboard.grid[x][y].occupied) {
        if (this.chessboard.grid[x][y].piece.color !== this.color) {
          return true;
        }
      }
  
      else {
        return true;
      }
  
    } 
    
    return false;
  }

}

