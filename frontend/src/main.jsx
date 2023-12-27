import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from './pages/ErrorPage.jsx';
import OverviewPage from './pages/OverviewPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import MoviePage from './pages/MoviePage.jsx';


const router = createBrowserRouter([
  {
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
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
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
