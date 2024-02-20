import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";

import LayoutReducer from "../slices/layouts/reducer";
// Authentication
import LoginReducer from "../slices/auth/login/reducer";
import ForgetPasswordReducer from "../slices/auth/forgetpwd/reducer";
import ProfileReducer from "../slices/auth/profile/reducer";
import DashboardReducer from "../slices/dashboard/reducer";
import { employeeSlice } from "features/employees/employeesSlice";
import { groupSlice } from "features/groups/groupsSlice";
export const store = configureStore({
  reducer: {
    [employeeSlice.reducerPath]: employeeSlice.reducer,
    [groupSlice.reducerPath]: groupSlice.reducer,
    Layout: LayoutReducer,
    ForgetPassword: ForgetPasswordReducer,
    Profile: ProfileReducer,
    Dashboard: DashboardReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([
        employeeSlice.middleware, groupSlice.middleware,
    ]);
  },
});
// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;