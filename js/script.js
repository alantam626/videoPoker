
/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const masterDeck = buildMainDeck()

// renderInHTML(masterDeck, document.getElementById('mainCards'))

/*----- app's state (variables) -----*/
let shuffledDeck;

/*----- cached element references -----*/
const shuffledMainCards = document.getElementById('shuffledMainCards')
/*----- event listeners -----*/
document.querySelector('button').addEventListener('click', renderShuffledDeck)
// document.getElementById('cardslot0').addEventListener('click', holdCard)
/*----- functions -----*/
function renderShuffledDeck() {
    const tempDeck = [...masterDeck];
    shuffledDeck = []
    
    while (tempDeck.length) {
        const rndIdx = Math.floor(Math.random() * tempDeck.length)
        shuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
    }

    const hand = shuffledDeck.slice(0,5)
    renderInHTML(hand, shuffledMainCards)
}

function renderInHTML(hand, shuffledMainCards) {
    shuffledMainCards.innerHTML = '';
    const cardsHTML = hand.reduce(function(html, card) {
        return html + `<div id="cardslot${hand.indexOf(card)}"class="card ${card.face}"></div>`;
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

// function holdCard() {
    // hand.indexOf(card)
// }