
//dictionary of possible words
var dict = ["robert", "lemon chicken", "ramone", "sports writer", "couch", "marie", "frank"];

var currentWord;
var guessedLetters;
var wrongGuesses;
var playingGame;

var DEFAULT_RAY_LINE = "UHHHHHHHH <br>";
var DEFAULT_DEB_LINE = "I bet you think you know EXACTLY what I am thinking. Just TRY and guess <br>";

/*
    Set a new word to be played. Resets guessed letter, sets the current word to a new word object.
*/
function setNewWord() {
    currentWord = makeWord(getWord());
    guessedLetters = [];
    wrongGuesses = 0;
    playingGame = true;

    console.log(currentWord);

    updateHTML(DEFAULT_DEB_LINE, DEFAULT_RAY_LINE);
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
        if (newWord.charAt(i) == " ") {
            newBlanks.push(String.fromCharCode(13, 10));
        } else {
            newBlanks.push("_");
        }
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

function updateHTML(deb, ray) {
    var blankDiv = document.getElementById("ray-blanks-div");
    var guessDiv = document.getElementById("ray-guesses-div");
    var blankString = "";
    var guessString = "";

    if (deb === DEFAULT_DEB_LINE) {

        currentWord.blanks.forEach(blank => {
            blankString += blank + " ";
        });
    }

    blankDiv.innerHTML = deb + blankString;

    if (ray === DEFAULT_RAY_LINE) {
        guessedLetters.forEach(letter => {
            guessString += letter + " ";
        });
    }

    guessDiv.innerHTML = ray + "<strong>" + guessString + "</strong>";
}



/*
    called when you lose
*/
function showLose() {
    updateHTML("WOW COUCH TONIGHT FOR YOU!!", "shucks")
}

/*
    called if you win
*/
function showWin() {
    updateHTML("LEMON CHICKEN FOR EVERYONE TONIGHT", "HECK YEAH!!!");
}

function anotherGame() {
    document.getElementById("another-game-div").animate({
        opacity: [0, .95],
        backgroundColor: ["white", "gray"],
    }, {
            duration: 2000,
            fill: "forwards",
        });
}

function disapperAnotherGame() {
    document.getElementById("another-game-div").animate({
        opacity: [.95, 0],
        backgroundColor: ["white", "gray"],
    }, {
            duration: 2000,
            fill: "forwards",
        });
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
    playingGame = false;
    anotherGame();
}

/*
    wait until the page is ready before you start changing the page. Otherwise the page could appear blank.
*/
document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        document.onkeyup = function (event) {
            if (playingGame) {
                guessLetter(event.key);
                updateHTML(DEFAULT_DEB_LINE, DEFAULT_RAY_LINE);
                gameResolution();
            }
        };

        document.getElementById("another-game-button").onclick = function (event) {
            if (!playingGame) {
                setNewWord();
                disapperAnotherGame();            }
        };

        document.getElementById("not-another-game-button").onclick = function (event) {
            if (!playingGame) {
                disapperAnotherGame();
                updateHTML("I'm going to bed Ray", "MMM Yeah it is getting late.");
            }
        }

        setNewWord();
    }
};