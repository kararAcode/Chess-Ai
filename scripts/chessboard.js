/* eslint-disable no-undef */
/* eslint-disable indent */
/* eslint-disable no-empty */
class ChessBoard {
  constructor() {

    this.grid = [];
    
    this.cellWidth = windowWidth/8;
    this.cellHeight = windowHeight/8;

    

    if (this.cellWidth > this.cellHeight) {
      this.cellWidth = this.cellHeight;
    }

    else {
      this.cellHeight = this.cellWidth;
    }

    


    for (let i = 0; i < 8; i++) {
      let row = [];
      for (let j = 0; j < 8; j++) {
        row.push({
          occupied: null,
          piece: null,
          color: (i+j) % 2 === 0 ? "white": "black"
        });

      }

      this.grid.push(row);
    }

    this.whitePieces = this.generatePieces("w");
    this.blackPieces = this.generatePieces("b");
  }

  display() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        fill(this.grid[i][j].color);
        rect(this.cellWidth * j, this.cellHeight * i, this.cellWidth, this.cellHeight);
      }
    }
  }

  displayPieces() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.grid[i][j].piece !== null) {
          this.grid[i][j].piece.display();
        }
      }
    }
  }

  clear() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        this.grid[i][j].color = (i+j) % 2 === 0 ? "white": "black";
      }
    }
  }
  
  async generatePieces(color) {
    let pieces = [];
    let order = await [
      Array(8).fill(Pawn),
      [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook]
    ];

    if (color === "b") {
      for (let i = 0; i <= 1; i++) {
        for (let j = 0; j < 8; j++) {
          let piece = new order[Number(!i)][j]("b", i, j, this);
          pieces.push(piece);
          this.grid[i][j].occupied = true;
          this.grid[i][j].piece = piece;
          
        }
      }
    }

    else if (color === "w") {
      for (let i = 6; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          let piece = new order[i-6][j]("w", i, j, this);
          pieces.push(piece);
          this.grid[i][j].occupied = true;
          this.grid[i][j].piece = piece;
        }
      }
    }

    return pieces;

  }

}  
