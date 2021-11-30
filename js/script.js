
/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const masterDeck = buildMainDeck();

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
let totalBalance = document.getElementById('balance')

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
    balance = balance - 50;
    console.log(balance)
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
    if (balance <= 0) {
        totalBalance.innerHTML = 'GAME OVER'
        return
    }
    hand.forEach(card => {
        const cardEl = document.createElement('div')
        cardEl.setAttribute('id', `cardslot${hand.indexOf(card)}`)
        cardEl.setAttribute('class', `card ${card.face}`)
        if (heldCards.some(heldCard => card.face === heldCard.face) && updateButton.innerText === 'Deal') {
            cardEl.classList.add('hold')
        }
        // goes through each card in hand and updates the DOM to show the up to date card
        // adds held card css class to cards that are clicked 
        container.append(cardEl)

        totalBalance.innerText = `Balance: ${balance}`;
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
        const splitFace = card.face.split('');
        const suit = splitFace.splice(0, 1).join('');
        const ranking = splitFace.join('');

        acc[suit] = acc[suit] ? acc[suit] + 1 : 1;
        acc[ranking] = acc[ranking] ? acc[ranking] + 1 : 1;
        return acc;
    }, {});


    const flush = isFlush(handTally);
    console.log('Is it a flush? ', flush)

    isPair(handTally);

    let three = isThreeOfaKind(handTally);
    console.log(`Is this three of a kind? ${three}`)

    let four = isFourOfaKind(handTally);
    console.log(`Is this four of a kind? ${four}`)

    let full = isFullHouse(handTally);

    let straight = isStraight(handTally)
    console.log(`Is this a straight? ${straight}`)

    let straightFlush = isStraightFlush(handTally)
    console.log(`Is this a straight flush? ${straightFlush}`)

    let royalFlush = isRoyalFlush(handTally)
    console.log(`Is this a royal flush? ${royalFlush}`)

    return handTally;
}

function isFlush(handTally) {
    return suits.every(suit => handTally[suit] === 5 || !handTally[suit])
}

function isPair(handTally) {
    let numOfPairs = 0;
    let onePair = false;
    ranks.forEach(rank => {

        if (handTally[rank] === 2) {
            numOfPairs++;
        }
    })
    if (numOfPairs > 1) {
        console.log('you got two pairs')
        balance = balance + 100;
    }
    else if (numOfPairs === 1) {
        console.log('you got one pair')
        balance = balance + 50;
    }
    return onePair;
}

function isThreeOfaKind(handTally) {
    let threeOfaKind = false;
    ranks.forEach(rank => {
        if (handTally[rank] === 3) {
            threeOfaKind = true;
            balance = balance + 150;
        }
    })
    return threeOfaKind;
}

function isFourOfaKind(handTally) {
    let fourOfaKind = false;
    ranks.forEach(rank => {
        if (handTally[rank] === 4) {
            fourOfaKind = true;
            balance = balance + 1250;
        }
    })
    return fourOfaKind;
}

function isStraight(handTally) {
    let straight = false;
    let counter = 0
    for (let i = 0; i < 8; i++) {
        for (let j = i; j < i + 5; j++) {
            if (!handTally[ranks[j]]) {
                counter = 0;
                break
            } else {
                counter++
            }
        }
        if (counter === 5) {
            straight = true;
            balance = balance + 200;
            break
        }
    }
    return straight;


}

function isFullHouse(handTally) {
    let fullHouse = false;
    if (isThreeOfaKind === true && isPair === true) {
        fullHouse = true;
        balance = balance + 450;
    }
    return fullHouse;
}

function isStraightFlush(handTally) {
    let straightFlush = false;
    if (isStraight === true && isFlush === true) {
        straightFlush = true;
        balance = balance + 2500;
    }
    return straightFlush;
}

function isRoyalFlush(handTally) {
    let royalFlush = false;
    royalCounter = 0;
    for (let i = 9; i < 15; i++) {
        if (!handTally[ranks[i]]) {
            royalCounter = 0;
        }
        else {
            royalCounter++
        }
    }
    if (royalCounter === 5) {
        royalFlush = true;
        balance = balance + 12500;
    }
    return royalFlush;
}
