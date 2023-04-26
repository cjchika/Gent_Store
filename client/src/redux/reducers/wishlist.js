import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  wishlist: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [],
};

export const wishlistReducer = createReducer(initialState, {
  addToWishlist: (state, action) => {
    const item = action.payload;
    const isItemExist = state.wishlist.find(
      (wishlistItem) => wishlistItem._id === item._id
    );
    if (isItemExist) {
      return {
        ...state,
        wishlist: state.wishlist.map((wishlistItem) =>
          wishlistItem._id === isItemExist._id ? item : wishlistItem
        ),
      };
    } else {
      return { ...state, wishlist: [...state.wishlist, item] };
    }
  },
  removeFromWishlist: (state, action) => {
    return {
      ...state,
      wishlist: state.wishlist.filter((item) => item._id !== action.payload),
    };
  },
});
