import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isSellerAuthenticated: false,
  seller: null,
};

export const sellerReducer = createReducer(initialState, {
  GetSellerRequest: (state) => {
    state.loading = true;
  },
  GetSellerResponse: (state, action) => {
    state.isSellerAuthenticated = true;
    state.loading = false;
    state.seller = action.payload;
  },
  GetSellerError: (state, action) => {
    (state.loading = false), (state.error = action.payload);
    state.isSellerAuthenticated = false;
  },
  ClearErrors: (state) => {
    state.error = null;
  },
});
