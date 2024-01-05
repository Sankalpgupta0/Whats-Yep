import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import store from './store+slice/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import { Provider } from 'react-redux'
import Layout from './components/Layout.jsx'
import Home from './components/main/Home.jsx'
import Massages from './components/main/Massages.jsx'
import User from './components/User.jsx'
import NotFound from './components/NotFound.jsx'
import SideBarLayout from './components/sideBar/SideBarLayout.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Signup />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/chats",
        element: <SideBarLayout />
      },
      {
        path: "/users",
        element: <Layout />,
        children: [
          {
            path: "/users",
            element: <Home />
          },
          {
            path: "/users/WorldChat",
            element: <Massages />
          },
          {
            path: "/users/:id",
            element: <User />
          }
        ]
      },
      {
        path:"*",
        element: <NotFound />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
