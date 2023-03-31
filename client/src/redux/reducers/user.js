import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
};

export const userReducer = createReducer(initialState, {
  GetUserRequest: (state) => {
    state.loading = true;
  },
  GetUserResponse: (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.user = action.payload;
  },
  GetUserError: (state, action) => {
    (state.loading = false), (state.error = action.payload);
    state.isAuthenticated = false;
  },
  ClearErrors: (state) => {
    state.error = null;
  },
});
