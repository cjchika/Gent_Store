import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isUserAuthenticated: false,
  isLoadingUser: false,
  user: null,
};

export const userReducer = createReducer(initialState, {
  GetUserRequest: (state) => {
    state.isLoadingUser = true;
  },
  GetUserResponse: (state, action) => {
    state.isUserAuthenticated = true;
    state.isLoadingUser = false;
    state.user = action.payload;
  },
  GetUserError: (state, action) => {
    state.isLoadingUser = false;
    state.error = action.payload;
    state.isUserAuthenticated = false;
  },

  // UPDATE USER INFORMATION
  updateUserInfoRequest: (state) => {
    state.isLoadingUser = true;
  },
  updateUserInfoSuccess: (state, action) => {
    state.isLoadingUser = false;
    state.user = action.payload;
  },
  updateUserInfoFail: (state, action) => {
    state.isLoadingUser = false;
    state.user = action.payload;
  },

  ClearErrors: (state) => {
    state.error = null;
  },
});
