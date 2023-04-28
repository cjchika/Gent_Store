import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isUserAuthenticated: false,
  isLoadingUser: false,
  loadingAddress: false,
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

  // UPDATE USER ADDRESS
  updateUserAddressRequest: (state) => {
    state.loadingAddress = true;
  },
  updateUserAddressSuccess: (state, action) => {
    state.loadingAddress = false;
    state.successMessage = action.payload.successMessage;
    state.user = action.payload.user;
  },
  updateUserAddressFail: (state, action) => {
    state.loadingAddress = false;
    state.user = action.payload;
  },

  // DELETE USER ADDRESS
  deleteUserAddressRequest: (state) => {
    state.loadingAddress = true;
  },
  deleteUserAddressSuccess: (state, action) => {
    state.loadingAddress = false;
    state.successMessage = action.payload.successMessage;
    state.user = action.payload.user;
  },
  deleteUserAddressFail: (state, action) => {
    state.loadingAddress = false;
    state.user = action.payload;
  },

  // UPDATE USER PASSWORD
  updateUserPasswordRequest: (state) => {
    state.loadingAddress = true;
  },
  updateUserPasswordSuccess: (state, action) => {
    state.isLoadingUser = false;
    state.successMessage = action.payload.successMessage;
    state.user = action.payload.user;
  },
  updateUserPasswordFail: (state, action) => {
    state.isLoadingUser = false;
    state.user = action.payload;
  },
});
