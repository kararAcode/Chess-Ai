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

  if (state === "play-normal") {
    noStroke();
    background(255);
    chessboard.display();
    chessboard.displayPieces();
  
    if (activePiece !== null) {
      activePiece.showPossibleMoves();
    }
  }

  if (state === "gameover" && activePiece === null) {
    displayGameOver();
  }

  
}

function startScreen() {
  background("black");
  let btnWidth = 180;
  let btnHeight = 80;

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

function mousePressed() {
  
  if (state === "play-normal") {
    let x = Math.floor(mouseX/chessboard.cellWidth) - 4;
    let y = Math.floor(mouseY/chessboard.cellHeight);
  
  
    if ((activePiece === null || chessboard.grid[y][x].piece && activePiece.color === chessboard.grid[y][x].piece.color) && chessboard.grid[y][x].piece.color === turns[turn]) {
      activePiece = chessboard.grid[y][x].piece;
      chessboard.clear();
    }
  
  
    if (activePiece !== null && chessboard.grid[y][x].color === "rgba(0, 208, 0, 0.5)") {
  
      chessboard.grid[activePiece.x][activePiece.y].piece = null;
      chessboard.grid[activePiece.x][activePiece.y].occupied = false;
  
      if (chessboard.grid[y][x].occupied) {
        if (chessboard.grid[y][x].piece.name === "king") {
          state = "gameover";
        }
      }
      
      chessboard.grid[y][x].piece = activePiece;
      chessboard.grid[y][x].occupied = true;
    
      activePiece.place(y, x);
      activePiece = null;
      moveSound.play();

      turn = Number(!turn);
    
      chessboard.clear();
      
    }
  }
  
}




window.addEventListener("resize", () => {
  setup();
  chessboard.init();
});