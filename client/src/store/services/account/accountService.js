import { api } from "../../api";

const accountSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAccount: builder.query({
      query: ({ id }) => {
        return {
          url: `users/${id}`,
          method: "GET",
        };
      },
      providesTags: ["Account"],
    }),
    postAddFunds: builder.mutation({
      query: (body) => {
        return {
          url: "users/add-funds",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Account"],
    }),
    updateAccount: builder.mutation({
      query: ({ id, firstName, lastName }) => {
        return {
          url: "users/update",
          method: "PUT",
          body: { id, firstName, lastName },
        };
      },
    }),
  }),
});

export const {
  useGetAccountQuery,
  usePostAddFundsMutation,
  useUpdateAccountMutation,
} = accountSlice;
