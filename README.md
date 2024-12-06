# Spell Checker

## Overview
This project implements a spell checker that suggests the best possible word corrections based on a given input word. It uses dynamic programming to calculate a sequence alignment score between the input word and words in the dictionary. The goal is to provide suggestions for potentially misspelled words using a scoring algorithm that considers consonant/vowel mismatches and gaps.

The spell checker works through a web interface, where users can input a word and get suggestions with the best possible corrections based on the dictionary provided.

## Features
- **Spell Checking**: Accepts a word as input and checks if it exists in the dictionary.
- **Suggestions**: Provides the top 10 suggestions based on a scoring algorithm using sequence alignment.
- **Dynamic Programming**: Implements a custom sequence alignment algorithm with penalties for mismatches and gaps.
- **User Interface**: Simple, clean UI for users to interact with the spell checker.

## Files
1. **index.html**: The main HTML file for the web interface.
2. **script.js**: JavaScript file implementing the logic for spell checking and suggestion generation.
3. **dictionary.txt**: A text file containing the dictionary words for checking against input words.

## How to Run the Project

### 1. Visit Website
a. Go to https://nuresabri.github.io/SpellChecker/
b. Enter a word in the box and press check

## 2. Clone My Repository
To run it locally, ensure you have git installed and set up on your machine

a. Open a terminal and navigate to the directory you to clone the repo in.
b. Follow these commmands:

git clone https://github.com/nuresabri/SpellChecker.git
cd SpellChecker

c. Now you can open the index.html file and use the program locally.

