/* eslint-disable no-undef */
/* eslint-disable no-empty */
// Chess-Ai
// Karar Al-Shanoon
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let chessboard;
let activePiece = null;

let turns = ["w", "b"];
let turn = 0;

let state = "start";

let playerBtn;
let aiBtn;
let takebackBtn;
let btnWidth = 180;
let btnHeight = 80;

let previousBoards = [];

let moveSound;

function preload() {
  moveSound = loadSound("assets/move-self.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  chessboard = new ChessBoard();
}  

function draw() {
  if (state === "start") {
    startScreen();
    userStartAudio();
  } 

  if (state === "play-normal" || state === "play-ai") {
    noStroke();
    background(255);
    chessboard.display();
    chessboard.displayPieces();
  
    if (activePiece !== null) {
      activePiece.showPossibleMoves();
    }

    

    takebackBtn = new Button(width*0.9-btnWidth/2, height/2-btnHeight/2, btnWidth, btnHeight, "black", "TakeBack", 10);

    takebackBtn.display();
    takebackBtn.onClick(() => {
      chessboard.grid = previousBoards[previousBoards.length - 1];
    });


  }

  if (state === "gameover" && activePiece === null) {
    displayGameOver();
  }

  
}

function startScreen() {
  background("black");
  

  stroke(255);
  playerBtn = new Button(width/2-btnWidth/2, height/2-btnHeight/2, btnWidth, btnHeight, "black", "Player vs Player", 10);

  playerBtn.display();
  playerBtn.onClick(() => {
    state = "play-normal";
  });

  aiBtn = new Button(width/2-btnWidth/2, height/2-btnHeight/2 + height*0.15, btnWidth, btnHeight, "black", "Player vs Computer", 10);

  aiBtn.display();
  aiBtn.onClick(() => {
    state = "play-ai";
  });
}

function displayGameOver() {
  background("white");
  textSize(50);
  textAlign(CENTER);    // centers text
  fill("black");

  if (turns[Number(!turn)] === "b") {
    text("BLACK WINS", width/2, height/2);
  } 

  else {
    text("WHITE WINS", width/2, height/2);
  }

}

async function mousePressed() {
  let x = Math.floor(mouseX/chessboard.cellWidth) - 4;
  let y = Math.floor(mouseY/chessboard.cellHeight);
  
  if (state === "play-normal") {
    
  
    if ((activePiece === null || chessboard.grid[y][x].piece && activePiece.color === chessboard.grid[y][x].piece.color) && chessboard.grid[y][x].occupied) {
      if (chessboard.grid[y][x].piece.color === turns[turn]) {
        activePiece = chessboard.grid[y][x].piece;
        chessboard.clear();
      }

      
    }
  
  
    if (activePiece !== null && chessboard.grid[y][x].color === "rgba(0, 208, 0, 0.5)") {
      
      previousBoards.push(_.cloneDeep(chessboard.grid));
      activePiece.move(y, x, state);
      
      activePiece = null;
      moveSound.play();

      turn = Number(!turn);
    
      chessboard.clear();
      
    }
  }

  if (state === "play-ai") {
    
  
  
    if ((activePiece === null || chessboard.grid[y][x].piece && activePiece.color === chessboard.grid[y][x].piece.color) && chessboard.grid[y][x].occupied) {
      if (chessboard.grid[y][x].piece.color === turns[turn] && chessboard.grid[y][x].piece.color === "w") {
        activePiece = chessboard.grid[y][x].piece;
        chessboard.clear();
      }

      
    }
  
  
    if (activePiece !== null && chessboard.grid[y][x].color === "rgba(0, 208, 0, 0.5)") {
    
      await activePiece.move(y, x, state);
      
      activePiece = null;
      moveSound.play();

      turn = 1;
    
      chessboard.clear();

      
      
    }

    if (turns[turn] === "b") {
      let moveArr = chessboard.minimaxRoot(chessboard.pieces, 3, 1);
      console.log(moveArr);
      let piece = moveArr.piece;

      if (piece.name === "pawn" || piece.name === "king" || piece.name === "knight"){
        piece.x-=2;
      }
      
      chessboard.grid[piece.x][piece.y].piece.move(moveArr.to.x, moveArr.to.y);
      turn = 0;
    }
  }
  
}




