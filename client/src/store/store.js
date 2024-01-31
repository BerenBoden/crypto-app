import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import currencySelectionReducer from "./slices/currencySelection/currencySelection";
import receiptReducer from "./slices/receipt/receiptSlice";
import { api } from "./api";

export default configureStore({
  reducer: {
    receipt: receiptReducer,
    currencySelection: currencySelectionReducer,
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
