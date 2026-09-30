// ===== Step 1: Get the elements from the HTML =====
// The button that starts the program
var startBtn = document.getElementById("startBtn");

// The box where the result will be displayed
var resultDisplay = document.getElementById("resultDisplay");


// ===== Step 2: Run the program when the button is clicked =====
startBtn.addEventListener("click", runEvaluation);


// ===== Step 3: Main function (the whole program flow) =====
function runEvaluation() {

  // 1. Display a welcome message using alert()
  alert("Welcome to the Student Score Evaluator!");

  // 2. Ask for the name using prompt()
  var name = prompt("Enter your name (letters only):");

  // prompt() returns null if the user clicks Cancel.
  // We change null to empty text so our checks are easier.
  if (name === null) {
    name = "";
  }

  // 3. Validate the name. If there is a problem, show an alert and stop.
  var nameError = checkName(name);

  if (nameError !== "") {
    alert(nameError);
    showMessage("Invalid name: " + nameError);
    return; // "return" stops the function here
  }

  // 4. Ask for the score using prompt()
  var scoreText = prompt("Enter your score (numbers only, 1 to 100):");

  if (scoreText === null) {
    scoreText = "";
  }

  // 5. Validate the score. If there is a problem, show an alert and stop.
  var scoreError = checkScore(scoreText);

  if (scoreError !== "") {
    alert(scoreError);
    showMessage("Invalid score: " + scoreError);
    return;
  }

  // 6. Ask if the user wants to continue using confirm()
  // confirm() returns true (OK) or false (Cancel)
  var wantsToContinue = confirm("Do you want to continue?");

  // If the user clicked Cancel, stop the program
  if (wantsToContinue === false) {
    showMessage("Evaluation cancelled.");
    return;
  }

  // 7. The score is valid, so convert the text to a number
  var score = Number(scoreText);

  // 8. Evaluate the score using a function
  var remark = evaluateScore(score);

  // 9. Display the final result on the webpage
  showResult(name.trim(), score, remark, "");
}


// ===== Step 4: Function to check if the name is valid =====
// Returns an error message, or "" (empty text) if the name is OK
function checkName(name) {

  // Empty input (nothing typed, or only spaces)
  if (name.trim() === "") {
    return "Name is empty. Please enter your name.";
  }

  // Letters and spaces only. Numbers and symbols are not allowed.
  // \p{L} means "any letter" (this also allows letters like ñ)
  var lettersOnly = /^[\p{L} ]+$/u;

  if (lettersOnly.test(name.trim()) === false) {
    return "Name must contain letters only. Numbers and symbols are not allowed.";
  }

  // Passed all the checks, so no error
  return "";
}


// ===== Step 5: Function to check if the score is valid =====
// Returns an error message, or "" (empty text) if the score is OK
function checkScore(scoreText) {

  // Empty input (nothing typed, or only spaces)
  if (scoreText.trim() === "") {
    return "Score is empty. Please enter your score.";
  }

  // Numbers only. A minus sign and a decimal point are allowed here
  // so we can give a clear message for negative scores like -5.
  // Letters (example: "abc" or "9a") do not match, so they are rejected.
  var numbersOnly = /^-?[0-9]+(\.[0-9]+)?$/;

  if (numbersOnly.test(scoreText.trim()) === false) {
    return "Score must be numbers only. Letters and symbols are not allowed.";
  }

  // Now it is safe to convert the text to a number
  var score = Number(scoreText);

  // Zero input
  if (score === 0) {
    return "Score cannot be zero.";
  }

  // Negative input
  if (score < 0) {
    return "Score cannot be negative.";
  }

  // Score beyond 100
  if (score > 100) {
    return "Score cannot be more than 100.";
  }

  // Passed all the checks, so no error
  return "";
}


// ===== Step 6: Function to evaluate the score =====
// Uses if, else if, and else to decide the remark
function evaluateScore(score) {

  if (score >= 90) {
    return "Excellent";   // 90 - 100
  } else if (score >= 75) {
    return "Passed";      // 75 - 89
  } else {
    return "Failed";      // Below 75
  }
}


// ===== Step 7: Functions to show output on the page =====

// Shows the name, score, and remark inside the result box
function showResult(name, score, remark, note) {

  // Clear the old content (including the placeholder text)
  resultDisplay.innerHTML = "";

  // If the score is empty, show "(none)" instead of a blank
  if (score === "") {
    score = "(none)";
  }

  // Create the lines of text
  addLine("Name: " + name);
  addLine("Score: " + score);
  addLine("Remark: " + remark);

  // Show the reason only if there is one (for invalid input)
  if (note !== "") {
    addLine("Reason: " + note);
  }
}

// Shows a single message inside the result box
function showMessage(message) {
  resultDisplay.innerHTML = "";
  addLine(message);
}

// Creates one <p> line and adds it to the result box
// textContent is used so the user's typing is always treated as plain text
function addLine(text) {
  var line = document.createElement("p");
  line.textContent = text;
  resultDisplay.appendChild(line);
}