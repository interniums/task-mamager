import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home.jsx'
import Registr from './components/auth/Regist.jsx'
import Login from './components/auth/Login.jsx'
import ErrorPage from './components/Error.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'
import RequireAuth from './components/auth/RequireAuth.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/sign-up',
        element: <Registr />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/sign-in',
        element: <Login />,
        errorElement: <ErrorPage />,
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: '/home',
            element: <Home />,
            errorElement: <ErrorPage />,
          },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
)
