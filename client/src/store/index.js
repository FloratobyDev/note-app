import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import { achievementApi } from "./apis/achievementApi";
import { authApi } from "./apis/authApi";
import { calendarApi } from "./apis/calendarApi";
import { categoryApi } from "./apis/categoryApi";
import { tasksApi } from "./apis/tasksApi";
import { userApi } from "./apis/userApi";

export const store = configureStore({
    reducer: {
        [tasksApi.reducerPath]: tasksApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [calendarApi.reducerPath]: calendarApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [achievementApi.reducerPath]: achievementApi.reducer
    },
    middleware: (defaultMiddleware) => {
        return defaultMiddleware()
            .concat(calendarApi.middleware)
            .concat(tasksApi.middleware)
            .concat(userApi.middleware)
            .concat(categoryApi.middleware)
            .concat(authApi.middleware)
            .concat(achievementApi.middleware)
    }
})

setupListeners(store.dispatch)

export { useAddTaskMutation, useUpdateTaskMutation, useFetchTaskQuery, useRemoveTaskMutation } from './apis/tasksApi'
export { useAddCategoryMutation, useRemoveCategoryMutation, useFetchCategoryQuery } from './apis/categoryApi'
export { useAddUserMutation, useValidateUserMutation, useAddAdminMutation } from './apis/userApi'
export { useFetchCalendarQuery, useLazyFetchCalendarQuery } from './apis/calendarApi'
export { useAuthenticateAdminQuery, useAuthenticateUserQuery } from './apis/authApi'
export { useFetchAchievementsQuery } from './apis/achievementApi'

