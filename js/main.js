// coloring the game title in main menu
const textElement = document.getElementById('gameName');
const text = textElement.textContent;
const colorsPalette = ['rgb(255, 65, 54)', 'rgb(0, 116, 217)', 'rgb(46, 204, 64)', 'rgb(255, 220, 0)', 'white'];
let styledText = '';
for (let i = 0; i < text.length; i++) {
  let colorIndex = i % colorsPalette.length;
  const span = `<span style="color: ${colorsPalette[colorIndex]}">${text[i]}</span>`;
  styledText += span;
}
textElement.innerHTML = styledText;

// share the fun function
document.getElementById("share").addEventListener("click", shareTheFun);
function shareTheFun() {
    const message = "Hey there! I just played this incredible game called Copycat Simons' Symphony. It's so addictive and challenging! You've got to check it out. Here's the link: [game link].";
    
    // Create a temporary input element
    const input = document.createElement('input');
    input.value = message;
    document.body.appendChild(input);
    
    // Copy the message to clipboard
    input.select();
    document.execCommand('copy');
    
    // Remove the temporary input element
    document.body.removeChild(input);
    
    // Display the toast notification
    const toastHTML = `
      <div id="notification">
        <div class="notification-container" aria-live="polite" aria-atomic="true">
          <div class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
              <strong class="me-auto">Copycat Simons' Symphony</strong>
              <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body text-black">
              Share Message copied to clipboard!
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Insert the toast notification HTML into the "notification" div
    const notificationDiv = document.getElementById("notification");
    notificationDiv.innerHTML = toastHTML;
    
    // Add position: fixed to the .notification-container
    const notificationContainer = notificationDiv.querySelector('.notification-container');
    if (notificationContainer) {
      notificationContainer.style.position = 'fixed';
    }
  
    // Remove the toast notification 
    setTimeout(function () {
      notificationDiv.innerHTML = '';
    }, 5000);
  }

////////////////////////////////////////////////////////////////// screen visability logic

// Hide all other screens initially
document.getElementById("countDownScreen").style.visibility = "hidden";
document.getElementById("gamePlayScreen").style.visibility = "hidden";
document.getElementById("scoreScreen").style.visibility = "hidden";
document.getElementById("congratulationsScreen").style.visibility = "hidden";
document.getElementById("scoreboardScreen").style.visibility = "hidden";

// Get the Play button element
const playButton = document.getElementById("Play");

// Add event listener for the click event
playButton.addEventListener("click", startCounterAndShowGame);

// show the count down screen, count down, and show gamePlayScreen
function startCounterAndShowGame() {
  // Show the gamePlayScreen underneath the countdown screen
  const gamePlayScreen = document.getElementById("gamePlayScreen");
  gamePlayScreen.style.visibility = "visible";

  // Hide the main menu screen
  const mainMenuScreen = document.getElementById("mainMenuScreen");
  mainMenuScreen.style.visibility = "hidden";

  // Show the countdown screen
  const countdownScreen = document.getElementById("countDownScreen");
  countdownScreen.style.visibility = "visible";

  // Play the countdown sound
  const audio = new Audio('assets/Audio/simpleGameCountdown.wav');
  audio.play();

  // Define the countdown numbers
  const countDownArray = ['3','2','1', 'Go'];

  // Define a separate function for the setTimeout logic
  function runCountdown(index) {
    setTimeout(() => {
      // Update the text inside countDownNumbers
      const countDownElement = document.getElementById('countDownNumbers');
      countDownElement.textContent = countDownArray[index];

      // Hide the countDownScreen after the last countdown number
      if (index === countDownArray.length - 1) {
        countdownScreen.style.visibility = 'hidden';
          // Start the game by calling addAndPlay initially
          addAndPlay();
      }
    }, (index + 1) * 1000); // Delay between countdown numbers
  }

  // Iterate over the countDownArray
  for (let i = 0; i < countDownArray.length; i++) {
    runCountdown(i);
  }


}

//////////////////// Capturing and validating player input against the generated sequences.

let gameStatus = true;
let currentScore = 0;
let sequence = [];
let userSeq = [];

function addAndPlay() {
  const randomChoice = Math.floor(Math.random() * 4) + 1;
  sequence.push(randomChoice);
  playSequence();
  setUpEventListener();
}
function playSequence() {
  for (let i = 0; i < sequence.length; i++) {
    const quarterElement = document.getElementById(`quarter${sequence[i]}`);
    setTimeout(() => {
      quarterElement.style.filter = "brightness(2.5)";
      const audio = new Audio(`assets/Audio/sound${sequence[i]}.mp3`);
      audio.play();
      setTimeout(() => {
        quarterElement.style.filter = "";
      }, 500);
    }, 700 * (i + 1));
  }
}

function setUpEventListener() {
  const quarters = document.getElementsByClassName("quarter");
  for (let i = 0; i < quarters.length; i++) {
    quarters[i].addEventListener("click", handleUserInput);
  }
}

function compareSequences() {
  const lastIndex = userSeq.length - 1;
  if (userSeq[lastIndex] === sequence[lastIndex]) {
    currentScore++;
    checkHighScore();
    if (lastIndex === sequence.length - 1) {
      // Player completed the sequence, add a new choice
      setTimeout(() => {
        userSeq = []; // Clear the user sequence
        addAndPlay();
      }, 1000); // Delay before adding the next choice
    }
  } else {
    gameStatus = false;
    // Game over, show the score screen or perform other actions
    showScoreScreen();
    
  }
}

function showScoreScreen() {
  // Show the score screen
  const scoreScreen = document.getElementById("scoreScreen");
  scoreScreen.style.visibility = "visible";
  // Wait for 3 seconds before hiding the score screen and showing the scoreboard screen
  setTimeout(() => {
    // Hide the score screen
    scoreScreen.style.visibility = "hidden";
    // Show the scoreboard screen
    const scoreboardScreen = document.getElementById("scoreboardScreen");
    scoreboardScreen.style.visibility = "visible";
  }, 3000);
}

function checkHighScore() {
  const currentScoreElements = document.querySelectorAll(".currentScore");
  const highScoreElements = document.querySelectorAll(".highScore");

  // Update the currentScore elements
  currentScoreElements.forEach(element => {
    element.textContent = currentScore;
  });

  // Update the highScore elements if necessary
  highScoreElements.forEach(element => {
    const highScore = element.textContent;
    if (currentScore > highScore) {
      element.textContent = currentScore;
    }
  });
}


function handleUserInput(event) {
  if (gameStatus) {
    const clickedQuarter = event.target;
    const quarterIndex = parseInt(clickedQuarter.id.slice(-1));
    userSeq.push(quarterIndex);
    console.log("User input:", userSeq); // Added console log
    compareSequences();
    // Play audio for the clicked quarter
    const audio = new Audio(`assets/Audio/sound${quarterIndex}.mp3`);
    audio.play();
  }
}

// Function to reset the game state
function resetGame() {
  // Reset the necessary variables
  gameStatus = true;
  currentScore = 0;
  sequence = [];
  userSeq = [];

  // Hide the scoreboard screen
  const scoreboardScreen = document.getElementById("scoreboardScreen");
  scoreboardScreen.style.visibility = "hidden";

  // Show the countdown screen
  const countdownScreen = document.getElementById("countDownScreen");
  countdownScreen.style.visibility = "visible";

  // Call the startCounterAndShowGame() function to initiate the countdown and game start
  startCounterAndShowGame();
}

// Get the "Try Again" button element
const tryAgainButton = document.getElementById("tryAgain");

// Add event listener for the click event
tryAgainButton.addEventListener("click", resetGame);