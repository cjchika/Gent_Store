import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isUserAuthenticated: false,
  loading: false,
  user: null,
};

export const userReducer = createReducer(initialState, {
  GetUserRequest: (state) => {
    state.loading = true;
  },
  GetUserResponse: (state, action) => {
    state.isUserAuthenticated = true;
    state.loading = false;
    state.user = action.payload;
  },
  GetUserError: (state, action) => {
    (state.loading = false), (state.error = action.payload);
    state.isUserAuthenticated = false;
  },
  ClearErrors: (state) => {
    state.error = null;
  },
});
