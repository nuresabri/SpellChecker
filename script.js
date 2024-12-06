let dictionary = [];

function loadDictionary() {
    fetch('dictionary.txt')
        .then(response => response.text())
        .then(data => {
            dictionary = data.split('\n').map(word => word.trim().toLowerCase());
            console.log("Dictionary loaded successfully!");
        })
        .catch(error => console.error("Error loading dictionary:", error));
}

function calculateScore(word1, word2) {
    const vowels = 'aeiou';
    const len1 = word1.length;
    const len2 = word2.length;
    const dp = Array.from({ length: len1 + 1 }, () => Array(len2 + 1).fill(0));

    for (let i = 0; i <= len1; i++) dp[i][0] = i * 2;
    for (let j = 0; j <= len2; j++) dp[0][j] = j * 2;

    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            let cost = 0;
            const char1 = word1[i - 1];
            const char2 = word2[j - 1];
            const isVowel1 = vowels.includes(char1);
            const isVowel2 = vowels.includes(char2);

            if (char1 === char2) {
                cost = 0;
            } else if (isVowel1 === isVowel2) {
                cost = 1;
            } else {
                cost = 3;
            }

            dp[i][j] = Math.min(
                dp[i - 1][j - 1] + cost, // substitution
                dp[i - 1][j] + 2, // gap
                dp[i][j - 1] + 2 // gap
            );
        }
    }

    return dp[len1][len2];
}

function getSuggestions(word) {
    const scores = dictionary.map(dictWord => ({
        word: dictWord,
        score: calculateScore(word, dictWord)
    }));

    scores.sort((a, b) => a.score - b.score);
    return scores.slice(0, 10);
}

function showResults(word) {
    const scoreElement = document.getElementById('score');
    const resultElement = document.getElementById('result');
    const suggestionsElement = document.getElementById('suggestions');

    const isCorrect = checkWord(word);
    const score = isCorrect ? 0 : 1;

    scoreElement.innerHTML = `Score: ${score}`;
    resultElement.innerHTML = isCorrect ? `Correct: The word "${word}" is in the dictionary.` : `Incorrect: The word "${word}" is not in the dictionary.`;

    const suggestions = getSuggestions(word);
    suggestionsElement.innerHTML = `
        <h2>Suggestions:</h2>
        <ul>
            ${suggestions.map(item => `<li>${item.word} (Score: ${item.score})</li>`).join('')}
        </ul>
    `;
}

function checkWord(word) {
    const wordLower = word.toLowerCase().trim();
    return dictionary.includes(wordLower);
}

document.getElementById('submit').addEventListener('click', function() {
    const word = document.getElementById('wordInput').value;
    showResults(word);
});

window.onload = function() {
    loadDictionary();
};
