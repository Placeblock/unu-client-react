import { createSlice } from '@reduxjs/toolkit'

export const roomSlice = createSlice({
  name: 'room',
  initialState: {
    value: {
      "status":"LOBBY",
      "code":undefined,
      "players": [],
      "settings": {
        startCardAmount: 7,
        plus4OnPlus4: true,
        plus2OnPlus4: false,
        plus4OnPlus2: true,
        wishOnPlus4: true,
        plus4OnWish: true,
        wishOnWish: true,
      },
      "chat": {
        "messages": []
      },
      "owner": undefined
    }
  },
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
    }
  }
})

export function findPlayer(players, uuid) {
  return players.find(player => player.uuid==uuid);
}

export const { setCode, setState, setOwner, 
    setSetting, setSettings, addPlayer, setPlayerName, 
    removePlayer, removePlayers, setPlayers, addMessage, 
    removeMessage, removeMessages, setMessages } = roomSlice.actions

export default roomSlice.reducer