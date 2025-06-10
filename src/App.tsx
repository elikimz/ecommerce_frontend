



// App.tsx
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/home";
import Register from "./features/Register/register";
import LoginForm from "./features/login/login";
import ErrorPage from "./components/Error";
import EcommerceDashboard from "./components/AdminDashboard";
import UsersPage from "./pages/users";
import CategoryPage from "./features/Category/category";
import Product from "./features/Products/products";
import ProductDetail from "./pages/Productdetails";
import Order from "./features/Orders/order";
import OrderPage from "./pages/bookorder";
import CartPage from "./features/Cart&CartItems/cartItems";
import InactivityLogout from "./components/ProtectedRoute"; // keeping only this
import PaymentPage from "./pages/payment";
import ProfilePage from "./pages/profilepage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <InactivityLogout>
        <Home />
      </InactivityLogout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: (
      <InactivityLogout>
        <Register />
      </InactivityLogout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: (
      <InactivityLogout>
        <LoginForm />
      </InactivityLogout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/payment",
    element: (
      <InactivityLogout>
        <PaymentPage />
      </InactivityLogout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/account",
    element: (
      <InactivityLogout>
        <ProfilePage />
      </InactivityLogout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/product/:id",
    element: (
      <InactivityLogout>
        <ProductDetail />
      </InactivityLogout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "customer-dashboard",
    element: (
      <InactivityLogout>
        <Order />
      </InactivityLogout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "orders/new",
    element: (
      <InactivityLogout>
        <OrderPage />
      </InactivityLogout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "cart",
    element: (
      <InactivityLogout>
        <CartPage />
      </InactivityLogout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin-dashboard",
    element: (
      <InactivityLogout>
        <EcommerceDashboard />
      </InactivityLogout>
    ),
    children: [
      // {
      //   index: true,
      //   element: (
      //     <InactivityLogout>
      //       <Register />
      //     </InactivityLogout>
      //   ),
      // },
      {
        path: "users",
        element: (
          <InactivityLogout>
            <UsersPage />
          </InactivityLogout>
        ),
      },
      {
        path: "categories",
        element: (
          <InactivityLogout>
            <CategoryPage />
          </InactivityLogout>
        ),
      },
      {
        path: "Analytics",
        element: (
          <InactivityLogout>
            <Product />
          </InactivityLogout>
        ),
      },
      // {
      //   path: "Orders",
      //   element: (
      //     <InactivityLogout>
      //       <Register />
      //     </InactivityLogout>
      //   ),
      // },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage code="404" message="Page Not Found" />,
  },
]);

const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" />
    </>
  );
};

export default App;
