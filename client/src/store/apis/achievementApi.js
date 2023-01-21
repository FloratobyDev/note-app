import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const achievementApi = createApi({
    reducerPath: "achievement",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4200',
        credentials: 'include',
    }),
    endpoints(builder) {
        return {
            fetchAchievements: builder.query({
                query: () => {
                    return {
                        url: "/achievement",
                        method: "GET"
                    }
                }
            })
        }
    }
})

export const { useFetchAchievementsQuery } = achievementApi;

export { achievementApi };