
/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const masterDeck = buildMainDeck();

// renderInHTML(masterDeck, document.getElementById('mainCards'))


/*----- app's state (variables) -----*/
let shuffledDeck = [];
let hand;
let heldCards = [];
let balance = 0;

let timesClicked = 0;

/*----- cached element references -----*/
const shuffledMainCards = document.getElementById('shuffledMainCards');

/*----- event listeners -----*/
document.querySelector('Button').addEventListener('click', timesClickedFunction);
document.getElementById('mainCards').addEventListener('click', holdCard);

/*----- functions -----*/
function timesClickedFunction() {
    timesClicked++;

    if (timesClicked % 2 == 0)
    {
        deal()
    }
    else {
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
        updateButton.setAttribute('id','Deal');
    }
    else {
        updateButton.innerText = 'Draw';
        updateButton.setAttribute('id','Draw');
    }

    hand = shuffledDeck.splice(0, 5);
    renderInHTML(hand, shuffledMainCards);
    return shuffledDeck;
}

function deal() {
        hand.forEach((card, idx) => { 
            if (/* for each card in hand that is not already held*/)
            hand.splice(idx, 1, shuffledDeck.shift())
    })
    if (updateButton.innerText === 'Draw') {
        updateButton.innerText = 'Deal';
        updateButton.setAttribute('id','Deal');
    }
    else {
        updateButton.innerText = 'Draw';
        updateButton.setAttribute('id','Draw');
    }}


function renderInHTML(currentHand, shuffledMainCards) {
    shuffledMainCards.innerHTML = '';
    const cardsHTML = currentHand.reduce(function (html, card) {
        return html + `<div id="cardslot${currentHand.indexOf(card)}"class="card ${card.face}"></div>`;
    }, '');

    mainCards.innerHTML = cardsHTML;
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
        const cardClass = event.target.className.replace('card ', '');
        // use the card class to find the card object in our hand
        const heldCard = hand.find(card => card.face === cardClass);
        const isCardHeld = heldCards.some(card => card.face === cardClass);
        if (isCardHeld) {
            // remove the card from the heldCards Array
            // will need to use findIndex method to get idx
            // use idx in .splice to actually remove
            let unHeldCardIdx = heldCards.findIndex((card) => { heldCard });
            heldCards.splice(unHeldCardIdx, 1);
            console.log('held, will be removed from heldCards array');
        } else {
            // add the card to the held cards array
            heldCards.push(heldCard);

            console.log('push to heldCards array');
        }
    }

}


// function winCondition() {
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