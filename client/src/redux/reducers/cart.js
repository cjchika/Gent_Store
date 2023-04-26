import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartReducer = createReducer(initialState, {
  addToCart: (state, action) => {
    const item = action.payload;
    const isItemExist = state.cart.find(
      (cartItem) => cartItem._id === item._id
    );
    if (isItemExist) {
      return {
        ...state,
        cart: state.cart.map((cartItem) =>
          cartItem._id === isItemExist._id ? item : cartItem
        ),
      };
    } else {
      return { ...state, cart: [...state.cart, item] };
    }
  },
  removeFromCart: (state, action) => {
    return {
      ...state,
      cart: state.cart.filter((item) => item._id !== action.payload),
    };
  },
});
