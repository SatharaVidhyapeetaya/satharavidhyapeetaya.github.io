
// Function to generate random integers between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a random operator (+, -, *,/)
function getRandomOperator() {
  var operators = ['+', '-', '*','/'];
  var randomIndex = Math.floor(Math.random() * operators.length);
  return operators[randomIndex];
}

// Function to generate random math questions and populate the table
function randomCreator() {
  var tableBody = document.querySelector("#mathTable tbody");
  tableBody.innerHTML = ""; // Clear previous rows
    var operator = getRandomOperator();
  for (var i = 0; i < 6; i++) {
    var num1 = getRandomInt(1, 100);
    var num2 = getRandomInt(1, 100);
    var question = num1 + " " + operator + " " + num2;
    var row = "<tr>" +
      "<td>" + operator + "</td>" +
      "<td>" + num1 + "</td>" +
      "<td>" + num2 + "</td>" +
      "<td>=</td>" +
      "<td><input type='text' class='form-control' id='answer-" + i + "'></td>" +
      "<td id='status-" + i + "'></td>" +
      "</tr>";

    tableBody.innerHTML += row;
  }

  // Update the question in the main card
  var questionText = document.getElementById("questionText");
  questionText.textContent = "ගණිතය දැලිස අභ්‍යාස";
}

// Function to check the correctness of answers
function checkAnswer() {
  for (var i = 0; i < 6; i++) {
    var num1 = parseInt(document.querySelector("#mathTable tbody tr:nth-child(" + (i + 1) + ") td:first-child").textContent);
    var operator = document.querySelector("#mathTable tbody tr:nth-child(" + (i + 1) + ") td:nth-child(2)").textContent;
    var num2 = parseInt(document.querySelector("#mathTable tbody tr:nth-child(" + (i + 1) + ") td:nth-child(3)").textContent);
    var answer = parseInt(document.getElementById("answer-" + i).value);
    var statusCell = document.getElementById("status-" + i);

    var expectedAnswer;
    switch (operator) {
      case "+":
        expectedAnswer = num1 + num2;
        break;
      case "-":
        expectedAnswer = num1 - num2;
        break;
      case "*":
        expectedAnswer = num1 * num2;
        break;
        case "/":
          if (Number.isInteger(num1) && Number.isInteger(num2) && num2 !== 0) {
              expectedAnswer = num1 / num2;
          } else {
              statusCell.textContent = "Invalid Division";
              statusCell.style.color = "red";
              continue; // Skip to the next iteration of the loop
          }
          break;
    }

    if (answer === expectedAnswer) {
      statusCell.textContent = "Correct";
      statusCell.style.color = "green";
    } else {
      statusCell.textContent = "Incorrect";
      statusCell.style.color = "red";
    }
  }
}

// Function to display the correct answers
function answerHelp() {
  for (var i = 0; i < 6; i++) {
    var num1 = parseInt(document.querySelector("#mathTable tbody tr:nth-child(" + (i + 1) + ") td:first-child").textContent);
    var operator = document.querySelector("#mathTable tbody tr:nth-child(" + (i + 1) + ") td:nth-child(2)").textContent;
    var num2 = parseInt(document.querySelector("#mathTable tbody tr:nth-child(" + (i + 1) + ") td:nth-child(3)").textContent);
    var resultCell = document.querySelector("#mathTable tbody tr:nth-child(" + (i + 1) + ") td:nth-child(5)");

    var answer;
    switch (operator) {
      case "+":
        answer = num1 + num2;
        break;
      case "-":
        answer = num1 - num2;
        break;
      case "*":
        answer = num1 * num2;
        break;
      case "*":
        answer = num1 / num2;
        break;
      
    }

    resultCell.innerHTML = answer;
  }
}

// Generate initial random questions on page load
window.onload = randomCreator;
