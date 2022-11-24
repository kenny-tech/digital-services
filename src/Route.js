import React from 'react';
import { createBrowserRouter } from "react-router-dom";

import Home from './pages/Home';
import Provider from './pages/Provider';
import SelectedProvider from './pages/SelectedProvider';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

export const Route = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/provider",
    element: <Provider/>,
  },
  {
    path: "/selected-provider",
    element: <SelectedProvider/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword/>,
  },
]);

export const BASE_API_ROUTE = 'http://localhost:8000/api/';
export const REGISTER_API_ROUTE = 'register';
