import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice"
import appReducer from "./slice/appSlice"
import matchReducer from "./slice/matchSlice"
import clubReducer from "./slice/clubSlice"
import { areaAPI } from "./api/areaApi";
import { clubAPI } from "./api/clubApi";
import { competitionAPI } from "./api/competitionApi";
import { authAPI } from "./api/authApi";
import { seasonAPI } from "./api/seasonApi";
import { matchAPI } from "./api/matchApi";

const rootReducer = combineReducers({
    // competitionReducer,
    // seasonReducer,
    authReducer,
    appReducer,
    matchReducer,
    clubReducer,
    [areaAPI.reducerPath]: areaAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [clubAPI.reducerPath]: clubAPI.reducer,
    [matchAPI.reducerPath]: matchAPI.reducer,
    [competitionAPI.reducerPath]: competitionAPI.reducer,
    [seasonAPI.reducerPath]: seasonAPI.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({ serializableCheck: false })
                .concat(areaAPI.middleware)
                .concat(clubAPI.middleware)
                .concat(competitionAPI.middleware)
                .concat(authAPI.middleware)
                .concat(seasonAPI.middleware)
                .concat(matchAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
