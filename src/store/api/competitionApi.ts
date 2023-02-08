import { FetchBaseQueryError, createApi } from "@reduxjs/toolkit/dist/query/react";
import CompetitionEndpoint from "../../endpoints/competitionEndpoint";
import { ICompetition } from "../../models/ICompetition";
import { baseQueryWithReauth } from "./intercetptorApi";

export const competitionAPI = createApi({
    reducerPath: 'competitionAPI',
    // baseQuery: fetchBaseQuery({ baseUrl: appConfig.API_URL }),
    baseQuery: baseQueryWithReauth,
    endpoints: (build) => ({
        // fetchAll: build.query<ICompetition[], "">({
        //     query: () => ({
        //         url: `${CompetitionEndpoint.getAll()}`,
        //     }),
        // }),
        fetchAll: build.query<ICompetition[], void>({
            async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
                const result = await fetchWithBQ(`${CompetitionEndpoint.getAll()}`)
                return result.data
                    ? { data: result.data as ICompetition[] }
                    : { error: result.error as FetchBaseQueryError }
            },
        }),
        fetchById: build.query<ICompetition, number>({
            query: (competitionId) => ({
                url: `${CompetitionEndpoint.getById(competitionId)}`,
            }),
        })
    })
})
