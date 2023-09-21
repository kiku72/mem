/*----- constants -----*/
const result = {
    correct: ["Nice!", "Well Done!", "Perfect!", "That's it!", "Great work!"],
    incorrect: [
        "Not quite!",
        "Try Again!",
        "Oops!",
        "Keep Trying!",
        "So close",
        "You can do it!",
    ],
};

/*----- state variables -----*/
let startingGuesses = 5;
let guessCount = 5;
let count = 0;
let firstCard;
let newGuesses = 0;
let gameComplete = false;

/*----- cached elements  -----*/
const cards = document.querySelectorAll(".card_face");
const remainingGuess = document.querySelector(".guess_count");
const results = document.querySelector(".result");

const images = document.querySelectorAll("img");
const cardBacks = document.querySelectorAll(".card_face_back");

const playAgain = document.getElementById("play_again");
const shuffleBtn = document.getElementById("shuffle");

const changeDifficulty = document.querySelector(".show");
const guessOptions = document.querySelector(".guess_options");
const changeAmount = document.querySelector(".user_guesses");
const changeBtn = document.querySelector(".change_guess");

const artNote = document.getElementById("art");

/*----- event listeners -----*/
cards.forEach((card) => card.addEventListener("click", handleClick));
playAgain.addEventListener("click", initialise);
shuffleBtn.addEventListener("click", initialise);
changeDifficulty.addEventListener("click", revealOptions);
changeBtn.addEventListener("click", changeGuess);

/*----- functions -----*/

function initialise() {
    hideCards();
    shuffle();
    resetGuesses();
    results.innerHTML = "Click any card to get started!";
    changeDifficulty.style.visibility = "none";
    playAgain.style.display = "none";
    artNote.style.visibility = "hidden";
    guessOptions.style.visibility = "hidden";
    gameComplete = false;
}

function resetGuesses() {
    if (newGuesses === 0) {
        guessCount = startingGuesses;
    } else guessCount = newGuesses;
    remainingGuess.innerHTML = `GUESSES LEFT: <strong>${guessCount}</strong>`;
    remainingGuess.style.visibility = "visible";
}

function handleClick() {
    // Prevents shuffle button from being visible on endscreen
    if (gameComplete) return;

    // Reveal shuffle button after first turn is taken
    if (guessCount < startingGuesses) {
        shuffleBtn.style.display = "inline";
    }

    // Prevent repeat selection
    if (this.classList[2] != undefined || guessCount === 0) return;
    // Flip user selected card
    this.classList.toggle("is-flipped");
    count += 1;

    if (count === 2) {
        count = 0;
        const secondCard = this.classList;
        // Check to see if matching pair
        if (firstCard[1] === secondCard[1]) {
            updateGuessCount();
            celebrate();
            gameWon();
            return;
        } else {
            updateGuessCount();
            encourage();
            setTimeout(resetSelectedCards, 600);
            return;
            function resetSelectedCards() {
                firstCard.remove("is-flipped");
                secondCard.remove("is-flipped");
                return;
            }
        }
    }
    firstCard = this.classList;
}

function updateGuessCount() {
    guessCount -= 1;
    guessString = guessCount.toString();
    remainingGuess.innerHTML = `GUESSES LEFT: <strong>${guessString}</strong>`;
    if (guessCount === 0) {
        gameOver();
    }
}

const cardsArr = Array.from(cards);
const imagesArr = Array.from(images);

function shuffle() {
    shuffleBtn.style.display = "none";
    // Images and card pairs are randomised together using the same randomised index arr
    let randomCardsArr = [];
    let randomImageArr = [];
    let randomIndex = [];

    cardsArr.forEach((card, index) => {
        randomIndex.push(Math.floor(Math.random() * 16));
        randomCardsArr.splice([randomIndex[index]], 0, card.classList[1]);
    });
    imagesArr.forEach((image, index) => {
        randomImageArr.splice([randomIndex[index]], 0, image);
    });

    cardsArr.forEach((card, index) => {
        card.classList.remove(card.classList[1]);
        card.classList.add(randomCardsArr[index]);
    });
    imagesArr.forEach((image, index) => {
        cardBacks[index].appendChild(randomImageArr[index]);
    });
}

function gameWon() {
    let checkArr = [];
    let playerWon;
    cards.forEach((card) => {
        checkArr.push(card.classList.contains("is-flipped"));
        playerWon = checkArr.every((element) => element === true);
    });
    if (playerWon) {
        results.innerHTML = "You did it!";
        playAgain.style.display = "inline";
        artNote.style.visibility = "visible";
        shuffleBtn.style.display = "none";
        remainingGuess.style.visibility = "hidden";
        changeDifficulty.style.visibility = "hidden";
        gameComplete = true;
    }
}
function celebrate() {
    results.innerHTML = result.correct[Math.floor(Math.random() * 4)];
}

function gameOver() {
    results.innerHTML = "Better luck next time!";
    showCards();
    showHidden();
    shuffleBtn.style.display = "none";
    gameComplete = true;
}
function encourage() {
    results.innerHTML = result.incorrect[Math.floor(Math.random() * 4)];
}

function hideCards() {
    cards.forEach((card) => {
        card.classList.remove("is-flipped");
    });
}
function showCards() {
    setTimeout(showAll, 800);
    function showAll() {
        cards.forEach((card) => {
            card.classList.add("is-flipped");
        });
    }
}
function showHidden() {
    playAgain.style.display = "inline";
    changeDifficulty.style.visibility = "visible";
    remainingGuess.style.visibility = "hidden";
}

function revealOptions() {
    guessOptions.style.visibility = "visible";
    playAgain.style.display = "none";
    changeDifficulty.style.visibility = "hidden";
}

function changeGuess() {
    changeDifficulty.style.visibility = "hidden";
    newGuesses = changeAmount.value;
    // Default to 25 if no user input to new guess limit
    if (newGuesses === "") {
        newGuesses = 25;
    }
    guessCount = newGuesses;
    // Hide guess-changing elements
    guessOptions.style.visibility = "hidden";
    initialise();
}

initialise();
