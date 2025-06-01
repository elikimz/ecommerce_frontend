import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/home";
import Register from "./features/Register/register";
import LoginForm from "./features/login/login";
import ErrorPage from "./components/Error";
import "react-toastify/dist/ReactToastify.css";
import EcommerceDashboard from "./components/AdminDashboard";
import UsersPage from "./pages/users";
import CategoryPage from "./features/Category/category";
import Product from "./features/Products/products";
import ProductDetail from "./pages/Productdetails";
import Order from "./features/Orders/order";
import OrderPage from "./pages/bookorder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginForm />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/product/:id",
    element: <ProductDetail />,
    errorElement: <ErrorPage />,
  },
  {
    path: "customer-dashboard",
    element: <Order />,
    errorElement: <ErrorPage />,
  },
  {
    path: "orders/new",
    element: <OrderPage />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/admin-dashboard",
    element: <EcommerceDashboard />,
    children: [
      { index: true, element: <Register /> },
      { path: "users", element: <UsersPage /> },
      { path: "categories", element: <CategoryPage /> },
      { path: "Analytics", element: <Product /> },
      { path: "Orders", element: <Register /> },
      // { path: "receiptpage", element: <ReceiptPage /> },
    ],
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
