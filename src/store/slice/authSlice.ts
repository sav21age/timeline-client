import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";

interface UserState {
    data: IUser;
    isAuth: boolean;
    accessToken: string;
}

const initialState: UserState = {
    data: {} as IUser,
    isAuth: false,
    accessToken: "",
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload
        },
        setData(state, action: PayloadAction<IUser>) {
            state.data = action.payload
        },
        setAccessToken(state, action: PayloadAction<string>) {
            state.accessToken = action.payload
        },
    },
});

export default authSlice.reducer;
