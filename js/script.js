
/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const masterDeck = buildMainDeck()

// renderInHTML(masterDeck, document.getElementById('mainCards'))

/*----- app's state (variables) -----*/
let shuffledDeck = []; 
let hand;
let heldCards = [];

/*----- cached element references -----*/
const shuffledMainCards = document.getElementById('shuffledMainCards')

/*----- event listeners -----*/
document.querySelector('button').addEventListener('click', shuffleDeck)
document.getElementById('mainCards').addEventListener('click', holdCard)

/*----- functions -----*/
function shuffleDeck() {
    const tempDeck = [...masterDeck];
    shuffledDeck = []
    while (tempDeck.length) {
        const rndIdx = Math.floor(Math.random() * tempDeck.length)
        shuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
    }

    hand = shuffledDeck.slice(0,5)
    renderInHTML(hand, shuffledMainCards)
    return hand
}

function renderInHTML(currentHand, shuffledMainCards) {
    shuffledMainCards.innerHTML = '';
    const cardsHTML = currentHand.reduce(function(html, card) {
        return html + `<div id="cardslot${currentHand.indexOf(card)}"class="card ${card.face}"></div>`;
    }, '')

    mainCards.innerHTML = cardsHTML
}

function buildMainDeck() {
    const mainDeck = [];
    suits.forEach(function(suit) {
        ranks.forEach(function(rank) {
            mainDeck.push({
                face: `${suit}${rank}`,
                value: Number(rank) || (rank === 'A' ? 11 : 10)
            })
        })
    })
    return mainDeck;
}

function holdCard(event) {
    // grab the card class of the card we clicked
    const cardClass = event.target.className.replace('card ', '')
    // use the card class to find the card object in our hand
    const heldCard = hand.find(card => card.face === cardClass)
    const isCardHeld = heldCards.some(card => card.face === cardClass)
    if(isCardHeld) {
        // remove the card from the heldCards Array
        // will need to use findIndex method to get idx
        // use idx in .splice to actually remove
        let unHeldCardIdx = heldCards.findIndex((card) => {heldCard})
        heldCards.splice(unHeldCardIdx, 1)
        console.log('held, will be removed from heldCards array')
    } else {
        // add the card to the held cards array
        heldCards.push(heldCard)
        console.log('push to heldCards array')
    }
}   

// function winCondition() {
//     // const suits = ['s', 'c', 'd', 'h'];
//     // // const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A']; 
//     // const pairJacksorHigher = [['J', 'J'], ['Q','Q'], ['K','K'], ['A','A']]
//     // const straights = ['02', '03', '04', '05', '06']
    
//     if ()
// }