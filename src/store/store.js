import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import roomSlice from "./roomSlice";
import cardStackSlice from "./cardStackSlice";
import roundSlice from "./roundSlice";

export default configureStore({
    reducer: {
        user: userSlice,
        room: roomSlice,
        cardStack: cardStackSlice,
        round: roundSlice
    }
})