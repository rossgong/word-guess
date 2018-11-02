var dict = ["test"];

var currentWord;
var guessedLetters;


/*
    Set a new word to be played. Resets guessed letter, sets the current word to a new word object.
*/
function setNewWord() {
    currentWord = makeWord(getWord());
    guessedLetters = [];
}

/*
    Gets a random word from the dictionary.
*/
function getWord() {
    return dict[Math.floor(Math.random()*dict.length)];
}

/*
    Makes a word object containing the word and an arry of blanks.
*/
function makeWord (newWord) {
    var newBlanks = [];
    for (var i = 0; i < newWord.length; i++) {
        newBlanks.push("_");
    }
    return {
        word: newWord,
        blanks: newBlanks
    };
}

setNewWord()
console.log(currentWord);
console.log(guessedLetters);

