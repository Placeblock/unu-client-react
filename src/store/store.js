import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import roomSlice from "./roomSlice";
import cardDeckSlice from "./cardDeckSlice";
import roundSlice from "./roundSlice";

export default configureStore({
    reducer: {
        user: userSlice,
        room: roomSlice,
        cardDeck: cardDeckSlice,
        round: roundSlice
    }
})