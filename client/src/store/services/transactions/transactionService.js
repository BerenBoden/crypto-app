import { api } from "../../api";

export const transactionService = api.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: ({ id, username, limit}) => {
        return {
          url: `transaction/${id}?username=${username}&limit=${limit}`,
        };
      },
      providesTags: ["Transaction"],
    }),
    postTransaction: builder.mutation({
      query: (body) => {
        return {
          url: `transaction`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Transaction", "Account", "Crypto"],
    }),
  }),
});

export const { useGetTransactionsQuery, usePostTransactionMutation } =
  transactionService;
