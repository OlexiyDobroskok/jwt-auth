import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type User } from "./types";

export interface UserState {
  user?: User;
}

const initialState: UserState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
    },
    removeUser: (state) => {
      state.user = undefined;
    },
  },
});

export const selectUserInformation = (state: RootState) => state.user.user;

export const { createUser, removeUser } = userSlice.actions;
