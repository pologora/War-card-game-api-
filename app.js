const buttonGetCards = document.querySelector('.get-card-button')
const topCardContainer = document.querySelector('.card-container-top')
const bottomCardContainer = document.querySelector('.card-container-bottom')
const shuffleDeck = document.getElementById('shuffle')
const table = document.getElementById('table')
const winnerTextPlaceholder = document.getElementById('winnerText')
const remainingCards = document.getElementById('remaining-cards')
const computerScoreHolder = document.getElementById('computer-score')
const playerScoreHolder = document.getElementById('player-score')

let computerScore = 0
let playerScore = 0
let deckId = ''


async function getNewDeck() {
    buttonGetCards.disabled = false;
    shuffleDeck.disabled = false;
    computerScore = 0
    computerScoreHolder.textContent = computerScore
    playerScore = 0
    playerScoreHolder.textContent = playerScore
    winnerTextPlaceholder.textContent = 'Game of War'

    const res = await fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    const data = await res.json()
    deckId = data.deck_id
    console.log(data)
    remainingCards.textContent = data.remaining
}

const getTwoCard = () => {
    if (deckId) {
        fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                topCardContainer.innerHTML = getHtmlUrlImgOfCard(data.cards[0].image)
                bottomCardContainer.innerHTML = getHtmlUrlImgOfCard(data.cards[1].image)
                winnerTextPlaceholder.textContent = getWinner(data.cards[0].value, data.cards[1].value)
                remainingCards.textContent = data.remaining

                if (data.remaining <= 0) {
                    buttonGetCards.disabled = true;
                    shuffleDeck.disabled = true;
                    if (playerScore > computerScore) {
                        winnerTextPlaceholder.textContent =
                            `Player Wins with a score ${playerScore} : ${computerScore}  `
                    } else if (computerScore > playerScore) {
                        winnerTextPlaceholder.textContent =
                            `Computer Wins with a score ${computerScore} : ${playerScore}`
                    } else {
                        winnerTextPlaceholder.textContent =
                            `It\`s a Tie ${computerScore} : ${playerScore}`
                    }

                }
            })
    }
}
const getCardValue = (card) => {
    let result
    switch (card) {
        case "JACK":
            return result = 11;
        case "QUEEN":
            return result = 12;
        case "KING":
            return result = 13;
        case "ACE":
            return result = 14;
        default:
            return result = +card

    }
}

// function determineCardWinner(card1, card2) {
//     const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
//     "10", "JACK", "QUEEN", "KING", "ACE"]
//     const card1ValueIndex = valueOptions.indexOf(card1.value)
//     const card2ValueIndex = valueOptions.indexOf(card2.value)
//     console.log(card1ValueIndex)
//     console.log(card2ValueIndex)
// }


//determinate a winner, return a string 
const getWinner = (card1, card2) => {
    const topCardValue = getCardValue(card1)
    const bottomCardValue = getCardValue(card2)
    if (topCardValue > bottomCardValue) {
        computerScore++
        computerScoreHolder.textContent = computerScore
        return "Computer wins!"
    } else if (topCardValue < bottomCardValue) {
        playerScore++
        playerScoreHolder.textContent = playerScore
        return "Player wins!"
    } return "War!"
}

const getHtmlUrlImgOfCard = url => {
    return `
    <img src="${url}" alt="Image of card" />
    `
}

document.querySelector('.deck-getter').addEventListener('click', getNewDeck)
buttonGetCards.addEventListener('click', getTwoCard)