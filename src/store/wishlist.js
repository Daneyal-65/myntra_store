import { createSlice } from "@reduxjs/toolkit";
// initial state
const initialState = {
  value: [], // stores wished products
  wished: [], // stores wished product id's
};
// reducers
export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    updateWishListDetails: (state, action) => {
      const isItemExist = state.value.find(
        (item) => item.id === action.payload.id
      );
      if (isItemExist) {
        return;
      }
      state.value = [...state.value, action.payload];
      state.wished = [...state.wished, action.payload.id];
    },
    RemoveItemFromWishList: (state, action) => {
      state.value = state.value.filter((item) => item.id !== action.payload);
      state.wished = state.value.filter((item) => item !== action.payload);
    },
  },
});

export const { updateWishListDetails, RemoveItemFromWishList } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
