const MAX_ATTEMPTS = 6;
let currentAttempt = 0;
let currentWord = '';

const grid = document.getElementById('grid');
const guessInput = document.getElementById('guess-input');
const submitButton = document.getElementById('submit-button');

function createGrid() {
    for (let i = 0; i < MAX_ATTEMPTS; i++) {
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            grid.appendChild(cell);
        }
    }
}

function updateGrid() {
    const cells = grid.children;
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = '';
        cells[i].classList.remove('correct', 'incorrect');
    }

    const guess = guessInput.value.toUpperCase();
    for (let i = 0; i < guess.length; i++) {
        const cell = cells[currentAttempt * 5 + i];
        cell.textContent = guess[i];
        if (guess[i] === currentWord[i]) {
            cell.classList.add('correct');
        } else if (currentWord.includes(guess[i])) {
            cell.classList.add('incorrect');
        }
    }
}

fetch('words.json')
    .then(response => response.json())
    .then(data => {
        const randomIndex = Math.floor(Math.random() * data.length);
        currentWord = data[randomIndex];
    });

createGrid();

submitButton.addEventListener('click', () => {
    const guess = guessInput.value.toUpperCase();
    if (guess.length !== 5) {
        alert('Please enter a 5-letter word.');
        return;
    }

    updateGrid();
    guessInput.value = '';

    if (guess === currentWord) {
        alert('Congratulations! You guessed the word correctly!');
        location.reload();
    } else if (currentAttempt === MAX_ATTEMPTS - 1) {
        alert(`Game over! The correct word was ${currentWord}.`);
        location.reload();
    } else {
        currentAttempt++;
        guessInput.focus();
    }
});
