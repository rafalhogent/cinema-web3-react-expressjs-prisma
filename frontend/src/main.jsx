import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import OverviewPage from "./pages/OverviewPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import MoviePage from "./pages/MoviePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import LogoutPage from "./pages/LogoutPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./store/store";
import CartPage from "./pages/CartPage.jsx";
import UserTicketsPage from "./pages/UserTicketsPage.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    errorElement: <ErrorPage />,
  },
  {
    element: <LoginPage />,
    path: "/login",
    errorElement: <ErrorPage />,
  },
  {
    element: <RegisterPage />,
    path: "/register",
    errorElement: <ErrorPage />,
  },
  {
    element: <LogoutPage />,
    path: "/logout",
    errorElement: <ErrorPage />,
  },
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/overview",
        element: <OverviewPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/movie/:id",
        element: <MoviePage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/tickets",
        element: <UserTicketsPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
