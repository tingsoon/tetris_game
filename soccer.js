
// var soccerTeams = [
// {	
// 	team: "Brazil",
// 	attack: 5,
// 	defence: 5,
// },
// {	
// 	team: "England",
// 	attack: 4,
// 	defence: 4,
// },
// {	
// 	team: "Japan",
// 	attack: 3,
// 	defence: 3,
// },
// ];

// var playerAttackMultiplier = 4;
// var playerDefenceMultiplier = 4;
// var opponentAttackMultiplier = 3;
// var opponentDefenceMultiplier = 3;

// set player team
// if (player.team == "Brazil") {
// 	playerAttackMultiplier == 5;
// 	playerDefenceMultiplier == 5;
// }
// else if (player.team == "England") {
// 	playerAttackMultiplier == 4;
// 	playerDefenceMultiplier == 4;
// }
// else if (player.team == "Japan") {
// 	playerAttackMultiplier == 3;
// 	playerDefenceMultiplier == 3;
// };

// // set opponent team
// if (player.opponent == "Brazil") {
// 	opponentAttackMultiplier == 5;
// 	opponentDefenceMultiplier == 5;
// }
// else if (player.opponent == "England") {
// 	opponentAttackMultiplier == 4;
// 	opponentDefenceMultiplier == 4;
// }
// else if (player.opponent == "Japan") {
// 	opponentAttackMultiplier == 3;
// 	opponentDefenceMultiplier == 3;
// };


// players attempts goal for every 100 points
// function shootAtGoal() {
// 		var shoot = Math.floor(Math.random() * 6) + playerAttackMultiplier - opponentDefenceMultiplier;
// 		console.log("player shoot value is: " + shoot);
// 		if (shoot >=3) {
// 			player.soccerScore++;
// 			console.log("player score: " + player.soccerScore);
// 		}
// };

// // opponent shoots at goal every 30 seconds
// function opponentShootAtGoal() {
// 	var shoot = Math.floor(Math.random() * 6) + opponentAttackMultiplier - playerDefenceMultiplier;
// 	console.log("opponent shoot value is: " + shoot);
// 		if (shoot >=3) {
// 			player.opponentPoints+= 100;
// 			console.log("opponent score: " + player.opponentPoints);
// 		} else {
// 		console.log("opponent score: " + player.opponentPoints);
// 	};
// };


// function opponentTimerStart () {
// 	var opponentStart = setInterval(opponentShootAtGoal, 30000);

// 	// stop after 3 mins.
// 	function myStopFunction () {
// 		clearInterval(opponentStart);
// 	};
// 	setTimeout(myStopFunction, 180000);
// };

// opponentTimerStart();



// // set timer of 3 mins
// function startTimer(duration, display) {
//     var timer = duration;
//     var minutes;
//     var seconds;
//     setInterval(function () {
//         minutes = parseInt(timer / 60);
//         seconds = parseInt(timer % 60);

//         if (minutes < 10) {
//         	minutes = "0" + minutes;
//         } else {
//         	minutes = minutes;
//         };
//           if (seconds < 10) {
//         	seconds = "0" + seconds;
//         } else {
//         	seconds = seconds;
//         };
    
//         // minutes = minutes < 10 ? "0" + minutes : minutes;
//         // seconds = seconds < 10 ? "0" + seconds : seconds;

//         display.innerText = minutes + ":" + seconds;
        
//         if (--timer < 0) {
//             timer = duration;
//         }
//     }, 1000);
// };

// var dis =  document.getElementById('timeCounter');
// var timeStart = startTimer(180, dis);




// modal end

var modalEnd = document.querySelector(".modalEnd");
var trigger = document.querySelector(".trigger");
var closeButtonEnd = document.querySelector(".close-button-end");
var retry = document.querySelector('.retry-end');

// modal start

var modalStart = document.querySelector('.modalStart');
var startGameButton = document.querySelector('.game-start');

function toggleModalStart() {
	modalStart.classList.toggle('show-modal-start');
};

function toggleModalEnd() {
    modalEnd.classList.toggle("show-modal-end");
};

function windowOnClick(event) {
    if (event.target === modalEnd) {
        toggleModalEnd();
    };
    if (event.target === retry) {
    	resetGame();
    	toggleModalEnd();
    }
    if (event.target === startGameButton) {
    	updateInterval();
		resetGame();
		toggleModalStart();
		gameStartAudio.play();
	}
}

closeButtonEnd.addEventListener("click", toggleModalEnd);
window.addEventListener("click", windowOnClick);




// function windowOnClick(event) {
// 	if (event.target === startGameButton) {
// 		resetGame();
// 		toggleModalStart();
// 	}
// }













	




