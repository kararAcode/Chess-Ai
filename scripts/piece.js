/* eslint-disable no-undef */
class Piece {
  constructor(name, color, x, y, chessboard) {
    this.name = name;
    this.color = color;
    this.img = loadImage(`assets/${color}_${name}.png`); // loads in image for piece
    this.x = x;
    this.y = y;
    this.chessboard = chessboard; 
  }
  
  display() {
    if (this.inDanger) { // highlights king in red whenever in danger
      this.chessboard.grid[this.x][this.y].color = "red";
    }

    else {
      this.chessboard.grid[this.x][this.y].color = (this.x+this.y) % 2 === 0 ? "rgb(238, 238, 210)": "rgb(118, 150, 86)";
    }

    image(this.img, width/2 - this.chessboard.cellWidth*4 + this.chessboard.cellWidth * this.y, this.chessboard.cellHeight * this.x, this.chessboard.cellWidth, this.chessboard.cellHeight);
  }

  move(i, j) {
    // empty current spot
    this.chessboard.grid[this.x][this.y].piece = null; 
    this.chessboard.grid[this.x][this.y].occupied = false;
  
    if (this.chessboard.grid[i][j].occupied) {
      if (this.chessboard.grid[i][j].piece.name === "king") {
        // eslint-disable-next-line no-undef
        state = "gameover";
      }

      this.chessboard.grid[i][j].piece.delete(this.chessboard.pieces);
    }

      
    // moves to different spot in grid
    this.chessboard.grid[i][j].piece = this;
    this.chessboard.grid[i][j].occupied = true;

    
    
    // keep track of x and y
    this.x = i;
    this.y = j;
    moveSound.play(); // plays a sound whenever a piece is moved


    this.chessboard.detectDanger(this.chessboard.pieces); // this function is used to highlight if the king is in danger after a move

  }

  makeMove(pieces, i, j) {
    // simulates a moves without showing it on the grid
    if (this.find(pieces, i, j) && this.find(pieces, i, j).length !== 0) {
      this.find(pieces, i, j)[0].delete(pieces);
    }

    this.x = i;
    this.j = j;



  }

  getPossibleMoves() {
    // this function works for the bishop, queen and rook
  
    let moves = [];

    let i = 1;
    let checkList = [...this.checkList]; // a checklist of the direction movesets

    while (checkList.length !== 0) {
      let xFactor = checkList[0][0];
      let yFactor = checkList[0][1];

      let possibleX = this.x + i * xFactor;
      let possibleY = this.y + i * yFactor;


      if (possibleX > 7 || possibleX < 0 || possibleY > 7 || possibleY < 0) {
        i = 0;
        checkList.shift(); // once we finish one direction, we move on to the next
        // it cuts off when you go off boundries
      }

      else if (this.chessboard.grid[possibleX][possibleY].occupied) {
        if (this.chessboard.grid[possibleX][possibleY].piece.color !== this.color) {
          // adds move to array
          // then cuts off this it arrives at a piece
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
      

      i++; // moves on to the next possibe square
    }

    

    return moves;
    
  }

  eliminateMoves(moves) {
    // I tried to eliminate "dangerous moves" when king was in check
    // this function does not work properly
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
    // shows all possibe moves gathered from getPossibleMoves()
    let moves = this.getPossibleMoves();

    for (let i = 0; i < moves.length; i++) {
      let move = moves[i];
      let possibleX = moves[i].to.x;
      let possibleY = moves[i].to.y;

      this.chessboard.grid[possibleX][possibleY].color = "rgba(0, 208, 0, 0.5)";
    }
  }

  checkSpot(x, y) {
    // checks if spot is valid
        
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
    // finds a piece based on location in grid
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
    // deletes itself from the board
    let index = this.chessboard.pieces[this.color].indexOf(this);
    pieces[this.color].splice(index, 1); // removes piece
  }

}

