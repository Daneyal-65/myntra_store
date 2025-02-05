import { configureStore } from "@reduxjs/toolkit";
import productDetailsSlice from "./reducer";
import bagSlice from "./bag";
import wishlistSlice from "./wishlist";
// configuring store setup for redux
export const store = configureStore({
  reducer: {
    ProductDetails: productDetailsSlice,
    bag: bagSlice,
    wishlist: wishlistSlice,
  },
});
