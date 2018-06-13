// load music
// window.onload = function() {
//    document.all.sound.src = "tetris_dubstep.mp3";
// };

window.onload = function() {
   // document.all.sound = "audio/gameStart.ogg";
   document.all.sound;
   toggleModalStart();
};

let gameStartAudio = new Audio;
let clearRowSound = new Audio;
let collideSound = new Audio;
let gameOverSound = new Audio;
let moveSound = new Audio;
let rotateSound = new Audio;

gameStartAudio.src = "audio/gameStart.ogg"
clearRowSound.src = "audio/clearRow.ogg";
collideSound.src = "audio/collide.ogg";
gameOverSound.src = "audio/gameOver.ogg";
moveSound.src = "audio/move.ogg";
rotateSound.src = "audio/rotate.ogg";

// create constants
const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(30, 30);

// removes row
function removeRow() {
    let rowCount = 1;
    // check y row
    outer: for (let y = arena.length -1; y > 0; --y) {
         // check whether is there any 0 in any of the row
        for (let x = 0; x < arena[y].length; ++x) {
            if (arena[y][x] === 0) {
               // if there is 0s, then go back to outer (y for loop) 
               // and continue again
                continue outer;
            };
        };
        // if there is no 0s in the row,
        // set row as constant, splice removes/adds elements from array
        // splice(start, 0foradd/1forremove)[0 - selects index y row, as splice 
        // returns all the row from arena array]
        // .fill(0)-fillwith0s
        const row = arena.splice(y, 1)[0].fill(0);
        // bring empty row all the way to the top
        arena.unshift(row);
        // since we remove a row, need to offset the row
        y++;
        // console.log("value of y: " + y);
        clearRowSound.play();

        // 1 row 10 points, 2 rows 30 points, 3 rows 70 points, 4 rows 150 points.
        // player.score += rowCount * 10;
        rowCount *= 2;
        console.log("value of rowCount: " + rowCount);
        if (rowCount == 2) {
         player.score += 40;
        }
        else if (rowCount == 4) {
         player.score = player.score + 60;
        }
        else if (rowCount == 8) {
         player.score += 200;
        }
        else if (rowCount == 16) {
         player.score += 900;
        }
        updateScore();
    };

};




function collide(arena, player) {
   const [m, o] = [player.matrix, player.position];
   for (let y = 0; y < m.length; y++) {
      // m matrix, y index
      for (let x = 0; x < m[y].length; x++) {
         // m[y][x] - m matrix, y row, x column != 0, arena is not 0.
         // arena[y + o.y] - makes sure arena row exists
         // arena[y + o.y][x + o.x]) - makes sure arena column exists
         // o refers to offset - offset refers to the position of the piece
         // from point of origin (top left hand corner)
         // if no row exists, counts as collision also
         if (m[y][x] !== 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
            return true;
            collideSound.play();
         };
      };
   };
   return false;
};

// creates new matrix array filled with 0s.
function createMatrix(w, h) {
   const matrix = [];
   while (h--) {
      matrix.push(new Array(w).fill(0));
   }
   return matrix;
};

function createPiece(type)
{
    if (type === 'I') {
        return [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
        ];
    } else if (type === 'L') {
        return [
            [0, 2, 0],
            [0, 2, 0],
            [0, 2, 2],
        ];
    } else if (type === 'J') {
        return [
            [0, 3, 0],
            [0, 3, 0],
            [3, 3, 0],
        ];
    } else if (type === 'O') {
        return [
            [4, 4],
            [4, 4],
        ];
    } else if (type === 'Z') {
        return [
            [5, 5, 0],
            [0, 5, 5],
            [0, 0, 0],
        ];
    } else if (type === 'S') {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    } else if (type === 'T') {
        return [
            [0, 7, 0],
            [7, 7, 7],
            [0, 0, 0],
        ];
    }
};

// no value in 0, hence null;
const colors = [
    null,
    '#FF0D72',
    '#0DC2FF',
    '#0DFF72',
    '#F538FF',
    '#FF8E0D',
    '#FFE138',
    '#3877FF',
];

function draw() {
   context.fillStyle = "#000";
   context.fillRect(0, 0, canvas.width, canvas.height);
   // draw the arena again after collision (if value of array is not 0,
   // box will become red)
   drawMatrix(arena, {x: 0, y: 0});
   // draw position of piece
   drawMatrix(player.matrix, player.position);
};

function drawMatrix(matrix, offset) {
   matrix.forEach(function(row, y) {
      row.forEach(function(value, x) {
         if (value !== 0) {
            context.fillStyle = colors[value];
            context.fillRect(x + offset.x, y + offset.y, 1, 1);
            };
         });
      });
   };

// 2 seperate grids, one for canvas grid, one for the pieces
// merge the 2 grids into 1.
function merge(arena, player){
   player.matrix.forEach(function(row, y) {
      row.forEach(function(value, x) {
         if (value !== 0) {
            arena[y + player.position.y][x + player.position.x] = value;
         }
      });
   });
};

function playerDrop() {
   player.position.y++;
   // if collide, move back up 1 position, merge to record the location,
   // bring it back up all the way to the top
   if (collide(arena, player)) {
      player.position.y--;
      merge(arena, player);
      playerReset();
      removeRow();
      updateScore();
      player.position.y = 0;
   };
   dropCounter = 0;
};

// 
function playerMove(dir) {
   player.position.x += dir;
   if (collide(arena, player)) {
      player.position.x -= dir;
   }
};

function playerReset() {
   const pieces = 'JITLSZO';
   // random number from string
   player.matrix = createPiece(pieces[Math.floor(Math.random() * 7)]);
   // let position start from the top
   player.position.y = 0;
   // random x position
   player.position.x = 3 + (Math.floor(Math.random() * 4));
   // once loses, reset game by filling everything with 0s.
};


function playerRotate(dir) {
   const position = player.position.x;
   let offset = 1;
   rotate(player.matrix, dir);

   // make offset = 1, then -2, then 3....
   while (collide(arena, player)) {
      player.position.x += offset;
      offset = -(offset + offset);
      if (offset > 0 ) {
         offset = -(offset - 1);
      } else  {
         offset = -(offset + 1);
      };
      // prevent offset from going infinite
      if (offset > player.matrix[0].length) {
         // rotate back
         rotate(player.matrix, -dir);
         // reset offset
         player.position.x = position;
         return;
      };
   };
};


// rotate matrix
// transpose matrix first, then reverse
function rotate(matrix, dir) {
   for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < y; x++) {
         [
            matrix[x][y],
            matrix[y][x],
         ] = [
            matrix[y][x],
            matrix[x][y],
         ];
      }
   }

   if (dir > 0) {
      matrix.forEach(function(row) {
         // reverse transposed row
         row.reverse();
      })} else {
         // reverse transposed matrix
         matrix.reverse();
      };
   };


// 1 sec per drop

let dropCounter = 0;
let dropInterval = 100000000000;

let lastTime = 0;

function update(time = 0) {
   const deltaTime = time - lastTime;
   lastTime = time;
   // deltaTime adds up to 1 second, then activate player drop
   dropCounter += deltaTime;
   if (dropCounter > dropInterval) {
     playerDrop();
     moveSound.play();
   };
   // if game ends,
   if (collide(arena, player)) {
      arena.forEach(function(row) {
      row.fill(0)});
      // need to push it into an array
      player.highscore.push(player.score);
      updateHighScore();

      toggleModalEnd();

      gameOverSound.play();
      player.position.y = 0;
   }

   draw();
   requestAnimationFrame(update);
};

// update score to the score div
function updateScore() {
    document.getElementById('score').innerText = player.score;
};

function updateHighScore() {
   document.getElementById('highscore').innerText = Math.max.apply(null, player.highscore);
};

const arena = createMatrix(12, 20);

const player = {
   position : {x: 0, y : 0},
   matrix: null,
   score: 0,
   highscore: [0],
   // team: "",
   // opponent: "",
   // opponentPoints: 0,
};

document.addEventListener('keydown', function(event) {
   if (event.keyCode === 37) {
      playerMove(-1);
      moveSound.play();
   }
   else if (event.keyCode === 39) {
      playerMove(+1);
      moveSound.play();
   }
   else if (event.keyCode === 40) {
      playerDrop();
      moveSound.play();
   }
   else if (event.keyCode === 81) {
      playerRotate(-1);
      rotateSound.play();
   }
   else if (event.keyCode === 69) {
      playerRotate(1);
      rotateSound.play();
   }
});

document.addEventListener('keydown', function(event) {
   if (event.keyCode === 32) {
      dropInterval = 40;
      playerDrop();
      moveSound.play();
   }
});

document.addEventListener('keyup', function(event) {
   if (event.keyCode === 32) {
      dropInterval = 1000;
      playerDrop();
      moveSound.play();
   }
});

playerReset();
updateScore();
update();
updateHighScore();

function resetGame() {
      player.score = 0;
      updateScore();
      arena.forEach(function(row) {
      row.fill(0);
      player.position.y = 0;
      });
   };




// Code for rotating clockwise and anticlockwise
   // function rotateCounterClockwise(a){
   //      var n=a.length;
   //      for (var i=0; i<n/2; i++) {
   //          for (var j=i; j<n-i-1; j++) {
   //              var tmp=a[i][j];
   //              a[i][j]=a[j][n-i-1];
   //              a[j][n-i-1]=a[n-i-1][n-j-1];
   //              a[n-i-1][n-j-1]=a[n-j-1][i];
   //              a[n-j-1][i]=tmp;
   //          }
   //      }
   //      return a;
   //  }

   //  function rotateClockwise(a) {
   //      var n=a.length;
   //      for (var i=0; i<n/2; i++) {
   //          for (var j=i; j<n-i-1; j++) {
   //              var tmp=a[i][j];
   //              a[i][j]=a[n-j-1][i];
   //              a[n-j-1][i]=a[n-i-1][n-j-1];
   //              a[n-i-1][n-j-1]=a[j][n-i-1];
   //              a[j][n-i-1]=tmp;
   //          }
   //      }
   //      return a;
   //  }