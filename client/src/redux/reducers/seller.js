import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isSellerAuthenticated: false,
  isLoadingSeller: false,
  seller: null,
};

export const sellerReducer = createReducer(initialState, {
  GetSellerRequest: (state) => {
    state.isLoadingSeller = true;
  },
  GetSellerResponse: (state, action) => {
    state.isSellerAuthenticated = true;
    state.isLoadingSeller = false;
    state.seller = action.payload;
  },
  GetSellerError: (state, action) => {
    (state.isLoadingSeller = false), (state.error = action.payload);
    state.isSellerAuthenticated = false;
  },
  ClearErrors: (state) => {
    state.error = null;
  },
});
