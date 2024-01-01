import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from './App.jsx'
import AppLayout from './pages/AppLayout.jsx'
import ErrorPage from './pages/ErrorPage.jsx';
import OverviewPage from './pages/OverviewPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import MoviePage from './pages/MoviePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import LogoutPage from './pages/LogoutPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';


const router = createBrowserRouter([
  {
    element: <App/>,
    path: "/",
    errorElement: <ErrorPage/>,
  },
  {
    element: <LoginPage/>,
    path: "/login",
    errorElement: <ErrorPage/>,
  },
  {
    element: <RegisterPage/>,
    path: "/register",
    errorElement: <ErrorPage/>,
  },
  {
    element: <AppLayout/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/overview",
        element: <OverviewPage/>
      },
      {
        path: "/about",
        element: <AboutPage/>
      },
      {
        path: "/movie/:id",
        element: <MoviePage/>
      },
      {
        path: "/logout",
        element: <LogoutPage/>
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
