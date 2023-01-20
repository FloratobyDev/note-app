import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import { categoryApi } from "./apis/categoryApi";
import { tasksApi } from "./apis/tasksApi";
import { userApi } from "./apis/userApi";

export const store = configureStore({
    reducer: {
        [tasksApi.reducerPath]: tasksApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer
    },
    middleware: (defaultMiddleware) => {
        return defaultMiddleware()
            .concat(tasksApi.middleware)
            .concat(userApi.middleware)
            .concat(categoryApi.middleware)
    }
})

setupListeners(store.dispatch)

export { useAddTaskMutation, useUpdateTaskMutation, useFetchTaskQuery, useRemoveTaskMutation } from './apis/tasksApi'
export { useAddCategoryMutation, useRemoveCategoryMutation, useFetchCategoryQuery } from './apis/categoryApi'
export { useAddUserMutation, useValidateUserMutation } from './apis/userApi'

