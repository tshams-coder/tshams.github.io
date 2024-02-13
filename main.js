function askEightBall() {
  let userName = document.getElementById("userName").value; 
  let userQuestion = document.getElementById("userQuestion").value;

let randomNumber = Math.floor(Math.random() * 8); // Generates a random number between 0 and 7
let eightBall = ''; // Initializes eightBall with an empty string

// Control flow to assign a reply to eightBall based on randomNumber
switch (randomNumber) {
 case 0:
  eightBall = 'It is certain';
  break;
 case 1:
  eightBall = 'It is decidedly so';
  break;
 case 2:
  eightBall = 'Reply hazy try again';
  break;
 case 3:
  eightBall = 'Cannot predict now';
  break;
 case 4:
  eightBall = 'Do not count on it';
  break;
 case 5:
  eightBall = 'My sources say no';
  break;
 case 6:
  eightBall = 'Outlook not so good';
  break;
 case 7:
  eightBall = 'Signs point to yes';
  break;
}

  // Optionally personalize the answer
  if (userName) {
    eightBall = `${userName}, ${eightBall}`; 
  }

  // 1. Hide the containers
  document.querySelector(".container").classList.add("hidden");
  document.querySelector(".answer-container").classList.add("hidden"); 

  // 2. Display the answer prominently (modify this if needed)
  document.getElementById("eightBallAnswer").textContent = eightBall; 
}
