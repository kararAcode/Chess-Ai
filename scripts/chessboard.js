/* eslint-disable no-undef */
/* eslint-disable indent */
/* eslint-disable no-empty */


class ChessBoard {
  constructor() {

    this.grid = [];

    this.turns = ["w", "b"];
    this.turn = 0;
    
    this.cellWidth = width/8;
    this.cellHeight = height/8;

    

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
          color: (i+j) % 2 === 0 ? "rgb(238, 238, 210)": "rgb(118, 150, 86)"
        });

      }

      this.grid.push(row);
    }

    this.whitePieces = this.generatePieces("w");
    this.blackPieces = this.generatePieces("b");

    this.pieces = {
      "w": this.whitePieces, 
      "b": this.blackPieces
    };
  }

  display() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        fill(this.grid[i][j].color);
        rect(width/2 - this.cellWidth*4 + this.cellWidth * j, this.cellHeight * i, this.cellWidth, this.cellHeight);
      }
    }
  }

  init() {
    this.cellWidth = width/8;
    this.cellHeight = height/8;

    

    if (this.cellWidth > this.cellHeight) {
      this.cellWidth = this.cellHeight;
    }

    else {
      this.cellHeight = this.cellWidth;
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
        if (this.grid[i][j].occupied) {
          if (this.grid[i][j].piece.name === "king" && this.grid[i][j].piece.inDanger) {
            continue;
          }
        }

        this.grid[i][j].color = (i+j) % 2 === 0 ? "rgb(238, 238, 210)": "rgb(118, 150, 86)";
        

      }
    }
  }
  
  generatePieces(color) {
    let pieces = [];
    let order = [
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

  detectDanger(pieces) {

    for (let n = 0; n < 2; n++) {

    
      let moves = this.getAllPossibleMoves(pieces, turns[n]);
      let kingPiece = pieces[turns[n]].filter(piece => {
        return piece.name === "king";
      })[0];

      for (let i = 0; i < moves.length; i++) {
        let x = moves[i].to.x;
        let y = moves[i].to.y;

        if (this.grid[x][y].occupied) {
          if (this.grid[x][y].piece.name === "king") {
            this.grid[x][y].piece.inDanger = true;
            return;
          }
        }    


      }

      this.grid[kingPiece.x][kingPiece.y].piece.inDanger = false;
      
    
    }
    

  }

  getAllPossibleMoves(pieces, color) {
    let moves = [];
    for (let i = 0; i < pieces[color].length; i++) {
      let piece = pieces[color][i];
      let pieceMoves = piece.getPossibleMoves();

      if (pieceMoves !== undefined) {
        moves.push(...pieceMoves);
      }

    }

    return moves;
  }

  minimaxRoot(pieces, depth, isMaximizing) {
    let maxEval = -Infinity;
    let bestMove;
    let piecesCopy = _.cloneDeep(pieces);

    let moves = this.getAllPossibleMoves(piecesCopy);


    for (let i = 0; i < moves.length; i++) {
      let move = moves[i];
      move.piece.makeMove(piecesCopy, move.to.x, move.to.y);

      let evaL = this.miniMax(piecesCopy, depth-1, false, -Infinity, Infinity); 

      if (evaL >= maxEval) {
        maxEval = eval;
        bestMove = moves[i];
      }

    }

    return bestMove;
  
  }

  miniMax(pieces, depth, isMaximizing, alpha, beta) {
    let piecesCopy = _.cloneDeep(pieces);

    if (depth === 0) { 
      return this.evaluateBoard(piecesCopy);
    }

    if (isMaximizing) {
      let evaL = -Infinity;
      
  
      let moves = this.getAllPossibleMoves(piecesCopy);

      for (let i = 0; i < moves.length; i++) {
        let move = moves[i];
        move.piece.makeMove(piecesCopy, move.to.x, move.to.y);

        evaL = this.miniMax(piecesCopy, depth-1, false, alpha, beta); 
        alpha = Math.max(alpha, evaL);

        if (beta <= alpha) {
          break;
        }

      }

      return evaL;
    }

    else {
      
  
      let evaL = Infinity;
      let moves = this.getAllPossibleMoves(piecesCopy);

      for (let i = 0; i < moves.length; i++) {
        let move = moves[i];
        move.piece.makeMove(piecesCopy, move.to.x, move.to.y);

        evaL = this.miniMax(piecesCopy, depth-1, true, alpha, beta); 
        beta = Math.min(beta, evaL);

        if (beta <= alpha) {
          break;
        }
      }

      return evaL;
    }



  }

  evaluateBoard(pieces) {

    let total = 0;
    let values = {
      "pawn": {
        score: 10,
        evalArr: [
          [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
          [5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
          [1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
          [0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
          [0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
          [0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
          [0.5,  1.0, 1.0,  -2.0, -2.0,  1.0,  1.0,  0.5],
          [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
        ]
  
      },
      "knight": {
        score: 30,
        evalArr: [
          [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
          [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
          [-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
          [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
          [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
          [-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
          [-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
          [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
        ]
      },
      "bishop": {
        score: 30,
        evalArr: [
          [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
          [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
          [ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
          [ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
          [ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
          [ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
          [ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
          [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
        ]
      },

      
      "rook": {
        score: 50,
        evalArr: [
          [  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
          [  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
          [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
          [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
          [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
          [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
          [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
          [  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
        ]
      },
      "queen": {
        score: 90,
        evalArr: [
          [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
          [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
          [ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
          [ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
          [  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
          [ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
          [ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
          [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
        ]
      },
      "king": {
        score: 900,
        evalArr: [
          [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
          [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
          [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
          [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
          [ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
          [ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
          [  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0 ],
          [  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0 ]
        ]
      },
    };

    for (let i  = 0; i < pieces["b"].length; i++) {
      let piece = pieces["b"][i];
      total += values[piece.name].score + values[piece.name].evalArr.slice().reverse()[piece.x][piece.y];
    }
    
    for (let j = 0; j < pieces["w"].length; j++) {
      let piece = pieces["w"][j];
      total -=  values[piece.name].score + values[piece.name].evalArr[piece.x][piece.y];
    }
    

    return total;
  }

}  

