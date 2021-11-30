
/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const masterDeck = buildMainDeck();

const winCombinations = {
    // 'royalFlush': {
    //     's': 5,
    //     'c': 5,
    //     'd': 5,
    //     'h': 5,
    //     '10': 1,
    //     'J': 1,
    //     'Q': 1,
    //     'K': 1,
    //     'A': 1,
    // }
}

// renderInHTML(masterDeck, document.getElementById('mainCards'))


/*----- app's state (variables) -----*/
let shuffledDeck = [];
let hand;
let heldCards = [];
let balance = 1000;
let handTally;
let timesClicked = 0;


/*----- cached element references -----*/
const shuffledMainCards = document.getElementById('shuffledMainCards');
let container = document.getElementById('mainCards')

/*----- event listeners -----*/
document.querySelector('Button').addEventListener('click', timesClickedFunction);
document.getElementById('mainCards').addEventListener('click', holdCard);

/*----- functions -----*/
function timesClickedFunction() {
    timesClicked++;

    if (timesClicked % 2 == 0) {
        deal()
    }
    else {
        heldCards = []
        shuffleDeck()
    }

}
function shuffleDeck() {
    const tempDeck = [...masterDeck];
    shuffledDeck = [];
    updateButton = document.querySelector('button');

    while (tempDeck.length) {
        const rndIdx = Math.floor(Math.random() * tempDeck.length);
        shuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
    }

    if (updateButton.innerText === 'Draw') {
        updateButton.innerText = 'Deal';
        updateButton.setAttribute('id', 'Deal');
    }
    else {
        updateButton.innerText = 'Draw';
        updateButton.setAttribute('id', 'Draw');
    }

    hand = shuffledDeck.splice(0, 5);
    renderInHTML(hand, shuffledMainCards);
    return shuffledDeck;
}

function deal() {
    // second shuffle function. Only shuffles cards in hand that have not been held
    hand.forEach((card, idx) => {
        if (!heldCards.some(heldCard => card.face === heldCard.face)) {
            hand.splice(idx, 1, shuffledDeck.shift())
        }
    })
    if (updateButton.innerText === 'Draw') {
        updateButton.innerText = 'Deal';
        updateButton.setAttribute('id', 'Deal');
    } else {
        updateButton.innerText = 'Draw';
        updateButton.setAttribute('id', 'Draw');
    }
    heldCards = []
    // refreshes held card array for next round
    winCondition()
    renderInHTML()
}


function renderInHTML() {
    container.innerHTML = ''
    // clears out the previous cards to start fresh
    // All your render function needs to do is check the app's state for anything that will show up on screen,
    // and render the appropriate information to the DOM
    hand.forEach(card => {
        const cardEl = document.createElement('div')
        cardEl.setAttribute('id', `cardslot${hand.indexOf(card)}`)
        cardEl.setAttribute('class', `card ${card.face}`)
        if (heldCards.some(heldCard => card.face === heldCard.face)) {
            cardEl.classList.add('hold')
        }
        // goes through each card in hand and updates the DOM to show the up to date card
        // adds held card css class to cards that are clicked 

        container.append(cardEl)

    })
}

function buildMainDeck() {
    const mainDeck = [];
    suits.forEach(function (suit) {
        ranks.forEach(function (rank) {
            mainDeck.push({
                face: `${suit}${rank}`,
                value: Number(rank) || (rank === 'A' ? 11 : 10)
            });
        });
    });
    return mainDeck;
}

function holdCard(event) {
    //makes sure clicking on whitespace does not trigger function
    if (event.target.className.startsWith('card ')) {
        // grab the card class of the card we clicked
        const cardClass = event.target.className;
        // use the card class to find the card object in our hand
        const heldCard = hand.find(card => cardClass.includes(card.face));
        console.log(heldCards)
        console.log(hand)
        // makes sure the card in hand has the correct object property for face
        const isCardHeld = heldCards.some(card => cardClass.includes(card.face));
        // returns true if the card is already in the held cards array
        if (isCardHeld) {
            // remove the card from the heldCards Array
            // will need to use findIndex method to get idx
            // use idx in .splice to actually remove
            let unHeldCardIdx = heldCards.findIndex(card => card.face === heldCard.face);
            heldCards.splice(unHeldCardIdx, 1);
        } else {
            // add the card to the held cards array
            heldCards.push(heldCard);
        }
    }
    renderInHTML()
}


function winCondition() {
    handTally = hand.reduce((acc, card) => {
        const splitFace = card.face.split('')
        const suit = splitFace.splice(0, 1).join('')
        const ranking = splitFace.join('')

        acc[suit] = acc[suit] ? acc[suit] + 1 : 1;
        acc[ranking] = acc[ranking] ? acc[ranking] + 1 : 1;
        return acc
    }, {});
    
    return handTally
    // pairs
    // if (handTally.Number(02) = 2 || (handTally.Number(03) = 2) || (handTally.Number(04) = 2) ||
    //     (handTally.Number(05) = 2) || (handTally.Number(06) = 2) || (handTally.Number(07) = 2) ||
    //     (handTally.Number(08) = 2) || (handTally.Number(09) = 2) || (handTally.Number(10) = 2) ||
    //     (handTally.J = 2) || (handTally.Q = 2) || (handTally.K = 2) || (handTally.A = 2)) { 
    //     balance = balance + 50;
    // };
}


    // const suits = ['s', 'c', 'd', 'h'];
    // const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A']; 

//     const straights = ['02', '03', '04', '05', '06'];
// }

// tally cards in hand
// function pairJacksOrHigher() {
//     let numberOfJacks = 0;
//     let numberOfQueens = 0;
//     let numberOfKings = 0;
//     let numberOfAces = 0;
//     hand.forEach(playingCard => {
//         if (playingCard.face[1] === 'J') {
//             numberOfJacks++;
//         }
//     });
//     hand.forEach(playingCard => {
//         if (playingCard.face[1] === 'Q') {
//             numberOfQueens++;
//         }
//     });
//     hand.forEach(playingCard => {
//         if (playingCard.face[1] === 'K') {
//             numberOfKings++;
//         }
//     });
//     hand.forEach(playingCard => {
//         if (playingCard.face[1] === 'A') {
//             numberOfAces++;
//         }
//     });
//     if (numberOfJacks === 2 || numberOfQueens === 2 || numberOfKings === 2 || numberOfAces === 2) {
//         console.log('true');
//         return true;
//     }
//     else {
//         return false;
//     }
// }