import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  id: "",
  receiverUsername: "",
  email: "",
  accountBalance: "",
  type: "",
  symbol: "",
  symbolPrice: 0,
  symbolLink: "",
  amountValue: 0,
  amount: 0,
  message: "",
  date: "",
};

export const receiptSlice = createSlice({
  name: "receipt",
  initialState,
  reducers: {
    setReceipt: (state, action) => {
      const payloadProperties = Object.keys(action.payload);
      payloadProperties.forEach((prop) => {
        if (state.hasOwnProperty(prop)) {
          state[prop] = action.payload[prop];
        }
      });
    },
    resetReceipt: () => {
      return { ...initialState };
    },
  },
});

export const { setReceipt, resetReceipt } = receiptSlice.actions;
export default receiptSlice.reducer;
