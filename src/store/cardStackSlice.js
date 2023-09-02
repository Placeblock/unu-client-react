import { createSlice } from '@reduxjs/toolkit'

export const cardStackSlice = createSlice({
  name: 'user',
  initialState: {
    value: [
        
    ]
  },
  reducers: {
    setCardStack: (state, action) => {
        state.value = action.payload
    },
    addGroup: (state, action) => {
        state.value.push({
            amount: 1,
            cards: action.payload
        });
    },
    removeGroup: (state, action) => {
        state.value.splice(action.payload, 1);
    },
    setAmount: (state, action) => {
        state.value[action.payload.index].amount = action.payload.amount;
    }
  }
})

export const { setCardStack } = cardStackSlice.actions

export default cardStackSlice.reducer