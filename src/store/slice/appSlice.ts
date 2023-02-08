import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCookie } from "../../utils/cookies"

let darkMode = false;
const darkModeCookie = getCookie("darkMode");
if (darkModeCookie === "1") {
    darkMode = true
}

interface AppState {
    darkMode: boolean;
}

const initialState: AppState = {
    darkMode: darkMode,
}

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setDarkMode(state, action: PayloadAction<boolean>) {
            state.darkMode = action.payload
        },
    },
});

export default appSlice.reducer;
