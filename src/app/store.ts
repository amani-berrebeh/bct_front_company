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
import { complainSlice } from "features/complains/complainSlice";
import { programSlice } from "features/program/programSlice";
import { noteSlice } from "features/notes/notesSlice";
import { accountSlice } from "features/account/accountSlice";
import authSlice from "features/account/authSlice";
import { quoteSlice } from "features/quote/quoteSlice";
import { contractSlice } from "features/contract/contractSlice";
import { vehicleTypeSlice } from "features/vehicleType/vehicleTypeSlice";
import { luggageSlice } from "features/luggage/luggageSlice";
import { journeySlice } from "features/journey/journeySlice";

export const store = configureStore({
  reducer: {
    [employeeSlice.reducerPath]: employeeSlice.reducer,
    [groupSlice.reducerPath]: groupSlice.reducer,
    [complainSlice.reducerPath]: complainSlice.reducer,
    [noteSlice.reducerPath]: noteSlice.reducer,
    [programSlice.reducerPath]: programSlice.reducer,
    [accountSlice.reducerPath]: accountSlice.reducer,
    [quoteSlice.reducerPath]: quoteSlice.reducer,
    [contractSlice.reducerPath]: contractSlice.reducer,
    [vehicleTypeSlice.reducerPath]: vehicleTypeSlice.reducer,
    [luggageSlice.reducerPath]: luggageSlice.reducer,
    [journeySlice.reducerPath]: journeySlice.reducer,
    auth: authSlice,
    Layout: LayoutReducer,
    ForgetPassword: ForgetPasswordReducer,
    Profile: ProfileReducer,
    Dashboard: DashboardReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([
      employeeSlice.middleware,
      groupSlice.middleware,
      complainSlice.middleware,
      noteSlice.middleware,
      programSlice.middleware,
      accountSlice.middleware,
      contractSlice.middleware,
      quoteSlice.middleware,
      journeySlice.middleware,
      luggageSlice.middleware,
      vehicleTypeSlice.middleware,
    ]);
  },
});
// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
