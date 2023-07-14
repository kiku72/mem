/*----- constants -----*/
const result = {
    correct : ['Nice!', 'Well Done!', 'Perfect!', 'Doing Great!'],
    incorrect : ['Not quite!', 'Try Again!', 'Oops!', 'Keep Trying!' ]
}

/*----- state variables -----*/
let startingGuesses = 20;
let guessCount = 20;
let count = 0;
let firstCard;
let newGuesses = 0;


/*----- cached elements  -----*/
const cards = document.querySelectorAll('.card_face');
const remainingGuess = document.querySelector('.guess_count');
const results = document.querySelector('.result');

const images = document.querySelectorAll('img');
const cardBacks = document.querySelectorAll('.card_face_back');

const playAgain = document.getElementById('play_again');
const shuffleBtn = document.getElementById('shuffle');

const throwABone = document.querySelector('.show');
const guessOptions = document.querySelector('.guess_options');
const changeAmount = document.querySelector('.user_guesses');
const changeBtn = document.querySelector('.change_guess');

const artNote = document.getElementById('art');

/*----- event listeners -----*/
cards.forEach(card => card.addEventListener('click', handleClick))
playAgain.addEventListener('click', initialise);
shuffleBtn.addEventListener('click', initialise);
throwABone.addEventListener('click', reveal);
changeBtn.addEventListener('click', changeGuess)


/*----- functions -----*/

function initialise() { 
    hideCards();
    shuffle();
    resetGuesses();
    // timer();
    results.innerHTML = "Click any card to get started!";
    shuffleBtn.style.visibility = 'visible';
    playAgain.style.visibility = 'hidden';
    artNote.style.visibility = 'hidden';
    guessOptions.style.visibility = 'hidden';

}

function resetGuesses() {
    if (newGuesses === 0) {
        guessCount = startingGuesses;
    } else guessCount = newGuesses;
    remainingGuess.innerHTML = `GUESSES LEFT: <strong>${guessCount}</strong>`;
    remainingGuess.style.visibility = 'visible';
}



function handleClick() {
    // Prevent repeat selection
    if (this.classList[2] != undefined || guessCount === 0) return;
    // Flip user selected card
    this.classList.toggle('is-flipped');
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
            function resetSelectedCards () {
                firstCard.remove('is-flipped');
                secondCard.remove('is-flipped');
                return;
            }
            
        }
    }
    firstCard = this.classList;
}

function updateGuessCount (){
    guessCount -= 1;
    guessString = guessCount.toString();
    remainingGuess.innerHTML = `GUESSES LEFT: <strong>${guessString}</strong>`;
    if (guessCount === 0) {
        showCards();
        showHidden();
        shuffleBtn.style.visibility = 'hidden';
}}


const cardsArr = Array.from(cards);
const imagesArr = Array.from(images);

function shuffle() {
    // Images and card pairs are randomised together using the same randomised index arr
    let randomCardsArr = [];
    let randomImageArr = [];
    let randomIndex = [];
    
    cardsArr.forEach((card, index) => {
        randomIndex.push(Math.floor(Math.random()*16));
        randomCardsArr.splice([randomIndex[index]],0,(card.classList[1]));
    })
    imagesArr.forEach((image, index) => {
        randomImageArr.splice([randomIndex[index]],0,(image));
    });
    
    cardsArr.forEach((card, index) => {
        card.classList.remove(card.classList[1]);
        card.classList.add(randomCardsArr[index]);
    })
    imagesArr.forEach((image,index) => {
        cardBacks[index].appendChild(randomImageArr[index]);
    })
}

function gameWon() {
    let checkArr = [];
    let playerWon;
    cards.forEach(card => {
        checkArr.push(card.classList.contains('is-flipped'))
        playerWon = checkArr.every(element => element === true);
    })
    if (playerWon) {
        results.innerHTML = 'You did it!'
        playAgain.style.visibility = 'visible';
        // high score  
        artNote.style.visibility = 'visible';
        shuffleBtn.style.visibility = 'hidden';
    }
}

function celebrate() {
    results.innerHTML = result.correct[Math.floor(Math.random()*4)]
}
function encourage() {
    results.innerHTML = result.incorrect[Math.floor(Math.random()*4)]
}

function hideCards() {
    cards.forEach(card => {
        card.classList.remove('is-flipped');
    }
)}
function showCards() {
    setTimeout(showAll, 800);
    function showAll () {
        cards.forEach(card => {
        card.classList.add('is-flipped');
    }
)}
}

function showHidden() {
    playAgain.style.visibility = 'visible';
    throwABone.style.visibility = 'visible';
    remainingGuess.style.visibility = 'hidden';
}

function reveal() {
    guessOptions.style.visibility = 'visible';
    throwABone.style.visibility = 'hidden';
}

function changeGuess() {
    newGuesses = changeAmount.value;
    guessCount = newGuesses;
    playAgain.style.visibility = 'hidden';
    throwABone.style.visibility = 'hidden';
    guessOptions.style.visibility = 'hidden';
    initialise();
}

initialise();









// const timerTxt = document.getElementById('timer');

// function timer() {
    // let sec = 0;
    // let min = 0;
    // let startTime = 0;
    // let elapsedTime = 0;
//     startTime = Date.now() - elapsedTime;
//     intervalId = setInterval(updateTime, 1000)

//     function updateTime() {
//         elapsedTime = Date.now() - startTime;

//         sec = Math.floor((elapsedTime / 1000) % 60);
//         min = Math.floor((elapsedTime / (1000 * 60)) % 60);

//         sec = pad(sec);
//         min = pad(min);
//         timerTxt.innerHTML = `${min} : ${sec}`;
//         function pad(unit) {
//             return (('0') + unit).length > 2 ? unit : "0" + unit;
//         }
//     }
// }