import { api } from "../../api";

export const withdrawService = api.injectEndpoints({
  endpoints: (builder) => ({
    postWithdraw: builder.mutation({
      query: (body) => {
        return {
          url: `withdraw`,
          method: "POST",
          body,
        };
      },
    }),
    getWithdraw: builder.query({
      query: ({ id }) => {
        return {
          url: `withdraw/${id}`,
        };
      },
    }),
  }),
});

export const { usePostWithdrawMutation, useGetWithdrawQuery } = withdrawService;
