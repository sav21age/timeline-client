import { createApi } from "@reduxjs/toolkit/dist/query/react";
import MatchEndpoint from "../../endpoints/matchEndpoint";
import { IMatch } from "../../models/IMatch";
import { IMatchDetail } from "../../models/IMatchDetail";
import { baseQueryWithReauth } from "./intercetptorApi";

export const matchAPI = createApi({
    reducerPath: 'matchAPI',
    // baseQuery: fetchBaseQuery({ baseUrl: appConfig.API_URL }),
    baseQuery: baseQueryWithReauth,
    endpoints: (build) => ({
        fetchById: build.query<IMatchDetail, number>({
            query: (matchId) => ({
                url: `${MatchEndpoint.getById(matchId)}`,
            }),
        }),
        fetchAll: build.query<IMatch[], { competitionId: number, seasonId: number }>({
            query: (data) => ({
                url: `${MatchEndpoint.getAll(data.competitionId, data.seasonId)}`,
            }),
        }),
        fetchAllDates: build.query<string[], { competitionId: number, seasonId: number }>({
            query: (data) => ({
                url: `${MatchEndpoint.getAllDates(data.competitionId, data.seasonId)}`,
            }),
        })
    })
})
