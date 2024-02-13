// Selecting elements from the DOM
const submitBtn = document.getElementById('submitBtn'); // The submit button
const nameInput = document.getElementById('name'); // The input field for the user's name
const questionInput = document.getElementById('question'); // The input field for the user's question
const answerSection = document.getElementById('answerSection'); // The section where answers are displayed
const answerText = document.getElementById('answer'); // The paragraph within the answer section for displaying the answer

// Array of possible answers
const answers = [
    "Yes, definitely!",
    "No, certainly not.",
    "Ask again later.",
    "It's highly likely.",
    "I'm not sure.",
    "Without a doubt, yes.",
    "My sources say no.",
    "The outlook is good."
];

// Attach an event listener to the submit button
submitBtn.addEventListener('click', function() {
    const userName = nameInput.value; // Capture the user's name
    const userQuestion = questionInput.value; // Capture the user's question
    
    // Validate that a question has been entered
    if (userQuestion.trim() === '') {
        alert('Please enter a question.');
        return; // Exit the function if no question is entered
    }
    
    // Randomly select an answer from the array
    const randomIndex = Math.floor(Math.random() * answers.length);
    const randomAnswer = answers[randomIndex];
    
    // Personalize the answer if the user has entered their name
    const personalizedAnswer = userName.trim() ? `${userName}, ${randomAnswer}` : randomAnswer;
    
    // Display the answer in the answer section
    answerText.innerText = personalizedAnswer;
    answerSection.style.display = 'block'; // Make the answer section visible
});

submitBtn.addEventListener('click', function() {
    const userName = nameInput.value;
    const userQuestion = questionInput.value;
    if (userQuestion.trim() === '') {
        alert('Please enter a question.');
        return;
    }
    const randomIndex = Math.floor(Math.random() * answers.length);
    const randomAnswer = answers[randomIndex];
    const personalizedAnswer = userName.trim() ? `${userName}, ${randomAnswer}` : randomAnswer;
    answerText.innerText = personalizedAnswer;
    answerSection.style.display = 'block';

    // Scroll to the answer section smoothly
    answerSection.scrollIntoView({behavior: "smooth"});
});


