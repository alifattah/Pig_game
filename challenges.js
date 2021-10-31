/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player loses his ENTIRE score when he rolls two 6 in a row.
After that, it's the next player's turn.
(Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score,
so that they can change the predefined score of 100.
(Hint: you can read that value with the .value property in JavaScript.
This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now.
The player looses his current score when one of them is a 1.
(Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/


var scores, rondScore, activPlayer, gamePlaying;

init();

var lastDice;

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';


        // update the round score IF the rolled number was NOT a 1
        if (dice1 !== 1 && dice2 !== 1) {
            // add score
            rondScore += dice1 + dice2;
            document.querySelector('#current-' + activPlayer).textContent = rondScore;
        } else {
            // next player
            nextPlayer();
        }
        
        /*
        if (dice === 6 && lastDice === 6) {
            // player loses it's score
            scores[activPlayer] = 0;
            document.querySelector('#score-' + activPlayer).textContent = 0;
            nextPlayer();
        } else if (dice !== 1) {
            // add score
            rondScore += dice;
            document.querySelector('#current-' + activPlayer).textContent = rondScore;
        } else {
            // next player
            nextPlayer();
        
        }

        lastDice = dice;
        */
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if(gamePlaying) {
        // add current score to global score
        scores[activPlayer] += rondScore;

        // update the UI
        document.querySelector('#score-' + activPlayer).textContent = scores[activPlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore;
        
        // undefind, 0, null or "" are coerced to false
        // anything else is coerced to true
        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        // check if the player won the game
        if (scores[activPlayer] >= winningScore) {
            document.querySelector('#name-' + activPlayer).textContent = 'WINNER!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
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

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    gamePlaying = true;

    // stores the scores for both the player
    scores = [0,0];

    rondScore = 0;
    activPlayer = 0;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

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

