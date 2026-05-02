import './css/style.css';
import Board from './js/Board';
import Goblin from './js/Goblin';
import goblinPng from './img/goblin.png';

const MAX_MISSES = 5;
let score = 0;
let misses = 0;
let gameInterval = null;
let isHitThisStep = false;

const board = new Board('board', 16);
const goblin = new Goblin(goblinPng);

const scoreEl = document.getElementById('score');
const missesEl = document.getElementById('misses');
const gameOverMessage = document.getElementById('game-over-text');

function updateUI() {
    scoreEl.textContent = score;
    missesEl.textContent = misses;
}


function stopGame() {
    clearInterval(gameInterval);
    if (goblin.element) goblin.element.remove();
    
    if (gameOverMessage) {
        gameOverMessage.textContent = `Игра окончена! Счёт: ${score}`;
        gameOverMessage.classList.remove('hidden');
    }
}

function nextStep() {
    if (document.body.contains(goblin.element) && !isHitThisStep) {
        misses++;
        updateUI();
    }

    if (misses >= MAX_MISSES) {
        stopGame();
        return;
    }

    isHitThisStep = false; 
    goblin.move(board.cells);
}

board.generateBoard();
updateUI();


board.container.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('character-img')) {
        score++;
        isHitThisStep = true;
        event.target.remove(); 
        updateUI();
        event.stopPropagation();
    }
});
gameInterval = setInterval(nextStep, 1000);
