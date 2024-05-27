const MAX_ATTEMPTS = 5;
let currentAttempt = 0;
let currentWord = '';
let gameOver = false;

const grid = document.getElementById('grid');
const keyboard = document.getElementById('keyboard');
const instructionsButton = document.getElementById('instructions-button');
const instructionsModal = document.getElementById('instructions-modal');
const closeButton = document.getElementsByClassName('close')[0];

function createGrid() {
    for (let i = 0; i < MAX_ATTEMPTS; i++) {
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            grid.appendChild(cell);
        }
    }
}

function createKeyboard() {
    const keys = 'QWERTYUIOPASDFGHJKLZXCVBNM';
    keys.split('').forEach(key => {
        const keyElement = document.createElement('div');
        keyElement.classList.add('key');
        keyElement.textContent = key;
        keyElement.addEventListener('click', () => handleInput(key));
        keyboard.appendChild(keyElement);
    });
}

function handleInput(key) {
    if (gameOver) return;
