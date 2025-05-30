import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const registerAPI = createApi({
  reducerPath: "registerAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // ✅ Register user
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "register",
        method: "POST",
        body: newUser,
      }),
    }),

    // ✅ Login user
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }),
    }),

    // ✅ Get all users (admin only)
    getUsers: builder.query({
      query: () => "users",
    }),

    // ✅ Update profile
    updateUserProfile: builder.mutation({
      query: (updatedUser) => ({
        url: "update-profile",
        method: "PUT",
        body: updatedUser,
      }),
    }),

    // ✅ Forgot password (send OTP)
    forgotPassword: builder.mutation({
      query: (emailData) => ({
        url: "forgot-password",
        method: "POST",
        body: emailData,
      }),
    }),

    // ✅ Reset password with OTP
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "reset-password",
        method: "POST",
        body: data,
      }),
    }),

    // ✅ Test protected route
    testProtected: builder.query({
      query: () => "protected",
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUsersQuery,
  useUpdateUserProfileMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useTestProtectedQuery,
} = registerAPI;
