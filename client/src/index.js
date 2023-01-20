import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Calendar from './pages/Calendar';
import Achievements from './pages/Achievements';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Task from './pages/Task';
import Register from './pages/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [{
      path: '/task',
      element: <Task />
    },
    {
      path: '/calendar',
      element: <Calendar />
    },
    {
      path: '/achievements',
      element: <Achievements />
    },
    {
      path: '/profile',
      element: <Profile />
    },
    {
      path: '/profile',
      element: <Profile />
    },
    {
      path: '/settings',
      element: <Settings />
    }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);

