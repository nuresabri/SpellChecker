// Array to hold dictionary words
let dictionary = [];

// Function to load the dictionary file
function loadDictionary() {
    fetch('dictionary.txt')  // Load dictionary.txt from the repository
        .then(response => response.text())  // Get the text from the file
        .then(data => {
            dictionary = data.split('\n').map(word => word.trim().toLowerCase()); // Split the file into words
            console.log("Dictionary loaded successfully!");
        })
        .catch(error => console.error("Error loading dictionary:", error));
}

// Function to check if the word exists in the dictionary
function checkWord(word) {
    const wordLower = word.toLowerCase().trim();
    return dictionary.includes(wordLower);
}

// Function to update the page with results
function showResults(word) {
    const scoreElement = document.getElementById('score');
    const resultElement = document.getElementById('result');

    // Check if the word is in the dictionary
    const isCorrect = checkWord(word);

    // Calculate the score
    const score = isCorrect ? 1 : 0;

    // Update the page with score and result
    scoreElement.innerHTML = `Score: ${score}`;
    resultElement.innerHTML = isCorrect ? `Correct: The word "${word}" is in the dictionary.` : `Incorrect: The word "${word}" is not in the dictionary.`;
}

// Event listener for submitting the form
document.getElementById('submit').addEventListener('click', function() {
    const word = document.getElementById('wordInput').value;
    showResults(word);
});

// Load dictionary when the page loads
window.onload = function() {
    loadDictionary();
};
