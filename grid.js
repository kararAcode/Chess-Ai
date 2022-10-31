/* eslint-disable no-undef */
/* eslint-disable indent */
/* eslint-disable no-empty */
class ChessBoard {
  constructor() {
    this.colorGrid = [];

    this.cellWidth = windowWidth/8;
    this.cellHeight = windowHeight/8;


    this.whitePieces = this.generatePieces("w");
    this.blackPieces = this.generatePieces("b");

    if (this.cellWidth > this.cellHeight) {
      this.cellWidth = this.cellHeight;
    }

    else {
      this.cellHeight = this.cellWidth;
    }


    let n = 1;

    for (let i = 0; i < 8; i++) {
      let row = [];
      for (let j = 0; j < 8; j++) {
        if (j === 0 && i !== 0) {
          row.push(Number(!n));
        }

				else {
					row.push(n);
					n = Number(!n); 
				}
      }

      this.colorGrid.push(row);
    }
  }

  display() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        fill(this.colorGrid[i][j] * 255);
        rect(this.cellWidth * i, this.cellHeight * j, this.cellWidth, this.cellHeight);
      }
    }
  }

  displayPieces() {
    for (let n = 0; n < 16; n++) {
      this.whitePieces[n].display();
      this.blackPieces[n].display();
    }
  }
  
  generatePieces(color) {
    let pieces = [];
    let order = [
      Array(8).fill("pawn"),
      ["rook", "knight", "bishop", "king", "queen", "bishop", "knight", "rook"]
    ];
    console.log(order)

    if (color === "b") {
      for (let i = 0; i <= 1; i++) {
        for (let j = 0; j < 8; j++) {
          pieces.push(new Piece(order[Number(!i)][j], "b", i, j, this));
        }
      }
    }

    else if (color === "w") {
      for (let i = 6; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          pieces.push(new Piece(order[i-6][j], "w", i, j, this));
        }
      }
    }

    return pieces;

  }

  findPiece(x, y) {
    for (let i = 0; i < 16; i++) {
      if (this.whitePieces[i].x === x && this.whitePieces[i].y === y) {
        return this.whitePieces[i];
      } 
    }
  }
}  


