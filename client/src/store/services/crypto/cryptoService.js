import { api } from "../../api";

export const cryptoService = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUnauthedCryptos: builder.query({
      query: () => ({
        url: `crypto/all`,
      }),
      providesTags: [`Crypto`],
    }),
    getAllCryptos: builder.query({
      query: ({ id }) => ({
        url: `crypto/${id}`,
      }),
      providesTags: [`Crypto`],
    }),
    getCryptoBySymbol: builder.query({
      query: ({ symbol }) => ({
        url: `crypto/symbol/${symbol}`,
      }),
      providesTags: ["Crypto"],
    }),
    getUserCryptos: builder.query({
      query: ({ id }) => ({
        url: `crypto/user/${id}`,
      }),
      providesTags: ["Crypto"],
    }),
    getUserCryptoBySymbol: builder.query({
      query: ({ id, symbol }) => ({
        url: `crypto/user/symbol/${id}?symbol=${symbol}`,
      }),
      providesTags: ["Crypto"],
    }),
    postPurchase: builder.mutation({
      query: (body) => ({
        url: "crypto/purchase",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Crypto", "Account"],
    }),
    postSell: builder.mutation({
      query: (body) => ({
        url: "crypto/sell",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Crypto", "Account"],
    }),
    postCryptoTransaction: builder.mutation({
      query: ({ sender, amount, type, symbol }) => ({
        url: "crypto/transaction",
        method: "POST",
        body: { sender, amount, type, symbol },
      }),
      invalidatesTags: ["Crypto", "Account"],
    }),
  }),
});
export const {
  useGetUserCryptosQuery,
  useGetAllCryptosQuery,
  usePostPurchaseMutation,
  usePostSellMutation,
  usePostCryptoTransactionMutation,
  useGetCryptoBySymbolQuery,
  useGetUserCryptoBySymbolQuery,
  useGetAllUnauthedCryptosQuery,
} = cryptoService;
