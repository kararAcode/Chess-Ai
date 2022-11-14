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
    if (this.inDanger) {
      console.log("Danger");
      this.chessboard.grid[this.x][this.y].color = "red";
    }

    else {
      this.chessboard.grid[this.x][this.y].color = (this.x+this.y) % 2 === 0 ? "rgb(238, 238, 210)": "rgb(118, 150, 86)";
    }

    image(this.img, width/2 - this.chessboard.cellWidth*4 + this.chessboard.cellWidth * this.y, this.chessboard.cellHeight * this.x, this.chessboard.cellWidth, this.chessboard.cellHeight);
  }

  move(i, j) {
    this.chessboard.grid[this.x][this.y].piece = null;
    this.chessboard.grid[this.x][this.y].occupied = false;
  
    if (this.chessboard.grid[i][j].occupied) {
      if (this.chessboard.grid[i][j].piece.name === "king") {
        // eslint-disable-next-line no-undef
        state = "gameover";
      }

      this.chessboard.grid[i][j].piece.delete(this.chessboard.pieces);
    }

      

    this.chessboard.grid[i][j].piece = this;
    this.chessboard.grid[i][j].occupied = true;

    
    

    this.x = i;
    this.y = j;
    moveSound.play();


    this.chessboard.detectDanger(this.chessboard.pieces);

  }

  makeMove(pieces, i, j) {
    if (this.find(pieces, i, j) && this.find(pieces, i, j).length !== 0) {
      this.find(pieces, i, j)[0].delete(pieces);
    }

    this.x = i;
    this.j = j;



  }

  getPossibleMoves() {
    let moves = [];

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
          moves.push({
            piece: this,
  
            to: {
              x: possibleX,
              y: possibleY
            }
          });        
        }

        i = 0;
        checkList.shift();

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
      

      i++;
    }

    

    return moves;
    
  }

  eliminateMoves(moves) {
    for (let i = 0; i < moves.length; i++) {
      let piecesCopy = _.cloneDeep(this.chessboard.pieces);
      let move = moves[i];
      let pieceToMove = _.cloneDeep(moves[i].piece);

      pieceToMove.makeMove(piecesCopy, move.to.x, move.to.y);
      let king = piecesCopy[pieceToMove.color].filter((piece) => {
        return piece.name === "king";
      })[0];

      if (king.inDanger) {

        moves.splice(i, 1);
      }

    

    }

    return moves;
  }

  showPossibleMoves() {
    let moves = this.getPossibleMoves();

    for (let i = 0; i < moves.length; i++) {
      let move = moves[i];
      let possibleX = moves[i].to.x;
      let possibleY = moves[i].to.y;

      this.chessboard.grid[possibleX][possibleY].color = "rgba(0, 208, 0, 0.5)";
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

  find(pieces, i, j) {
    if (this.color === "b") {
      return pieces["w"].filter((piece) => {
        return piece.x === i && piece.y === j;
      });
    }

    else {
      return pieces["b"].filter((piece) => {
        return piece.x === i && piece.y === j;
      });

    }
  }

  delete(pieces) {
    let index = this.chessboard.pieces[this.color].indexOf(this);
    pieces[this.color].splice(index, 1); // removes piece
  }

}

