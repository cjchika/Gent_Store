import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  product: null,
  isLoadingProduct: false,
};

export const productReducer = createReducer(initialState, {
  productCreateRequest: (state) => {
    state.isLoadingProduct = true;
  },

  productCreateSuccess: (state, action) => {
    state.isLoadingProduct = false;
    state.product = action.payload;
    state.success = true;
  },

  productCreateFail: (state, action) => {
    state.isLoadingProduct = false;
    state.error = action.payload;
    state.success = false;
  },
});
