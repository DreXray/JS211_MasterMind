'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}


const generateHint = (guess) =>  {
  // your code here
  let guessArray = guess.split("");
  let solutionArray = solution.split("");
  // split("") elimates the spaces and returns the characters 
  let correctLetterLocations = 0;
  for (let i = 0; i < solutionArray.length; i++){
    if (guessArray[i] === solutionArray[i]) {
      correctLetterLocations++;
      solutionArray[i] = null;
      
    }}
    // correctLetterLocations++ is the same as correctLetterLocations = correctLetterLocations + 1; 
  let correctLetters = 0;
  for (let i = 0; i < solutionArray.length; i++){
    let targetIndex = solutionArray.indexOf(guessArray[i])
    // Using .indexOf, determine if the item at the current index in guessArray appears inside of solutionArray. 
    // rewrite for better understanding ^^^^^^^^^^
    if (targetIndex > -1 ) {
      correctLetters++;
      solutionArray[targetIndex] = null;
      
    }
  }
  return "red: " + correctLetterLocations + " white: " + correctLetters;

}

/* Spec 3 - Add guess and hint to the board: Define a variable called hint that collects the returned value of generateHint(guess). 
.push the guess and the hint (as a combined string) into the board.*/

let hint = generateHint(guess);

const mastermind = (guess) => {
  solution = 'abcd'; // Comment this out to generate a random solution
  // your code here
  if (guess === solution) {return 'You guessed it!'};
  
}


const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}