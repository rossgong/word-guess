
//dictionary of possible words
var dict = [["robert", "I bet you don't even know your brother's name..."],
 ["lemon chicken", "Just GUESS what you're having for dinner tonight!"],
 ["ramone", "DO YOU EVEN KNOW YOUR NAME???"],
 ["sports writer", "Remember you JOB??"],
 ["couch", "Where you'll be sleeping tonight!"],
 ["marie", "I bet she still can't stand me...."],
 ["frank", "Your freaking dad"]];

var currentWord;
var guessedLetters;
var wrongGuesses;
var playingGame;

var maxGuesses = 5;

var rayLine = "UHHHHHHHH <br>";
var debLine = "I bet you think you know EXACTLY what I am thinking. Just TRY and guess";

/*
    Set a new word to be played. Resets guessed letter, sets the current word to a new word object.
*/
function setNewWord() {
    word = getWord();

    currentWord = makeWord(word[0]);
    guessedLetters = [];
    wrongGuesses = 0;
    playingGame = true;
    debLine = word[1];

    console.log(currentWord);

    updateHTML(debLine, rayLine);
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
    var debDiv = document.getElementById("ray-blanks-div");
    var rayDiv = document.getElementById("ray-guesses-div");
    var blankString = "";
    var guessString = "";

    if (deb === debLine) {

        currentWord.blanks.forEach(blank => {
            blankString += blank + " ";
        });
    }

    debDiv.innerHTML = deb + "<br>" + blankString;
    if (wrongGuesses < maxGuesses) {
        debDiv.innerHTML += "<br>You have " + (maxGuesses-wrongGuesses) + " chances left..." ;
    }
    

    if (ray === rayLine) {
        guessedLetters.forEach(letter => {
            guessString += letter + " ";
        });
    }

    rayDiv.innerHTML = ray + "<br><strong>" + guessString + "</strong>";
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
        backgroundColor: ["gray", "white"],
    }, {
            duration: 500,
            fill: "forwards",
        });
}

/*
    Determines if the player have won and tell the player.
*/
function gameResolution() {
    if (wrongGuesses >= maxGuesses) {
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
                updateHTML(debLine, rayLine);
                gameResolution();

                document.getElementById("ray-tune").volume = .4;
                document.getElementById("ray-tune").play();
            }
        };

        document.getElementById("another-game-button").onclick = function (event) {
            if (!playingGame) {
                setNewWord();
                disapperAnotherGame();            
            }
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