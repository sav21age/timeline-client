import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RootState } from '..';
import { appConfig } from "../../appConfig";
import authEndpoint from "../../endpoints/authEndpoint";
import { ISignIn } from "../../models/IUser";

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: appConfig.API_URL,
        prepareHeaders: (headers, { getState }) => {
            const accessToken = (getState() as RootState).authReducer.accessToken;
            if (accessToken) {
                headers.set("Authorization", `Bearer ${accessToken}`);
            }
            return headers;
        },
        credentials: "include",
        mode: "cors",
    }),
    endpoints: (builder) => ({
        refresh: builder.query<ISignIn, void>({
            query: () => ({
                url: `${authEndpoint.refresh()}`,
            }),
            // async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
            //     const result = await fetchWithBQ(`${authEndpoint.refresh()}`)
            //     return result.data
            //         ? { data: result.data as ISignIn }
            //         : { error: result.error as FetchBaseQueryError }
            // },
        }),
        signIn: builder.query<ISignIn, "">({
            query: (body) => ({
                url: `${authEndpoint.signIn()}`,
                method: 'POST',
                body,
            }),
        }),
        signOut: builder.query<any, void>({
            query: () => ({
                url: `${authEndpoint.signOut()}`,
            }),
            // transformResponse: (response) => {
            //     console.log(response)
            // }
        }),
        signUp: builder.query<any, "">({
            query: (body) => ({
                url: `${authEndpoint.signUp()}`,
                method: 'POST',
                body,
            }),
        }),
        accountActivate: builder.query<any, string>({
            query: (code) => ({
                url: `${authEndpoint.accountActivate(code)}`,
            }),
        }),
        accountActivateResendCode: builder.query<any, "">({
            query: (body) => ({
                url: `${authEndpoint.accountActivateResendCode()}`,
                method: 'POST',
                body,
            }),
        }), 
        passwordRecovery: builder.query<any, "">({
            query: (body) => ({
                url: `${authEndpoint.passwordRecovery()}`,
                method: 'POST',
                body,
            }),
        }),
        passwordRecoveryCodeVerify: builder.query<any, "">({
            query: (code) => ({
                url: `${authEndpoint.passwordRecoveryCodeVerify(code)}`,
            }),
        }),
        setNewPassword: builder.query<any, "">({
            query: (body) => ({
                url: `${authEndpoint.setNewPassword()}`,
                method: 'POST',
                body,
            }),
        }),
    })
})


// const baseQuery = fetchBaseQuery({
//     baseUrl: BASE_URL,
//     prepareHeaders: (headers, { getState }) => {
//         const {
//             auth: {
//                 user: { accessToken },
//             },
//         } = getState() as RootState;
//         if (accessToken) {
//             headers.set('authorization', `Bearer ${accessToken}`);
//         }
//         return headers;
//     },
// });

// const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
//     args,
//     api,
//     extraOptions
// ) => {
//     let result = await baseQuery(args, api, extraOptions);

//     if (result.error && result.error.status === 401) {
//         const refreshResult = await baseQuery('token/refresh/', api, extraOptions);

//         if (refreshResult.data) {
//             api.dispatch(tokenUpdated({ accessToken: refreshResult.data as string }));

//             // retry the initial query
//             result = await baseQuery(args, api, extraOptions);
//         } else {
//             api.dispatch(logout());
//         }
//     }
//     return result;
// };

// export const baseApi = createApi({
//     reducerPath: 'baseApi',
//     baseQuery: baseQueryWithReauth,
//     endpoints: () => ({}),
// });

// baseQuery({
//     url: 'token/refresh/',
//     method: 'POST'
// }, api, extraOptions);