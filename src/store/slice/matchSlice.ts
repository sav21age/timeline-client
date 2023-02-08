import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
    matchStatus: string | number;

    matchdayDate: string | Date;
    matchdayDateDisabled: boolean;

    clubId: number | null;
    clubDisabled: boolean;
}

const initialState: State = {
    matchStatus: "SHOW_ALL",

    matchdayDate: "",
    matchdayDateDisabled: false,

    clubId: null,
    clubDisabled: false,
}

export const matchSlice = createSlice({
    name: "match",
    initialState,
    reducers: {
        setMatchStatus(state, action: PayloadAction<string | number>) {
            state.matchStatus = action.payload
        },
        setMatchdayDate(state, action: PayloadAction<string | Date>) {
            state.matchdayDate = action.payload
        },
        setClubId(state, action: PayloadAction<number | null>) {
            state.clubId = action.payload
        },
        setMatchdayDateDisabled(state, action: PayloadAction<boolean>) {
            state.matchdayDateDisabled = action.payload
        },
        setClubDisabled(state, action: PayloadAction<boolean>) {
            state.clubDisabled = action.payload
        },
    },
});

export default matchSlice.reducer;
