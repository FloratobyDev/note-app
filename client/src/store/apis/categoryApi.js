import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const categoryApi = createApi({
    reducerPath: "category",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4200',
        credentials: 'include'
    }),
    endpoints(builder) {
        return {
            fetchCategory: builder.query({
                providesTags: () => {
                    return ['Category']
                },
                query: (category) => {
                    return {
                        url: "/category/fetch",
                        method: "GET",
                    }
                }
            }),
            addCategory: builder.mutation({
                invalidatesTags: () => {
                    return ['Category']
                },
                query: (category) => {
                    return {
                        url: "/category/create",
                        method: "POST",
                        body: category
                    }
                }
            }),
            removeCategory: builder.mutation({
                invalidatesTags: () => {
                    return ['Category']
                },
                query: (category) => {
                    return {
                        url: "/category/remove",
                        method: "DELETE",
                        body: category
                    }
                }
            })
        }
    }
})

export const { useAddCategoryMutation, useFetchCategoryQuery, useRemoveCategoryMutation } = categoryApi;

export { categoryApi };