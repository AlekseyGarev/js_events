export default class Board {
    constructor(containerId, size = 16) {
        this.container = document.getElementById(containerId);
        this.size = size;
        this.cells = [];
    }

    generateBoard() {
        this.container.innerHTML = '';
        for (let i = 0; i < this.size; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            this.container.appendChild(cell);
            this.cells.push(cell);
        }
    }

    getCell(index) {
        return this.cells[index];
    }

    get length() {
        return this.size;
    }
}