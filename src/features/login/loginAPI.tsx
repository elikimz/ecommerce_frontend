// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const loginAPI = createApi({
//   reducerPath: "loginAPI",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://127.0.0.1:8000/",
//     prepareHeaders: (headers) => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     // ✅ Register new user
//     registerUser: builder.mutation({
//       query: (newUser) => ({
//         url: "register",
//         method: "POST",
//         body: newUser,
//       }),
//     }),

//     // ✅ Login user
//     loginUser: builder.mutation({
//       query: (credentials) => ({
//         url: "login",
//         method: "POST",
//         body: new URLSearchParams(credentials),
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       }),
//     }),

//     // ✅ Get all users (admin only)
//     getUsers: builder.query({
//       query: () => "users",
//     }),

//     // ✅ Update profile
//     updateUserProfile: builder.mutation({
//       query: (updatedUser) => ({
//         url: "update-profile",
//         method: "PUT",
//         body: updatedUser,
//       }),
//     }),

//     // ✅ Forgot password
//     forgotPassword: builder.mutation({
//       query: (emailData) => ({
//         url: "forgot-password",
//         method: "POST",
//         body: emailData,
//       }),
//     }),

//     // ✅ Reset password
//     resetPassword: builder.mutation({
//       query: (data) => ({
//         url: "reset-password",
//         method: "POST",
//         body: data,
//       }),
//     }),

//     // ✅ Test token-protected route
//     testProtected: builder.query({
//       query: () => "protected",
//     }),
//   }),
// });

// export const {
//   useRegisterUserMutation,
//   useLoginUserMutation,
//   useGetUsersQuery,
//   useUpdateUserProfileMutation,
//   useForgotPasswordMutation,
//   useResetPasswordMutation,
//   useTestProtectedQuery,
// } = loginAPI;



// src/features/login/loginAPI.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginAPI = createApi({
  reducerPath: "loginAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ecommerce-backend-yeq9.onrender.com/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "register",
        method: "POST",
        body: newUser,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: new URLSearchParams(credentials),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }),
    }),
    getUsers: builder.query({
      query: () => "users",
    }),
    updateUserProfile: builder.mutation({
      query: (updatedUser) => ({
        url: "update-profile",
        method: "PUT",
        body: updatedUser,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (emailData) => ({
        url: "forgot-password",
        method: "POST",
        body: emailData,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "reset-password",
        method: "POST",
        body: data,
      }),
    }),
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
} = loginAPI;
