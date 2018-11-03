
//dictionary of possible words
var dict = ["ross", "gongaware", "test", "content", "wowza"];

var currentWord;
var guessedLetters;
var wrongGuesses;


/*
    Set a new word to be played. Resets guessed letter, sets the current word to a new word object.
*/
function setNewWord() {
    currentWord = makeWord(getWord());
    guessedLetters = [];
    wrongGuesses = 0;
    
    updateHTML();
}

/*
    Gets a random word from the dictionary.
*/
function getWord() {
    return dict[Math.floor(Math.random() * dict.length)];
}

/*
    Makes a word object containing the word and an arry of blanks.
*/
function makeWord(newWord) {
    var newBlanks = [];
    for (var i = 0; i < newWord.length; i++) {
        newBlanks.push("_");
    }
    return {
        word: newWord.split(""),
        blanks: newBlanks
    };
}

/*
    function that works the logic to guessing a letter. Will check the word and fill in the blanks. 
    Also correctly increments the wrong guesses.
*/
function guessLetter(letter) {
    if (typeof letter === "string" && letter.length === 1 /*&& isLetter(letter)*/) {
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            var isCorrect = false;
            for (var i = 0; i < currentWord.word.length; i++) {
                if (currentWord.word[i] === letter) {
                    currentWord.blanks[i] = letter;
                    isCorrect = true;
                }
            }
            if (!isCorrect) {
                wrongGuesses++;
            }
        }
    }
}

/*
    Update the HTML based on the currentWord status
*/
function updateHTML() {
    var blankDiv = document.getElementById("blanks-div");
    var guessDiv = document.getElementById("guesses-div");

    var blankString = "";
    var guessString = "";

    currentWord.blanks.forEach(blank => {
        blankString += blank + " ";
    });

    blankDiv.textContent = blankString;

    guessedLetters.forEach(letter => {
        guessString += letter + " ";
    });

    guessDiv.textContent = guessString;
}

/*
    called when you lose
*/
function showLose() {
    alert("youlose");
}

/*
    called if you win
*/
function showWin() {
    alert("youwin");
}

/*
    Determines if the player have won and tell the player.
*/
function gameResolution() {
    if (wrongGuesses > 4) {
        showLose();
    } else if (currentWord.blanks.indexOf("_") == -1) {
        showWin();
    } else {
        return;
    }
    setNewWord();
}

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        document.onkeyup = function (event) {
            var key = event.key;
            guessLetter(key);
            updateHTML();
            gameResolution();
        };

        setNewWord();
    }
};