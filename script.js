// array to hold dictionary words
let dictionary = [];

// function to load the dictionary file
function loadDictionary() {
    fetch('dictionary.txt')  // load dictionary.txt from the repository
        .then(response => response.text())  // get the text from the file
        .then(data => {
            dictionary = data.split('\n').map(word => word.trim().toLowerCase()); // split the file into words
            console.log("dictionary loaded successfully!");
        })
        .catch(error => console.error("error loading dictionary:", error));
}

// function to check if a character is a vowel
function isVowel(char) {
    const vowels = 'aeiou';
    return vowels.includes(char);
}

// function to calculate the penalty score using dynamic programming
function sequenceAlignment(word1, word2) {
    const n = word1.length;
    const m = word2.length;
    const dp = Array(n + 1).fill(null).map(() => Array(m + 1).fill(0));

    // fill in the base cases for gaps
    for (let i = 1; i <= n; i++) dp[i][0] = dp[i - 1][0] + 2;  // gap penalty for deletion
    for (let j = 1; j <= m; j++) dp[0][j] = dp[0][j - 1] + 2;  // gap penalty for insertion

    // loop through the matrix to calculate scores
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];  // no penalty for exact match
            } else if ((isVowel(word1[i - 1]) && isVowel(word2[j - 1])) || 
                       (!isVowel(word1[i - 1]) && !isVowel(word2[j - 1]))) {
                dp[i][j] = dp[i - 1][j - 1] + 1;  // consonant/consonant or vowel/vowel mismatch
            } else {
                dp[i][j] = dp[i - 1][j - 1] + 3;  // vowel/consonant mismatch (penalty 3)
            }
            dp[i][j] = Math.min(dp[i][j], dp[i - 1][j] + 2);  // gap penalty for deletion
            dp[i][j] = Math.min(dp[i][j], dp[i][j - 1] + 2);  // gap penalty for insertion
        }
    }

    return dp[n][m];
}

// function to get the top 10 best suggestions from the dictionary
function getBestSuggestions(inputWord) {
    // create an array of words with their penalty scores
    const scoredWords = dictionary.map(word => {
        return { word, score: sequenceAlignment(inputWord, word) };
    });

    // sort the words by score (lowest first)
    scoredWords.sort((a, b) => a.score - b.score);

    // return the top 10 words with the lowest score
    return scoredWords.slice(0, 10);
}

// function to update the page with results and suggestions
function showResults(word) {
    const resultElement = document.getElementById('result');
    const scoreElement = document.getElementById('score');
    const suggestionsElement = document.getElementById('suggestions');

    // get the top 10 best suggestions based on the entered word
    const suggestions = getBestSuggestions(word);
    
    // display the score and best suggestion
    scoreElement.innerHTML = `score: ${suggestions[0].score}`;
    resultElement.innerHTML = `best suggestion: "${suggestions[0].word}"`;

    // clear previous suggestions
    suggestionsElement.innerHTML = '';
    
    // loop through the top 10 suggestions and add them to the list
    suggestions.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.word} (score: ${item.score})`;
        suggestionsElement.appendChild(li);
    });
}

// event listener for when the user submits a word
document.getElementById('submit').addEventListener('click', function() {
    const word = document.getElementById('wordInput').value;
    showResults(word);
});

// load the dictionary when the page loads
window.onload = function() {
    loadDictionary();
};
