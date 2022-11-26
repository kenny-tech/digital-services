import React from 'react';
import { createBrowserRouter } from "react-router-dom";

import Home from './pages/Home';
import Provider from './pages/Provider';
import SelectedProvider from './pages/SelectedProvider';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ActivateAccount from './pages/ActivateAccount';

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
  {
    path: "/activate-account/:id/:token", 
    element: <ActivateAccount/>,
  },
]);

export const BASE_API_ROUTE = 'http://localhost:8000/api/';
export const REGISTER_API_ROUTE = 'register';
export const ACTIVATE_ACCOUNT_API_ROUTE = 'activate_account';
export const LOGIN_API_ROUTE = 'login';


