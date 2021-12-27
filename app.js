const buttonGetCards = document.querySelector('.get-card-button')
const topCardContainer = document.querySelector('.card-container-top')
const bottomCardContainer = document.querySelector('.card-container-bottom')
const table = document.getElementById('table')

let deckId = ''
const getNewDeck = () => {
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id
        })
}

const getTwoCard = () => {
    if (deckId) {

        fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                // topCardContainer.innerHTML = getHtmlUrlImgOfCard(data.cards[0].image)
                // bottomCardContainer.innerHTML = getHtmlUrlImgOfCard(data.cards[1].image)
                for (let index = 0; index < table.children.length; index++) {
                    table.children[index].innerHTML = getHtmlUrlImgOfCard(data.cards[index].image)

                }
            })
    }
}
const getHtmlUrlImgOfCard = url => {
    return `
    <img src="${url}" alt="Image of card" />
    `
}

document.querySelector('.deck-getter').addEventListener('click', getNewDeck)
buttonGetCards.addEventListener('click', getTwoCard)