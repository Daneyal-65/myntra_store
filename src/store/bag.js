import { createSlice } from "@reduxjs/toolkit";
// initial state for bag or cart
const initialState = {
  items: [],
};
// defination of reducers
const bagSlice = createSlice({
  name: "bag",
  initialState,
  reducers: {
    addToBag: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromBag: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },
    clearBag: (state) => {
      state.items = [];
    },
  },
});

export const { addToBag, removeFromBag, updateQuantity, clearBag } =
  bagSlice.actions;
export default bagSlice.reducer;
