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
  const countDownArray = ['2', '1', 'Go'];

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
    }, (index + 1) * 1000); // Delay between countdown numbers (1 second)
  }

  // Iterate over the countDownArray
  for (let i = 0; i < countDownArray.length; i++) {
    runCountdown(i);
  }


}

////////////////////capturing and validating player input against the generated sequences.

// Declare global variable gameStatus, initially set to true
let gameStatus = true;

// Declare global variable currentScore, initially set to 0
let currentScore = 0;

// Declare global array to hold the computer sequence
let sequence = [];

// Function to add a random choice to the computer sequence and play the full sequence
function addAndPlay() {
  // Generate a random choice
  const randomChoice = Math.floor(Math.random() * 4) + 1;
  // Add it to the sequence
  sequence.push(randomChoice);
  // Play the full sequence one time
  playSequence();
  // Call the event listener to capture player input
  setUpEventListener();
}

// Function to play the full sequence
function playSequence() {
  for (let i = 0; i < sequence.length; i++) {
    const quarterElement = document.getElementById(`quarter${sequence[i]}`);
    // Flash the light or perform any desired action for the quarter
    setTimeout(() => {
      quarterElement.style.filter = "brightness(2.5)";
      setTimeout(() => {
        quarterElement.style.filter = ""; // Reset the filter to its initial status
      }, 500);
    }, 300);
  }
}


// Setup event listener to capture player input and store it
function setUpEventListener() {
  // Set up event listener to capture player input
  // Store the captured input in a player sequence array
  // Call the compareSequences function
}

// Compare the player sequence with the computer sequence
function compareSequences() {
  // Loop over the computer sequence
  // If the player index value matches the computer index value and gameStatus is true
    // Update gameStatus to stay true
    // Increase the currentScore
    // Call checkHighScore()
    // Otherwise, set gameStatus to false
}

// Check the score and high score
function checkHighScore() {
  // If the currentScore is greater than the highScore
  // Set the highScore to the currentScore
}

// Handle correct or incorrect user input
function handleUserInput() {
  // If gameStatus is true
  // Call addAndPlay to continue the game
  // Otherwise, show the score screen
}

// Setup event listener and validate user input against the generated sequences
setUpEventListener();
