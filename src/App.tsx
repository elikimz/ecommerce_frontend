




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
import InactivityLogout from "./components/ProtectedRoute";
import ProfilePage from "./pages/profilepage";
import MyOrders from "./pages/Myorderpage";

const router = createBrowserRouter([
  // Public Routes
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
  },
  {
    path: "/login",
    element: (
      <InactivityLogout>
        <LoginForm />
      </InactivityLogout>
    ),
  },

  // User Routes
  {
    path: "/account",
    element: (
      <InactivityLogout>
        <ProfilePage />
      </InactivityLogout>
    ),
  },
  {
    path: "/my-orders",
    element: (
      <InactivityLogout>
        <MyOrders />
      </InactivityLogout>
    ),
  },
  {
    path: "/product/:id",
    element: (
      <InactivityLogout>
        <ProductDetail />
      </InactivityLogout>
    ),
  },
  {
    path: "/customer-dashboard",
    element: (
      <InactivityLogout>
        <Order />
      </InactivityLogout>
    ),
  },
  {
    path: "/orders/new",
    element: (
      <InactivityLogout>
        <OrderPage />
      </InactivityLogout>
    ),
  },
  {
    path: "/cart",
    element: (
      <InactivityLogout>
        <CartPage />
      </InactivityLogout>
    ),
  },

  // Admin Dashboard Routes
  {
    path: "/admin-dashboard",
    element: (
      <InactivityLogout>
        <EcommerceDashboard />
      </InactivityLogout>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "categories",
        element: <CategoryPage />,
      },
      {
        path: "analytics",
        element: <Product />,
      },
    ],
  },

  // Catch-all 404 route
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
