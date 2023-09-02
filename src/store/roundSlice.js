import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {
        currentPlayer: null,
        currentCard: null,
        drawStack: 0,
        showColorPicker: false,
        playerCards: {

        },
        players: [

        ],
        inventory: [
            
        ]
    }
  }

export const roundSlice = createSlice({
  name: 'user',
  initialState: initialState,
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
        const i = state.value.players.indexOf(action.uuid);
        state.value.players.splice(i, 1);
    },
    setInventory: (state, action) => {
        state.value.inventory = action.payload;
    },
    sortInventory: (state) => {
        state.value.inventory.sort((a, b) => {
            const aWeight = getWeight(a);
            const bWeight = getWeight(b);
            if(aWeight == bWeight) return 0;
            return aWeight > bWeight ? 1 : -1
        })
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
    },
    setShowColorPicker: (state, action) => {
        state.value.showColorPicker = action.payload;
    },
    resetRound: () => initialState
  }
})

export const { setCurrentPlayer, setDrawStack, setPlayers,
    removePlayer, setInventory, addCard, setPlayersCards,
    setPlayerCards, setCurrentCard, removeCard, resetRound,
    sortInventory, setShowColorPicker } = roundSlice.actions

export function setRoundData(dispatch, roundData) {
    dispatch(setCurrentPlayer(roundData.current_player));
    dispatch(setDrawStack(roundData.draw_stack));
    dispatch(setPlayersCards(roundData.player_cards));
    dispatch(setPlayers(roundData.players));
    const placedCards = roundData.placed_cards;
    dispatch(setCurrentCard(placedCards[placedCards.length-1]));
}

export default roundSlice.reducer

//SORTING

function getWeight(card) {
    let weight = 0;
    if ("color" in card) {
        weight += colors[card.color];
        if ("number" in card) {
            weight += card["number"];
        } else {
            weight += 10;
        }
    } else if (card["type"] == "wish") {
        weight += 50;
    } else if (card["type"] == "draw_4") {
        weight += 51;
    }
    return weight;
}

const colors = {
    "RED": 0,
    "BLUE": 11,
    "GREEN": 22,
    "YELLOW": 33,
}