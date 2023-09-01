import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: {}
  },
  reducers: {
    setUserUUID: (state, action) => {
        state.value.uuid = action.payload;
    },
    setUserName: (state, action) => {
        state.value.name = action.payload;
    }
  }
})

export const { setUserUUID, setUserName } = userSlice.actions

export default userSlice.reducer