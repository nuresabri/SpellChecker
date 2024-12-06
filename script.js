// Load the dictionary as an array of words (for this example, it will be hardcoded)
const dictionary = [];

// Function to load the dictionary (can be done via AJAX or hardcoded)
function loadDictionary() {
  fetch('dictionary.txt')
    .then(response => response.text())
    .then(text => {
      dictionary.push(...text.split('\n').map(word => word.trim().toLowerCase()));
    });
}

// Function to check if the word is in the dictionary
function checkWord() {
  const word = document.getElementById('wordInput').value.trim().toLowerCase();
  let result = '';

  if (!word) {
    result = 'Please enter a word!';
  } else if (dictionary.includes(word)) {
    result = `'${word}' is spelled correctly!`;
  } else {
    result = `'${word}' is misspelled.`;
  }

  document.getElementById('result').innerText = result;
}

// Initialize the dictionary loading on page load
window.onload = function() {
  loadDictionary();
};
