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

// Function to identify vowels
function isVowel(char) {
    const vowels = 'aeiou';
    return vowels.includes(char);
}

// Function to calculate the penalty score using dynamic programming
function sequenceAlignment(word1, word2) {
    const n = word1.length;
    const m = word2.length;
    const dp = Array(n + 1).fill(null).map(() => Array(m + 1).fill(0));

    // Fill the base cases
    for (let i = 1; i <= n; i++) dp[i][0] = dp[i - 1][0] + 2;  // Gap penalty (deletion)
    for (let j = 1; j <= m; j++) dp[0][j] = dp[0][j - 1] + 2;  // Gap penalty (insertion)

    // Fill the DP table
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];  // Exact match (no penalty)
            } else if ((isVowel(word1[i - 1]) && isVowel(word2[j - 1])) || 
                       (!isVowel(word1[i - 1]) && !isVowel(word2[j - 1]))) {
                dp[i][j] = dp[i - 1][j - 1] + 1;  // Consonant/Consonant or Vowel/Vowel mismatch
            } else {
                dp[i][j] = dp[i - 1][j - 1] + 3;  // Vowel/Consonant mismatch (penalty 3)
            }
            dp[i][j] = Math.min(dp[i][j], dp[i - 1][j] + 2);  // Gap penalty (deletion)
            dp[i][j] = Math.min(dp[i][j], dp[i][j - 1] + 2);  // Gap penalty (insertion)
        }
    }

    return dp[n][m];
}

// Function to get the top 10 best suggestions from the dictionary
function getBestSuggestions(inputWord) {
    const scoredWords = dictionary.map(word => {
        return { word, score: sequenceAlignment(inputWord, word) };
    });

    // Sort the words by score (ascending order)
    scoredWords.sort((a, b) => a.score - b.score);

    // Return the top 10 words with the lowest score
    return scoredWords.slice(0, 10);
}

// Function to update the page with results and suggestions
function showResults(word) {
    const resultElement = document.getElementById('result');
    const scoreElement = document.getElementById('score');
    const suggestionsElement = document.getElementById('suggestions');

    // Get the top 10 best suggestions
    const suggestions = getBestSuggestions(word);
    
    // Display the score and suggestions
    scoreElement.innerHTML = `Score: ${suggestions[0].score}`;
    resultElement.innerHTML = `Best suggestion: "${suggestions[0].word}"`;

    // Clear previous suggestions
    suggestionsElement.innerHTML = '';
    
    // List the top 10 suggestions
    suggestions.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.word} (Score: ${item.score})`;
        suggestionsElement.appendChild(li);
    });
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
