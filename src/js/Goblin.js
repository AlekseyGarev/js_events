export default class Goblin {
    constructor(imageSrc) {
        this.element = document.createElement('img');
        this.element.src = imageSrc;
        this.element.classList.add('character-img');
        this.element.alt = 'Гоблин';
        this.currentIndex = -1;
    }

    move(cells) {
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * cells.length);
        } while (nextIndex === this.currentIndex);

        this.currentIndex = nextIndex;
        cells[this.currentIndex].appendChild(this.element);
    }

    get currentPosition() {
        return this.currentIndex;
    }
}