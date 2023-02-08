import { createApi } from "@reduxjs/toolkit/dist/query/react";
import SeasonEndpoint from "../../endpoints/seasonEndpoint";
import { ISeason } from "../../models/ISeason";
import { baseQueryWithReauth } from "./intercetptorApi";

export const seasonAPI = createApi({
    reducerPath: 'seasonAPI',
    // baseQuery: fetchBaseQuery({ baseUrl: appConfig.API_URL }),
    baseQuery: baseQueryWithReauth,
    endpoints: (build) => ({
        fetchAll: build.query<{ seasons: ISeason[], xTotalCount: number }, any>({
            query: (data) => ({
                url: `${SeasonEndpoint.getAll(data.competitionId)}`,
                params: data.params
            }),
            transformResponse: (seasons: ISeason[], meta) => {
                return { seasons, xTotalCount: Number(meta?.response?.headers.get('X-Total-Count')) }
            }
        }),
        fetchById: build.query<ISeason, number>({
            query: (seasonId) => ({
                url: `${SeasonEndpoint.getById(seasonId)}`,
            }),
        })
    })
})
