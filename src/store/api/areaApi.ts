import { createApi } from "@reduxjs/toolkit/dist/query/react";
import ClubEndpoint from "../../endpoints/clubEndpoint";
import { IClubArea } from "../../models/IClub";
import { baseQueryWithReauth } from "./intercetptorApi";


export const areaAPI = createApi({
    reducerPath: 'areaAPI',
    // baseQuery: fetchBaseQuery({ baseUrl: appConfig.API_URL }),
    baseQuery: baseQueryWithReauth,
    endpoints: (build) => ({
        fetchAllArea: build.query<IClubArea[], "">({
            query: () => ({
                url: `${ClubEndpoint.getAreaAll()}`,
            }),
        })
    })
})
