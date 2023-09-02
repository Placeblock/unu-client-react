import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    "status":"LOBBY",
    "code":undefined,
    "players": [],
    "settings": {
      start_card_amount: 7,
      plus4_on_plus4: true,
      plus2_on_plus4: false,
      plus4_on_plus2: true,
      wish_on_plus4: true,
      plus4_on_wish: true,
      wish_on_wish: true,
    },
    "chat": {
      "messages": []
    },
    "owner": undefined,
    "cardDeckPresets": [

    ]
  }
}

export const roomSlice = createSlice({
  name: 'room',
  initialState: initialState,
  reducers: {
    setCode: (state, action) => {
      state.value.code = action.payload
    },
    setState: (state, action) => {
      state.value.status = action.payload
    },
    setOwner: (state, action) => {
      state.value.owner = action.payload
    },
    setSettings: (state, action) => {
      state.value.settings = action.payload
    },
    setSetting: (state, action) => {
      state.value.settings[action.payload.key] = action.payload.value
    },
    addPlayer: (state, action) => {
      state.value.players.push(action.payload);
    },
    setPlayerName: (state, action) => {
      const i = state.value.players.findIndex(player => player.uuid==action.payload.player);
      state.value.players[i].name = action.name;
    },
    removePlayer: (state, action) => {
      const i = state.value.players.findIndex(player => player.uuid==action.payload);
      state.value.players.splice(i, 1);
    },
    removePlayers: (state) => {
      state.values.players = [];
    },
    setPlayers: (state, action) => {
      state.value.players = action.payload;
    },
    addMessage: (state, action) => {
      state.value.chat.messages.push(action.payload);
    },
    removeMessage: (state, action) => {
      const i = state.value.chat.messages.findIndex(message => message.uuid==action.payload);
      state.value.chat.messages.splice(i, 1);
    },
    removeMessages: (state) => {
      state.value.chat.messages = [];
    },
    setMessages: (state, action) => {
      state.value.chat.messages = action.payload;
    },
    setCardDeckPresets: (state, action) => {
      state.value.cardDeckPresets = action.payload;
    },
    resetRoom: () => initialState
  }
})

export function findPlayer(players, uuid) {
  return players.find(player => player.uuid==uuid);
}

export const { setCode, setState, setOwner, 
    setSetting, setSettings, addPlayer, setPlayerName, 
    removePlayer, removePlayers, setPlayers, addMessage, 
    removeMessage, removeMessages, setMessages, setCardDeckPresets, resetRoom } = roomSlice.actions

export default roomSlice.reducer