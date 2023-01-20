import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";


const userApi = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4200',
        credentials: 'include'
    }),
    endpoints(builder) {
        return {
            addUser: builder.mutation({
                query: (user) => {
                    return {
                        url: "/register",
                        method: "POST",
                        body: user,

                    }
                }
            }),
            validateUser: builder.mutation({
                query: (user) => {
                    return {
                        url: "/login",
                        method: "POST",
                        body: user
                    }
                }
            })
        }
    }
})

export const { useValidateUserMutation, useAddUserMutation } = userApi
export { userApi }