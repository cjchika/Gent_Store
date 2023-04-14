import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  product: null,
  products: null,
  allProducts: null,
  isLoadingProduct: false,
};

export const productReducer = createReducer(initialState, {
  // CREATE PRODUCT
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

  // GET ALL SHOP PRODUCTS

  getAllShopProductsRequest: (state) => {
    state.isLoadingProduct = true;
  },

  getAllShopProductsSuccess: (state, action) => {
    state.isLoadingProduct = false;
    state.products = action.payload;
  },

  getAllShopProductsFail: (state, action) => {
    state.isLoadingProduct = false;
    state.error = action.payload;
  },

  // DELETE SHOP PRODUCT
  deleteProductRequest: (state) => {
    state.isLoadingProduct = true;
  },

  deleteProductSuccess: (state, action) => {
    state.isLoadingProduct = false;
    state.message = action.payload;
  },

  deleteProductFail: (state, action) => {
    state.isLoadingProduct = false;
    state.error = action.payload;
  },

  // GET ALL PRODUCTS
  getAllProductsRequest: (state) => {
    state.isLoadingProduct = true;
  },

  getAllProductsSuccess: (state, action) => {
    state.isLoadingProduct = false;
    state.allProducts = action.payload;
  },

  getAllProductsFail: (state, action) => {
    state.isLoadingProduct = false;
    state.error = action.payload;
  },
});
