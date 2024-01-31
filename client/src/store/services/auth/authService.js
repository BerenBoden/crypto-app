import { api } from "../../api";

const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    verifyEmail: builder.mutation({
      query: ({ id, token }) => ({
        url: `auth/register/verify-email/${id}`,
        method: "POST",
        body: { token },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useVerifyEmailMutation } =
  authSlice;
