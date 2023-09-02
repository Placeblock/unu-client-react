import { createSlice } from '@reduxjs/toolkit'

export const roundSlice = createSlice({
  name: 'user',
  initialState: {
    value: {
        currentPlayer: null,
        currentCard: null,
        drawStack: 0,
        playerCards: {

        },
        players: [

        ],
        inventory: [
            
        ]
    }
  },
  reducers: {
    setCurrentCard: (state, action) => {
        state.value.currentCard = action.payload;
    },
    setCurrentPlayer: (state, action) => {
        state.value.currentPlayer = action.payload;
    },
    setDrawStack: (state, action) => {
        state.value.drawStack = action.payload;
    },
    setPlayers: (state, action) => {
        state.value.players = action.payload;
    },
    removePlayer: (state, action) => {
        const i = state.value.players.findIndex(player => player.uuid==action.payload);
        state.value.players.splice(i, 1);
    },
    setInventory: (state, action) => {
        state.value.inventory = action.payload;
    },
    addCard: (state, action) => {
        state.value.inventory.push(action.payload);
    },
    removeCard: (state, action) => {
        const i = state.value.inventory.findIndex(card => card.uuid==action.payload);
        state.value.inventory.splice(i, 1);
    },
    setPlayersCards: (state, action) => {
        state.value.playerCards = action.payload;
    },
    setPlayerCards: (state, action) => {
        state.value.playerCards[action.payload.uuid] = action.payload.amount;
    }
  }
})

export const { setCurrentPlayer, setDrawStack, setPlayers,
    removePlayer, setInventory, addCard, setPlayersCards,
    setPlayerCards, setCurrentCard, removeCard } = roundSlice.actions

export function setRoundData(dispatch, roundData) {
    dispatch(setCurrentPlayer(roundData.current_player));
    dispatch(setDrawStack(roundData.draw_stack));
    dispatch(setPlayersCards(roundData.player_cards));
    dispatch(setPlayers(roundData.players));
    const placedCards = roundData.placed_cards;
    dispatch(setCurrentCard(placedCards[placedCards.length-1]));
}

export default roundSlice.reducer