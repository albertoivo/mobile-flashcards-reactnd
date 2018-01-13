import {
  ADD_DECK,
  RECEIVE_DECKS,
  ADD_CARD_TO_DECK,
  QUIZ_RESULT
} from '../actions/ActionTypes'

export default function decks(state = { decks: [] }, action) {
  switch (action.type) {
    case ADD_DECK: {
      const newDeck = state.decks.slice()
      newDeck.push(action.deck)
      return {
        ...state,
        decks: newDeck
      }
    }
    case RECEIVE_DECKS: {
      return Object.assign({}, state, {
        decks: action.decks
      })
    }
    case ADD_CARD_TO_DECK: {
      return {
        ...state,
        decks: state.decks.map(deck => {
          if (deck.id === action.deckId) {
            return {
              ...deck,
              decks: deck.cards.push(action.card)
            }
          }
          return deck
        })
      }
    }
    case QUIZ_RESULT: {
      return {
        ...state,
        decks: state.decks.map(deck => {
          if (deck.id === action.deckId) {
            return {
              ...deck,
              score:
                action.myAnswer === 'correct' ? deck.score + 1 : deck.score - 1,
              cardIndex:
                deck.cardIndex === deck.cards.length - 1
                  ? 0
                  : deck.cardIndex + 1
            }
            return deck
          }
        })
      }
    }
    default:
      return state
  }
}
