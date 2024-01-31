import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "",
  coin: {
    symbol: "",
    name: "",
    price: 0,
    coinAmount: 0,
    link: "",
  },
  amount: 0,
};

export const currencySelectionSlice = createSlice({
  name: "currencySelection",
  initialState,
  reducers: {
    setCoin: (state, action) => {
      state.coin.symbol = action.payload.symbol;
      state.coin.name = action.payload.name;
      state.coin.price = action.payload.price;
      state.coin.coinAmount = action.payload.coinAmount;
      state.coin.link = action.payload.link;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
  },
});

export const { setCoin, setType, setAmount } = currencySelectionSlice.actions;
export default currencySelectionSlice.reducer;
