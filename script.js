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

    const currentRow = grid.children[currentAttempt];
    const cells = currentRow.children;
    const currentGuess = Array.from(cells).map(cell => cell.textContent).join('');

    if (key === 'ENTER') {
        if (currentGuess.length < 5) {
            alert('Please enter a 5-letter word.');
            return;
        }
        updateGrid();
        checkGameOver();
        currentAttempt++;
    } else if (key === 'BACKSPACE') {
        for (let i = cells.length - 1; i >= 0; i--) {
            if (cells[i].textContent !== '') {
                cells[i].textContent = '';
                break;
            }
        }
    } else if (currentGuess.length < 5) {
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].textContent === '') {
                cells[i].textContent = key;
                break;
            }
        }
    }
}

function updateGrid() {
    const currentRow = grid.children[currentAttempt];
    const cells = currentRow.children;
    const currentGuess = Array.from(cells).map(cell => cell.textContent).join('');

    for (let i = 0; i < currentGuess.length; i++) {
        cells[i].classList.add('flip');
        if (currentGuess[i] === currentWord[i]) {
            cells[i].classList.add('correct');
        } else if (currentWord.includes(currentGuess[i])) {
            cells[i].classList.add('incorrect');
        }
    }
}

function checkGameOver() {
    const currentRow = grid.children[currentAttempt];
    const cells = currentRow.children;
    const currentGuess = Array.from(cells).map(cell => cell.textContent).join('');

    if (currentGuess === currentWord) {
        gameOver = true;
        setTimeout(() => {
            alert('Congratulations! You guessed the word correctly!');
            showConfetti();
        }, 1000);
    } else if (currentAttempt === MAX_ATTEMPTS - 1) {
        gameOver = true;
        setTimeout(() => {
            alert(`Game over! The correct word was ${currentWord}.`);
        }, 1000);
    }
}

function showInstructions() {
    instructionsModal.style.display = 'block';
}

function hideInstructions() {
    instructionsModal.style.display = 'none';
}

function showConfetti() {
    const container = document.querySelector('.container');
    const numConfetti = 100;

    for (let i = 0; i < numConfetti; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(confetti);
    }
}

fetch('words.json')
    .then(response => response.json())
    .then(data => {
        const randomIndex = Math.floor(Math.random() * data.length);
        currentWord = data[randomIndex];
    });

createGrid();
createKeyboard();

instructionsButton.addEventListener('click', showInstructions);
closeButton.addEventListener('click', hideInstructions);
window.addEventListener('click', event => {
    if (event.target === instructionsModal) {
        hideInstructions();
    }
});
