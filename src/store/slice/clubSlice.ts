import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
    sortBy: string;
    sortByDisabled: boolean;
    perPage: number;
    areaId: number | null;
}

const initialState: State = {
    sortBy: "country",
    sortByDisabled: false,
    perPage: 12,
    areaId: null,
}

export const clubSlice = createSlice({
    name: "club",
    initialState,
    reducers: {
        setSortBy(state, action: PayloadAction<string>) {
            state.sortBy = action.payload
        },
        setSortByDisabled(state, action: PayloadAction<boolean>) {
            state.sortByDisabled = action.payload
        },
        setPerPage(state, action: PayloadAction<number>) {
            state.perPage = action.payload
        },
        setAreaId(state, action: PayloadAction<number | null>) {
            state.areaId = action.payload
        },
    },
});

export default clubSlice.reducer;
