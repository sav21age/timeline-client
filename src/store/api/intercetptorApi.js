import { fetchBaseQuery } from '@reduxjs/toolkit/query'
// import type {
//     BaseQueryFn,
//     FetchArgs,
//     FetchBaseQueryError,
// } from '@reduxjs/toolkit/query'
// import { Mutex } from 'async-mutex'
import authEndpoint from '../../endpoints/authEndpoint'
import { appConfig } from '../../appConfig'
import {authSlice} from '../slice/authSlice'
// import { RootState } from '..'


const baseQuery = fetchBaseQuery({ baseUrl: appConfig.API_URL,
    prepareHeaders: (headers, { getState }) => {
        const accessToken = getState().authReducer.accessToken;
        if (accessToken) {
            headers.set("Authorization", `Bearer ${accessToken}`);
        }
        return headers;
    },
    credentials: "include",
    mode: "cors",
})
export const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        // try to get a new token
        const refreshResult = await baseQuery(`${authEndpoint.refresh()}`, api, extraOptions)
        if (refreshResult.data) {
            // store the new token
            // api.dispatch(tokenReceived(refreshResult.data))

            api.dispatch(authSlice.actions.setAccessToken(refreshResult?.data.accessToken));
            api.dispatch(authSlice.actions.setIsAuth(true));
            api.dispatch(authSlice.actions.setData(refreshResult?.data.user));

            // retry the initial query
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(`${authEndpoint.signOut()}`)
        }
    }
    return result
}

// export const baseQueryWithReauth: BaseQueryFn<
//     string | FetchArgs,
//     unknown,
//     FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//     let result = await baseQuery(args, api, extraOptions)
//     if (result.error && result.error.status === 401) {
//         // try to get a new token
//         const refreshResult = await baseQuery(`${authEndpoint.refresh()}`, api, extraOptions)
//         if (refreshResult.data) {
//             // store the new token
//             // api.dispatch(tokenReceived(refreshResult.data))


//             console.log("refreshResult:")
//             console.log(refreshResult)
//             api.dispatch(authSlice.actions.setAccessToken(refreshResult?.data.accessToken));
//             api.dispatch(authSlice.actions.setIsAuth(true));
//             api.dispatch(authSlice.actions.setData(refreshResult?.data.user));

//             // retry the initial query
//             result = await baseQuery(args, api, extraOptions)
//         } else {
//             api.dispatch(`${authEndpoint.signOut()}`)
//         }
//     }
//     return result
// }

// // create a new mutex
// const mutex = new Mutex()
// const baseQuery = fetchBaseQuery({ baseUrl: appConfig.API_URL })
// const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
//     async (args, api, extraOptions) => {
//         // wait until the mutex is available without locking it
//         await mutex.waitForUnlock()
//         let result = await baseQuery(args, api, extraOptions)
//         console.log("fire!")
//         if (result.error && result.error.status === 401) {
//             // checking whether the mutex is locked
//             if (!mutex.isLocked()) {
//                 const release = await mutex.acquire()
//                 try {
//                     const refreshResult = await baseQuery(`${authEndpoint.refresh()}`, api, extraOptions)
//                     console.log(refreshResult)
//                     if (refreshResult.data) {
//                         // api.dispatch(tokenReceived(refreshResult.data))
//                         // api.dispatch(authSlice.actions.setAccessToken(refreshResult.data.accessToken));
//                         // api.dispatch(authSlice.actions.setIsAuth(true));
//                         // api.dispatch(authSlice.actions.setData(refreshResult.data.user));
//                         // retry the initial query
//                         result = await baseQuery(args, api, extraOptions)
//                     } else {
//                         api.dispatch(`${authEndpoint.signOut()}`)
//                     }
//                 } finally {
//                     // release must be called once the mutex should be released again.
//                     release()
//                 }
//             } else {
//                 // wait until the mutex is available without locking it
//                 await mutex.waitForUnlock()
//                 result = await baseQuery(args, api, extraOptions)
//             }
//         }
//         return result
//     }