/*----- constants -----*/
const result = {
    '0' : '',
    '1' : 'correct',
    '2' : 'incorrect'
}
const outcome = '';



/*----- state variables -----*/
let guessCount = 15;
let time = 0;
let count = 0;


/*----- cached elements  -----*/
const cards = document.querySelectorAll('.card_face');
const remainingGuess = document.querySelector('.guess_count');
const results = document.querySelector('.result');

const images = document.querySelectorAll('img');
const cardBacks = document.querySelectorAll('.card_face_back')

const board = document.querySelector('.memory_game');

// !! needs work //
results.innerHTML = `${outcome[result]}`

/*----- event listeners -----*/
cards.forEach(card => card.addEventListener('click', handleClick))
// play again

// lvl 2 button
// lvl 3 button


/*----- functions -----*/

function initialise() { 
    shuffle();
    result = '';
    timer();
}


// assign first flip to card 1, second flip to card 2
// is card 1 equal to card 2? 
//   use class of card 1 === class of card 2?
// if yes, flip, cant touch, if no, return to card front
// when all cards flipped, endgame()

// Things to do:
// disable click once flipped -done
// add correct
// add guess counter

let firstCard;

function handleClick() {
    // Prevent repeat selection
    if (this.classList[2] != undefined || guessCount === 0) return;
    // Flip user selected card
    this.classList.toggle('is-flipped');
    count += 1;
    
    if (count === 2) {
        count = 0;
        const secondCard = this.classList;
        // console.log('second is ' + secondCard)
        // Check to see if matching pair
        if (firstCard[1] === secondCard[1]) {
            updateGuess();
            // console.log(guessCount);
            // result = [1];
            // console.log(result)
            // console.log('matches')
            return;
        } else {
            // Reset selected cards
            // set timer here
            updateGuess();
            setTimeout(resetSelectedCards, 500);
            return;
            function resetSelectedCards () {
                // console.log('doesnt match')
                // console.log(firstCard)
                // console.log(secondCard)
                firstCard.remove('is-flipped');
                secondCard.remove('is-flipped');
                // console.log(firstCard[2])
                // console.log(secondCard[2])
                return;
            }
            
        }
    }
    firstCard = this.classList;
    // console.log('firstCard is ' + firstCard)
    // console.log('count = ' + count)
}



function updateGuess (){
    guessCount -= 1;
    guessString = guessCount.toString();
    remainingGuess.innerHTML = `GUESSES LEFT: <strong>${guessString}</strong>`;
}


// lets figure out how to apply a 'new' card to an existing spot
// put all unique cards in an array?
// math random or random selector of element in array
// apply that to new card

// get all images
// assign random images square by square


// use a foreach loop to randomly push into array?
// another for each loop to assign into every cardback?

const cardsArr = Array.from(cards);
const imagesArr = Array.from(images);

let randomCardsArr = [];
let randomImageArr = [];
let randomIndex = [];

function shuffle() {
    // Images and card pairs are randomised together using the same randomised index arr
    randomCardsArr = [];
    randomImageArr = [];
    
    cardsArr.forEach((card, index) => {
        randomIndex.push(Math.floor(Math.random()*16));
        randomCardsArr.splice([randomIndex[index]],0,(card.classList[1]));
        // index += 1;
    })
    imagesArr.forEach((image, index) => {
        randomImageArr.splice([randomIndex[index]],0,(image));
        // index += 1;
    });
    console.log('index ' + randomIndex);
    console.log(randomImageArr)

    cardsArr.forEach((card, index) => {
        card.classList.remove(card.classList[1]);
        card.classList.add(randomCardsArr[index]);
        // index += 1;
        console.log(card.classList)
    })
    imagesArr.forEach((image,index) => {
        image.remove();
        cardBacks[index].appendChild(randomImageArr[index]);
        // index +=1;
    })
    console.log(randomImageArr)
}
    // imagesArr.forEach((image,index) => {
    //     // images[index].remove();
    //     image.remove();
    //     // console.log(imagesArr);
    //     console.log(images);
    //     // console.log('cardback is ' + cardBacks[index])
    //     cardBacks[index].appendChild(randomImageArr[index]);
    //     index += 1;
    //     // console.log(cardBacks);
    // })


    // console.log('random cards is ' + randomCardsArr)
    // console.log('random images is ' + randomImageArr)
    // console.log('randomIndex is ' + randomIndex)
    
function timer() {
    
}
// console.log(card.classList)

shuffle();