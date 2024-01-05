import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addItems(state, action) {
      const newItems = action.payload;
      newItems.forEach((newItem) => {
        const existingItem = state.cartItems.find(
          (item) =>
            item.showTime.id === newItem.showTime.id &&
            item.seatNr === newItem.seatNr
        );
        if (!existingItem) state.cartItems.push(newItem);
      });
    },

    removeItem(state, action) {
      const ticket = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) =>
          !(
            item.seatNr === ticket.seatNr &&
            item.showTime.id === ticket.showTimeId
          )
      );
    },

    removeAll(state, action) {
      const ticket = action.payload;
      state.cartItems = []
    },

  },
});

export const {
  addItems,
  removeItem,
  removeAll
} = cartSlice.actions;
export default cartSlice.reducer;
