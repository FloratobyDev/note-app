import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const calendarApi = createApi({
    reducerPath: "calendar",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4200',
        credentials: 'include',
    }),
    endpoints(builder) {
        return {
            fetchCalendar: builder.query({
                providesTags: () => {
                    return ['Calendar']
                },
                query: (currentDate) => {
                    console.log('refetching')
                    return {
                        url: "/calendar/fetch",
                        method: "GET",
                        params: {
                            currentDate: currentDate
                        }
                    }
                }
            }),
        }
    }
})

export const { useFetchCalendarQuery, useLazyFetchCalendarQuery } = calendarApi;

export { calendarApi };