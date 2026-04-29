import './css/style.css';
import goblinPng from "./img/goblin.png";

class GoblinGame {
    constructor(boardId, size = 16) {
        this.board = document.getElementById(boardId);
        if (!this.board) throw new Error('Игровое поле не найдено!');
        
        this.size = size;
        this.cells = [];
        this.goblin = null;
        this.currentIndex = -1;
        this.score = 0;
        this.misses = 0;
        this.intervalId = null;

        this.scoreEl = document.getElementById('score');
        this.missesEl = document.getElementById('misses');

        this.init();
    }

    init() {
        
        this.board.innerHTML = '';
        
        for (let i = 0; i < this.size; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', () => this.handleHit(i));
            this.board.append(cell);
            this.cells.push(cell);
        }

        this.goblin = document.createElement('img');
        this.goblin.src = goblinPng;
        this.goblin.classList.add('character-img');
    }

    updateUI() {
        if (this.scoreEl) this.scoreEl.textContent = this.score;
        if (this.missesEl) this.missesEl.textContent = this.misses;
    }

    handleHit(index) {
        if (index === this.currentIndex) {
            this.score++;
            this.goblin.remove(); 
            this.currentIndex = -1; 
            this.updateUI();
            console.log(`Попал! Баллы: ${this.score}`);
        }
    }

    moveGoblin() {
        if (this.board.contains(this.goblin)) {
            this.misses++;
            this.updateUI();
            console.log(`Пропуск! Всего: ${this.misses}`);
        }

        if (this.misses >= 5) {
            this.stop();
            setTimeout(() => alert(`Игра окончена! Счет: ${this.score}`), 50);
            return;
        }

        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * this.size);
        } while (nextIndex === this.currentIndex);

        this.currentIndex = nextIndex;
        this.cells[this.currentIndex].append(this.goblin);
    }

    start() {
        this.moveGoblin();
        this.intervalId = setInterval(() => this.moveGoblin(), 1000);
    }

    stop() {
        clearInterval(this.intervalId);
        if (this.goblin) this.goblin.remove();
    }
}


const game = new GoblinGame('board');
game.start();