const MAX_ATTEMPTS = 6;
let currentAttempt = 1;
let currentWord = '';

const guessInput = document.getElementById('guess-input');
const submitButton = document.getElementById('submit-button');
const feedbackDiv = document.getElementById('feedback');

fetch('words.json')
    .then(response => response.json())
    .then(data => {
        const randomIndex = Math.floor(Math.random() * data.length);
        currentWord = data[randomIndex];
    });

submitButton.addEventListener('click', () => {
    const guess = guessInput.value.toUpperCase();
    if (guess.length !== currentWord.length) {
        alert(`Please enter a ${currentWord.length}-letter word.`);
        return;
    }
    
    let feedback = '';
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === currentWord[i]) {
            feedback += `<span class="correct">${guess[i]}</span>`;
        } else if (currentWord.includes(guess[i])) {
            feedback += `<span class="incorrect">${guess[i]}</span>`;
        } else {
            feedback += `<span>${guess[i]}</span>`;
        }
    }
    
    feedbackDiv.innerHTML = feedback;
    guessInput.value = '';
    
    if (guess === currentWord) {
        alert('Congratulations! You guessed the word correctly!');
        location.reload();
    } else if (currentAttempt === MAX_ATTEMPTS) {
        alert(`Game over! The correct word was ${currentWord}.`);
        location.reload();
    } else {
        currentAttempt++;
    }
});
