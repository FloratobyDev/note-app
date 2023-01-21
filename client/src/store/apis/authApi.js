import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
    reducerPath: "auth",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4200',
        credentials: 'include',
    }),
    endpoints(builder) {
        return {
            authenticateUser: builder.query({
                providesTags: () => {
                    return ['Auth']
                },
                query: () => {
                    return {
                        url: "/authenticate",
                        method: "GET"
                    }
                }
            }),
            authenticateAdmin: builder.query({
                providesTags: () => {
                    return ['Auth']
                },
                query: () => {
                    return {
                        url: "/authenticate/admin",
                        method: "GET"
                    }
                }
            })
        }
    }
})

export const { useAuthenticateAdminQuery, useAuthenticateUserQuery } = authApi;

export { authApi };