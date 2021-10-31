/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, rondScore, activPlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1.random number
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // 3.update the round score IF the rolled number was NOT a 1
        if (dice !== 1) {
            // add score
            rondScore += dice;
            document.querySelector('#current-' + activPlayer).textContent = rondScore;
        } else {
            // next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if(gamePlaying) {
        // add current score to global score
        scores[activPlayer] += rondScore;

        // update the UI
        document.querySelector('#score-' + activPlayer).textContent = scores[activPlayer];

        // check if the player won the game
        if (scores[activPlayer] >= 100) {
            document.querySelector('#name-' + activPlayer).textContent = 'WINNER!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activPlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activPlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // next player
            nextPlayer();
        }
    }  
});

function nextPlayer() {
    activPlayer === 0 ? activPlayer = 1 : activPlayer = 0;

    // if (activPlayer === 0) {
    //     activPlayer = 1;
    // } else {
    //     activPlayer = 0;
    // }

    rondScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // document.querySelector('.player-0-panel').classList.add('active');
    // document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    gamePlaying = true;

    // stores the scores for both the player
    scores = [0,0];

    rondScore = 0;
    activPlayer = 0;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

// document.querySelector('#current-' + activPlayer).textContent = dice;
// document.querySelector('#current-' + activPlayer).innerHTML = '<em>' + dice + '</em>';
// var x = document.querySelector('#score-0').textContent;
// console.log(x)
