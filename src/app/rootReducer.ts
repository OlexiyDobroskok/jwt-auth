import { combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "entities/user";
import { sessionSlice } from "entities/session";

export const rootReducer = combineReducers({
  [sessionSlice.name]: sessionSlice.reducer,
  [userSlice.name]: userSlice.reducer,
});
