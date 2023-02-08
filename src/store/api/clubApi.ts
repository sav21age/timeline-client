import { createApi } from "@reduxjs/toolkit/dist/query/react";
import ClubEndpoint from '../../endpoints/clubEndpoint';
import { IClub } from "../../models/IClub";
import { IClubDetail } from "../../models/IClubDetail";
import { baseQueryWithReauth } from "./intercetptorApi";

export const clubAPI = createApi({
    reducerPath: 'clubAPI',
    // baseQuery: fetchBaseQuery({ baseUrl: appConfig.API_URL }),
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        fetchAll: builder.query<{ clubs: IClub[], xTotalCount: number }, { page: number, per_page: number, sort_by: string, area_id: number | null }>({
            query: (params) => ({
                url: `${ClubEndpoint.getAll()}`,
                params: params
            }),
            transformResponse: (clubs: IClub[], meta) => {
                return { clubs, xTotalCount: Number(meta?.response?.headers.get('X-Total-Count')) }
            }
        }),
        fetchById: builder.query<IClubDetail, number>({
            query: (clubId) => ({
                url: `${ClubEndpoint.getById(clubId)}`,
            }),
        }),
        fetchBySeasonId: builder.query<IClub[], number>({
            query: (seasonId) => ({
                url: `${ClubEndpoint.getBySeasonId(seasonId)}`,
            }),
        })

    })
})