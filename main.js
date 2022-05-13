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
  let guessedArray = guess.split("");
  let solArray = solution.split("");
  // split("") elimates the spaces and returns the characters 
  let correctLetterLocations = 0;
  for (let i = 0; i < solArray.length; i++){
    if (guessedArray[i] === solArray[i]) {
      correctLetterLocations++;
      solArray[i] = null;
      
    }}


    // correctLetterLocations++ is the same as correctLetterLocations = correctLetterLocations + 1; 
  let crrctLetters = 0;
  for (let i = 0; i < solArray.length; i++){
    let targetIndex = solArray.indexOf(guessedArray[i])
    // Using .indexOf, determine if the item at the current index in guessArray appears inside of solutionArray. 
    // rewrite for better understanding ^^^^^^^^^^
    if (targetIndex > -1 ) {
      crrctLetters++;
      solArray[targetIndex] = null;
      
    }
  }
  return correctLetterLocations + "-" + crrctLetters;

}

/* Spec 3 - Add guess and hint to the board: Define a variable called hint that collects the returned value of generateHint(guess). 
.push the guess and the hint (as a combined string) into the board.*/



const mastermind = (guess) => {
  // solution = 'abcd'; // Comment this out to generate a random solution
  // your code here
  let hint = generateHint(guess);
  board.push(guess + hint);
  if (guess === solution) {return 'You guessed it!'}
  else {
    if (board.length < 10) {return "guess again"}
    else {return 'You ran out of turns! The solution was' + solution}
  }
 
  
}


const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Testing Codes

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should take a guess and gives hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a winner', () => {
      assert.equal(mastermind(solution), 'You have guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should gives hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should give hints if solution is duplicate', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {
//end of game loop
  generateSolution();
  getPrompt();
}