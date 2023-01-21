import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const tasksApi = createApi({
    reducerPath: "tasks",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4200',
        credentials: 'include'
    }),
    endpoints(builder) {
        return {
            fetchTask: builder.query({
                providesTags: (result, error, taskDate) => {
                    return ['Task']
                },
                query: (task) => {
                    return {
                        url: "/tasks/fetch",
                        method: "GET",
                        params: {
                            dateCreated: task
                        }
                    }
                }
            }),
            addTask: builder.mutation({
                invalidatesTags: (results, error, task) => {
                    return ['Task']
                },
                query: (task) => {
                    return {
                        url: "/tasks/create",
                        method: "POST",
                        body: task
                    }
                }
            }),
            updateTask: builder.mutation({
                invalidatesTags: (results, error, task) => {
                    return ['Task', 'Calendar']
                },
                query: (task) => {
                    return {
                        url: "/tasks/update",
                        method: "PATCH",
                        body: task,
                        params: {
                            renew: task.renew
                        }
                    }
                }
            }),
            removeTask: builder.mutation({
                invalidatesTags: () => {
                    return ['Task']
                },
                query: (task) => {
                    return {
                        url: "/tasks/remove",
                        method: "DELETE",
                        body: task
                    }
                }
            })
        }
    }
})

export const { useAddTaskMutation, useUpdateTaskMutation, useFetchTaskQuery, useLazyFetchTaskQuery, useRemoveTaskMutation } = tasksApi;

export { tasksApi };