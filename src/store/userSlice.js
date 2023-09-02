import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {}
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUserUUID: (state, action) => {
        state.value.uuid = action.payload;
    },
    setUserName: (state, action) => {
        state.value.name = action.payload;
    },
    resetUser: () => initialState
  }
})

export const { setUserUUID, setUserName, resetUser } = userSlice.actions

export default userSlice.reducer