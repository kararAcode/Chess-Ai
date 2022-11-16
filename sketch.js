/* eslint-disable no-undef */
/* eslint-disable no-empty */
// Chess-Ai
// Karar Al-Shanoon
// Date
//
// Extra for Experts:
// I attempted to use the minimax algorithim for my "ai"

let chessboard;
let activePiece = null;


let turns = ["w", "b"]; // color is chosen from array based on turn
let turn = 0;

let state = "start";

// btn settings
let playerBtn;
let aiBtn;
let takebackBtn;


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
  // displays screen based on state

  if (state === "start") {
    startScreen();
    userStartAudio(); // start audio on input
  } 

  if (state === "play-normal" || state === "play-ai") {
    gameplay();
  }

  if (state === "gameover" && activePiece === null) {
    displayGameOver();
  }

  
}

function startScreen() {
  let btnWidth = 180;
  let btnHeight = 80;

  background("black");

  stroke(255);
  playerBtn = new Button(width/2-btnWidth/2, height/2-btnHeight/2, btnWidth, btnHeight, "black", "Player vs Player", 10); 

  playerBtn.display();
  // click on this button and a player vs player game will start
  playerBtn.onClick(() => {
    state = "play-normal";
  }); 

  aiBtn = new Button(width/2-btnWidth/2, height/2-btnHeight/2 + height*0.15, btnWidth, btnHeight, "black", "Player vs Computer", 10);

  aiBtn.display();
  // click on this button and a player vs "ai" game will start
  aiBtn.onClick(() => {
    state = "play-ai";
  });
}

function gameplay() {
  let btnWidth = 0.12 * width;
  let btnHeight = 0.08 * height;
  noStroke();
  background(255);
  chessboard.display(); // display the board/grid
  chessboard.displayPieces(); 

  if (activePiece !== null) {
    // highlights active piece and shows available moves
    activePiece.showPossibleMoves();
    chessboard.grid[activePiece.x][activePiece.y].color = "#e5de00";
  }

  


  takebackBtn = new Button(width*0.9-btnWidth/2, height/2-btnHeight/2, btnWidth, btnHeight, "black", "TakeBack", 10);

  takebackBtn.display();
  takebackBtn.onClick(() => {
    // whenever this button is pressed, a move is undone
    chessboard.grid = previousBoards[previousBoards.length - 1];
    chessboard.clear(); // clears the board from the possibemove colors
    turn = Number(!turn); 
    activePiece = null;
  });
}

function displayGameOver() {
  background("white");
  textSize(50);
  textAlign(CENTER);    // centers text
  fill("black");

  if (turns[Number(!turn)] === "b") { // we use !turn because after the winning move is performed it switches turns
    text("BLACK WINS", width/2, height/2); 
  } 

  else {
    text("WHITE WINS", width/2, height/2);
  }

}

async function mousePressed() {
  let x = Math.floor(mouseX/chessboard.cellWidth) - Math.round((width/2 - chessboard.cellWidth*4)/chessboard.cellWidth); // I have to factor in that the grid was offset by width/2 - chessboard.cellWidth*4 
  let y = Math.floor(mouseY/chessboard.cellHeight);
  
  if (state === "play-normal") {
    // logic for player vs player
  
    if ((activePiece === null || chessboard.grid[y][x].piece && activePiece.color === chessboard.grid[y][x].piece.color) && chessboard.grid[y][x].occupied) {
      if (chessboard.grid[y][x].piece.color === turns[turn]) {
        // when a piece is clicked and its your turn the piece is active/highlighted
        activePiece = chessboard.grid[y][x].piece;
        chessboard.clear();

      }

      
    }
  
  
    if (activePiece !== null && chessboard.grid[y][x].color === "rgba(0, 208, 0, 0.5)") {
      // moves to the possible spot clicked
      previousBoards.push(_.cloneDeep(chessboard.grid)); // adds a clone of the current grid to previousBoards 
      await activePiece.move(y, x); // await keyword makes sure this line is finished running before moving on
      
      // clear the board and switch turns
      activePiece = null;

      turn = Number(!turn);
    
      chessboard.clear();


      
    }
  }

  if (state === "play-ai") {
    // logic for player vs ai
  
    if ((activePiece === null || chessboard.grid[y][x].piece && activePiece.color === chessboard.grid[y][x].piece.color) && chessboard.grid[y][x].occupied) {
      if (chessboard.grid[y][x].piece.color === turns[turn] && chessboard.grid[y][x].piece.color === "w") { // white is the player so only its pieces will display possible spots
        activePiece = chessboard.grid[y][x].piece;
        chessboard.clear();
      }

      
    }
  
  
    if (activePiece !== null && chessboard.grid[y][x].color === "rgba(0, 208, 0, 0.5)") {

      activePiece.move(y, x);
      
      activePiece = null;
      moveSound.play();
    
      chessboard.clear();
      turn = 1;
      
    }

    if (turns[turn] === "b") {

      // a timeout is used since it would run instantly otherwise
      // this is to decrease confusion among the player(white)
      setTimeout(async() => {
        let move = chessboard.aiMove("b"); // generates a move object with pos data and which piece to be used
        let piece = move.piece; 
  
        
        
        await chessboard.grid[piece.x][piece.y].piece.move(move.to.x, move.to.y);
        turn = 0;
      }, 1000);
      chessboard.clear();
      
    }
  }
  
}

window.addEventListener("resize", () => {
  createCanvas(windowWidth, windowHeight);
  chessboard.init();
});



