import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderAPI = createApi({
  reducerPath: "orderAPI",
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
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: "orders/orders/",
        method: "POST",
        body: newOrder,
      }),
      invalidatesTags: ["Orders"],
    }),

    getOrders: builder.query<any[], { skip?: number; limit?: number }>({
      query: ({ skip = 0, limit = 100 } = {}) =>
        `orders/orders/?skip=${skip}&limit=${limit}`,
      providesTags: ["Orders"],
    }),

    getOrderById: builder.query({
      query: (id) => `orders/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Orders", id }],
    }),

    updateOrderById: builder.mutation({
      query: ({ id, body }) => ({
        url: `orders/orders/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Orders",
        { type: "Orders", id },
      ],
    }),

    deleteOrderById: builder.mutation({
      query: (id) => ({
        url: `orders/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderByIdMutation,
  useDeleteOrderByIdMutation,
} = orderAPI;
